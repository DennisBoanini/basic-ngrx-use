import { createAction, props } from "@ngrx/store";

export const cleanProfile = createAction('[Profile] Clean profile');
export const updateProfile = createAction(
  '[Profile] Update profile',
  props<{ value: string }>()
);
