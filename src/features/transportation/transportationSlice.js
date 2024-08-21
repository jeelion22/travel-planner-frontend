import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { protectedInstance } from "../../../services/instance";

const initialState = {
  // filghts suggestions
  flightsSuggestionState: "idle",
  suggestedFlights: null,
  flightsSuggestionError: null,

  //  train suggestions
  trainsSuggestionState: "idle",
  suggestedTrains: null,
  trainsSuggestionError: null,
};

export const getFlightsSuggestions = createAsyncThunk(
  "transportations/getFlightsSuggestions",
  async ({ source, destination }, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get(
        `/users/trips/flights/search?source=${source}&destination=${destination}`
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
  reducers: {},
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
      });
  },
});

export default transportationSlice.reducer;

// flight suggestions selectors
export const selectFlightsSuggestionState = (state) =>
  state.transportations.flightsSuggestionState;
export const selectFlightsSuggestionError = (state) =>
  state.transportations.flightsSuggestionError;

// flights suggestions
export const selectSuggestedFlights = (state) =>
  state.transportations.suggestedFlights;
