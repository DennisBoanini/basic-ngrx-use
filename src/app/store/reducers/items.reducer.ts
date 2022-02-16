import { createReducer, on } from "@ngrx/store";
import { addItems, removeItems } from "../actions/items.actions";

export const initialState = ['osx', 'linux', 'windows'];

export const itemsReducer = createReducer(
  initialState,
  on(addItems, (state, action) => [...state, action.value]),
  on(removeItems, (state, action) => state.filter(item => item !== action.value))
)
