import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// This function receives params within async (param)
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/userss"
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
    isLoading: false,
    errorMessage: "",
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      // Payload can be used from action.payload
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
      // Error message on action.error
      console.log(action);
    },
  },
});

export default usersSlice.reducer;
