import { createSlice } from "@reduxjs/toolkit"

export interface SidebarSchema {
  status: boolean
}

const initialState: SidebarSchema = {
  status: false,
}

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.status = true
    },
    closeSidebar: (state) => {
      state.status = false
    },
  },
})

export const { actions: sidebarActions } = SidebarSlice
export const { reducer: sidebarReducer } = SidebarSlice
