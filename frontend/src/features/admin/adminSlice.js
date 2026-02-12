import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createAdminAPI } from "./adminAPI"

export const createAdmin = createAsyncThunk(
    "admin/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createAdminAPI(data)
            return res.data
        } catch (error) {
            return rejectWithValue(err.response.data)
        }
    }
)

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createAdmin.pending, state => {
        state.loading = true
      })
      .addCase(createAdmin.fulfilled, state => {
        state.loading = false
        state.success = true
      })
      .addCase(createAdmin.rejected, state => {
        state.loading = false
      })
  }
})

export default adminSlice.reducer