import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { protectedInstance } from "../../../services/instance";

const initialState = {
  // filghts suggestions
  flightsSuggestionState: "idle",
  suggestedFlights: null,
  flightsSuggestionError: null,

  //

  // book flight
  flightBookingStatus: "idle",
  flightBookingError: null,
  flight: null,

  //  train suggestions
  trainsSuggestionState: "idle",
  suggestedTrains: null,
  trainsSuggestionError: null,
};

export const getFlightsSuggestions = createAsyncThunk(
  "transportations/getFlightsSuggestions",
  async ({ source, destination }, { rejectWithValue }) => {
    try {
      if (!source) {
        source = "_";
      }
      const response = await protectedInstance.get(
        `/users/trips/flights/search?source=${source}&destination=${destination}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const bookFlight = createAsyncThunk(
  "transportation/bookFlight",
  async ({ tripId, flightBookingData }, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.put(
        `/users/trips/travels/booking/${tripId}`,
        flightBookingData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const transportationSlice = createSlice({
  name: "transportations",
  initialState,
  reducers: {
    resetFlightBooking(state) {
      state.flightBookingStatus = "idle";
      state.flightBookingError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFlightsSuggestions.pending, (state) => {
        state.flightsSuggestionState = "loading";
        state.flightsSuggestionError = null;
      })
      .addCase(getFlightsSuggestions.fulfilled, (state, action) => {
        state.flightsSuggestionState = "succeeded";
        state.flightsSuggestionError = null;
        state.suggestedFlights = action.payload;
      })
      .addCase(getFlightsSuggestions.rejected, (state, action) => {
        state.flightsSuggestionState = "failed";
        state.flightsSuggestionError = action.payload;
      })
      .addCase(bookFlight.pending, (state) => {
        state.flightBookingStatus = "loading";
        state.flightBookingError = null;
      })
      .addCase(bookFlight.fulfilled, (state, action) => {
        state.flightBookingStatus = "succeeded";
        state.flight = action.payload;
        state.flightBookingError = null;
      })
      .addCase(bookFlight.rejected, (state, action) => {
        state.flightBookingStatus = "failed";
        state.flightBookingError = action.payload;
      });
  },
});

export default transportationSlice.reducer;

export const { resetFlightBooking } = transportationSlice.actions;

// flight suggestions selectors
export const selectFlightsSuggestionState = (state) =>
  state.transportations.flightsSuggestionState;
export const selectFlightsSuggestionError = (state) =>
  state.transportations.flightsSuggestionError;

// flights suggestions
export const selectSuggestedFlights = (state) =>
  state.transportations.suggestedFlights;

// flight booking
export const selectBookedFlight = (state) => state.transportations.flight;
export const selectFlightBookingStatus = (state) =>
  state.transportations.flightBookingStatus;
export const selectFlightBookingError = (state) =>
  state.transportations.flightBookingError;
