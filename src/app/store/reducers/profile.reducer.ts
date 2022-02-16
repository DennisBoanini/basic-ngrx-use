import { createReducer, on } from "@ngrx/store";
import { cleanProfile, updateProfile } from "../actions/profile.actions";

export const profileReducer = createReducer(
  'Dennis A. Boanini',
  on(cleanProfile, () => ''),
  on(updateProfile, (_, action) => action.value)
)
