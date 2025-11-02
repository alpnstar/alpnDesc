import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const PageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    // template: (state, action: PayloadAction<string>) => {
    //
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(someAsyncThunk.pending, (state) => {
  //       // TODO: Handle pending
  //     })
  //     .addCase(someAsyncThunk.fulfilled, (state, action) => {
  //       // TODO: Handle fulfilled
  //     })
  //     .addCase(someAsyncThunk.rejected, (state, action) => {
  //       // TODO: Handle rejected
  //     });
  // },
})

export const { actions: PageActions } = PageSlice
export const { reducer: PageReducer } = PageSlice
