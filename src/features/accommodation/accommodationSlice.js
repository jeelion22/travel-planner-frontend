import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { protectedInstance } from "../../../services/instance";

const initialState = {
  accommodationSearch: null,
  accommodationSearchStatus: "idle",
  accommodationSearchError: null,
};

export const searchAccommodation = createAsyncThunk(
  "accommodations/searchAccommodation",
  async (location, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get(
        `/users/trips/accommodations/search?location=${location}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const accommodationSlice = createSlice({
  name: "accommodations",
  initialState,
  reducers: {
    resetAccommodationSearch(state) {
      state.accommodationSearchStatus = "idle";
      state.accommodationSearchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAccommodation.pending, (state) => {
        state.accommodationSearchStatus = "loading";
        state.accommodationSearchError = null;
      })
      .addCase(searchAccommodation.fulfilled, (state, action) => {
        state.accommodationSearchStatus = "succeeded";
        (state.accommodationSearchError = null),
          (state.accommodationSearch = action.payload);
      })
      .addCase(searchAccommodation.rejected, (state, action) => {
        state.accommodationSearchStatus = "failed";
        state.accommodationSearchError = action.payload;
      });
  },
});

export default accommodationSlice.reducer;

// accommodations search selectors
export const selectAccommodationSearchStatus = (state) =>
  state.accommodations.accommodationSearchStatus;
export const selectAccommodationSearchError = (state) =>
  state.accommodations.accommodationSearchError;
export const selectAccommodationSearch = (state) =>
  state.accommodations.accommodationSearch;
