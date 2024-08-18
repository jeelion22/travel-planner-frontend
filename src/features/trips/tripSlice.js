import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { protectedInstance } from "../../../services/instance";

const initialState = {
  trips: null,
  trip: null,
  status: "idle",
  error: null,
  updateBudgetStatus: "idle",
  updateBudgetError: null,
};

// create trip
export const createTrip = createAsyncThunk(
  "trips/createTrip",
  async (tripData, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.post("/users/addTrip", tripData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// get specific trip
export const getTripById = createAsyncThunk(
  "trips/getTripById",
  async (tripId, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get(`/users/trips/${tripId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// get all trips for the user
export const getAllTripsByUser = createAsyncThunk(
  "trips/getAllTrips",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get("/users/allTrips");

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// update budget
export const updateBudget = createAsyncThunk(
  "trips/updateBudget",
  async ({ tripId, budget }, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.put(
        `/users/trips/updateBudget/${tripId}`,
        budget
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrip.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trips = action.payload;
        state.error = null;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllTripsByUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllTripsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trips = action.payload;
        state.error = null;
      })
      .addCase(getAllTripsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getTripById.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTripById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trip = action.payload;
        state.error = null;
      })
      .addCase(getTripById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateBudget.pending, (state, action) => {
        state.updateBudgetStatus = "loading";
        state.updateBudgetError = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.updateBudgetStatus = "succeeded";
        state.trip = action.payload;
        state.updateBudgetError = null;
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.updateBudgetStatus = "failed";
        state.updateBudgetError = action.payload;
      });
  },
});

export default tripSlice.reducer;

export const selectTripStatus = (state) => state.trips.status;
export const selectTrips = (state) => state.trips.trips;
export const selectTripError = (state) => state.trips.error;
export const selectTrip = (state) => state.trips.trip;

// selectors for budget

export const selectBudgetUpdateStatus = (state) =>
  state.trips.updateBudgetStatus;
export const selectUpdateError = (state) => state.trips.updateBudgetError;
