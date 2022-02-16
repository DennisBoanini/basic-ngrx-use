import { createReducer, on } from "@ngrx/store";
import { addUser, editUser, removeUser } from "../actions/user.actions";
import { User } from "../../model/user.model";

export const initialState: User[] = [
  {id: 1, name: 'Dennis', age: 34},
  {id: 2, name: 'Romina', age: 37},
  {id: 3, name: 'Focaccino', age: 2},
]

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, action) => [...state, {...action.user, id: Date.now()}]),
  on(removeUser, (state, action) => state.filter(user => user.id !== action.id)),
  on(editUser, (state, action) => state.map(item => item.id === action.user.id ? { ...item, ...action.user} : item)),
)
