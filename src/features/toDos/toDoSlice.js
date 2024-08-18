import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { protectedInstance } from "../../../services/instance";

const initialState = {
  toDoStatus: "idle",
  todos: null,
  toDo: null,
  toDoError: null,
};

export const addToDo = createAsyncThunk(
  "toDos/addToDo",
  async ({ tripId, toDo }, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.post(
        `/users/trips/toDos/${tripId}`,
        toDo
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const toDoSlice = createSlice({
  name: "toDos",
  initialState,
  reducers: {
    resetAddToDoState(state) {
      state.toDoStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToDo.pending, (state, action) => {
        state.toDoStatus = "loading";
        state.toDoError = null;
      })
      .addCase(addToDo.fulfilled, (state, action) => {
        state.toDoStatus = "succeeded";
        state.toDo = action.payload;
        state.toDoError = null;
      })
      .addCase(addToDo.rejected, (state, action) => {
        state.toDoStatus = "failed";
        state.toDoError = action.payload;
      });
  },
});

export default toDoSlice.reducer;


// export actions

export const {resetAddToDoState} = toDoSlice.actions

// selectors for add toDo

export const selectToDoStatus = (state) => state.toDos.toDoStatus;
export const selectToDoError = (state) => state.toDos.toDoError;
export const selectToDo = (state) => state.toDos.toDo;
