import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { protectedInstance } from "../../../services/instance";

const initialState = {
  toDoStatus: "idle",
  allToDos: null,
  toDo: null,
  toDoError: null,
  allToDosStatus: "idle",
  allToDosError: null,
  toDoUpdateStatus: "idle",
  toDoUpdateError: null,
};

// add toDo
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

// get toDo

export const getToDoById = createAsyncThunk("toDos/getToDoById", async ()=>{})

// get all toDos
export const getAllToDos = createAsyncThunk(
  "toDos/getAllToDos",
  async (tripId, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get(
        `/users/trips/toDos/${tripId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update toDo status
export const updateToDoStatus = createAsyncThunk(
  "toDos/updateToDoStatus",
  async ({ toDoId, toDoStatus }, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.put(
        `/users/trips/toDos/update/status/${toDoId}`,
        toDoStatus
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

    resetAllToDosStatus(state) {
      state.allToDosStatus = "idle";
    },

    resetToDoStatusUpdate(state) {
      state.toDoUpdateStatus = "idle";
      state.toDoUpdateError = null;
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
      })
      .addCase(getAllToDos.pending, (state) => {
        state.allToDosStatus = "loading";
        state.allToDosError = null;
      })
      .addCase(getAllToDos.fulfilled, (state, action) => {
        state.allToDosStatus = "succeeded";
        state.allToDos = action.payload;
        state.allToDosError = null;
      })
      .addCase(getAllToDos.rejected, (state, action) => {
        state.allToDosStatus = "failed";
        state.allToDosError = action.payload;
      })
      .addCase(updateToDoStatus.pending, (state) => {
        state.toDoUpdateStatus = "loading";
        state.toDoUpdateError = null;
      })
      .addCase(updateToDoStatus.fulfilled, (state, action) => {
        (state.toDoUpdateStatus = "succeeded"), (state.toDoUpdateError = null);
      })
      .addCase(updateToDoStatus.rejected, (state, action) => {
        state.toDoUpdateStatus = "failed";
        state.toDoUpdateError = action.payload;
      });
  },
});

export default toDoSlice.reducer;

// export actions

export const { resetAddToDoState, resetAllToDosStatus, resetToDoStatusUpdate } =
  toDoSlice.actions;

// selectors for add toDo

export const selectToDoStatus = (state) => state.toDos.toDoStatus;
export const selectToDoError = (state) => state.toDos.toDoError;
export const selectToDo = (state) => state.toDos.toDo;

// update toDo status
export const selectToDoUpdateStatus = (state) => state.toDos.toDoUpdateStatus;
export const selectToDoUpdateError = (state) => state.toDos.toDoUpdateError;

// for all todos
export const selectAllToDosStatus = (state) => state.toDos.allToDosStatus;
export const selectAllToDos = (state) => state.toDos.allToDos;
export const selectAllToDosError = (state) => state.toDos.allToDosError;
