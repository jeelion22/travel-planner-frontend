import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, protectedInstance } from "../../../services/instance";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/users/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "users/verifyAccount",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      console.log(otp);
      const response = await instance.post(`/users/verify/${userId}`, otp);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "users/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await instance.post("/users/login", credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get("/users/me");
      return response.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyAccount.pending, (state, action) => {
        state.status = "loading";
        state.err = null;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

export const selectUserStatus = (state) => state.users.status;
export const selectUserError = (state) => state.users.error;
export const selectUser = (state) => state.users.user;
