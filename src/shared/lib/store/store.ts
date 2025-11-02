import { configureStore } from "@reduxjs/toolkit"
import { pageApi } from "@/entities/Page/api/pageApi"
import { sidebarReducer } from "@/features/Sidebar"

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    [pageApi.reducerPath]: pageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pageApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
