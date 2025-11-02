import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react"
import { Page } from "@/entities/Page"
import { supabase } from "@/shared/api/supabaseClient"

// Более универсальный интерфейс для аргументов нашего baseQuery
interface SupabaseQueryArgs {
  from: string
  select?: string
  eq?: { column: string; value: unknown }
  insert?: object | object[]
  update?: { match: object; values: object }
  del?: { match: object } // Используем 'del', так как 'delete' - зарезервированное слово
  single?: boolean
  order?: { column: string; ascending?: boolean }
}

const supabaseBaseQuery: BaseQueryFn<SupabaseQueryArgs, unknown, { message: string }> = async ({
  from,
  select = "*",
  eq,
  insert,
  update,
  del,
  single,
  order,
}) => {
  let query

  // Определение типа запроса: мутация или выборка
  if (insert) {
    // При вставке сразу запрашиваем созданную запись
    query = supabase.from(from).insert(insert).select().single()
  } else if (update) {
    query = supabase.from(from).update(update.values).match(update.match).select().single()
  } else if (del) {
    query = supabase.from(from).delete().match(del.match)
  } else {
    // Это select-запрос
    query = supabase.from(from).select(select)
    if (eq) {
      query = query.eq(eq.column, eq.value)
    }
    if (order) {
      query = query.order(order.column, { ascending: order.ascending ?? true })
    }
    if (single) {
      query = query.single()
    }
    // Сюда можно добавить .order(), .limit() и т.д.
  }

  const { data, error } = await query

  if (error) {
    return { error: { message: error.message } }
  }
  return { data }
}

export const pageApi = createApi({
  reducerPath: "pageApi",
  baseQuery: supabaseBaseQuery,
  tagTypes: ["Page"],
  endpoints: (builder) => ({
    getPages: builder.query<Page[], void>({
      query: () => ({
        from: "pages",
        select: "id, title",
        order: { column: "created_at", ascending: true },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Page" as const, id })),
              { type: "Page", id: "LIST" },
            ]
          : [{ type: "Page", id: "LIST" }],
    }),
    getPageById: builder.query<Page, string>({
      query: (id) => ({
        from: "pages",
        eq: { column: "id", value: id },
        single: true,
      }),
      providesTags: (result, error, id) => [{ type: "Page", id }],
    }),
    addPage: builder.mutation<Page, Partial<Page>>({
      query: (newPage) => ({
        from: "pages",
        insert: newPage,
      }),
      invalidatesTags: [{ type: "Page", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newPage } = await queryFulfilled
          // Оптимистично обновляем кеш для getPageById
          dispatch(pageApi.util.upsertQueryData("getPageById", newPage.id, newPage))
        } catch {
          // Можно обработать ошибку
        }
      },
    }),
    updatePage: builder.mutation<Page, Partial<Page> & { id: string }>({
      query: ({ id, ...patch }) => ({
        from: "pages",
        update: { match: { id }, values: patch },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Page", id },
        { type: "Page", id: "LIST" },
      ],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          pageApi.util.updateQueryData("getPageById", id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    deletePage: builder.mutation<void, string>({
      query: (id) => ({
        from: "pages",
        del: { match: { id } },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Page", id },
        { type: "Page", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetPagesQuery,
  useGetPageByIdQuery,
  useAddPageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  useLazyGetPageByIdQuery,
} = pageApi
