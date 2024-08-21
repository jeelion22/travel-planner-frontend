import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/usersSlice";
import tripReducer from "../features/trips/tripSlice";
import toDoReducer from "../features/toDos/toDoSlice";
import transportationReducer from "../features/transportation/transportationSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    trips: tripReducer,
    toDos: toDoReducer,
    transportations: transportationReducer,
  },
});
