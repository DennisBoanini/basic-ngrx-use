import { createAction, props } from "@ngrx/store";
import { User } from "../../model/user.model";

export const addUser = createAction(
  '[User] Add',
  props<{ user: User }>()
);

export const removeUser = createAction(
  '[User] Remove',
  props<{ id: number }>()
);

export const editUser = createAction(
  '[User] Edit',
  props<{ user: User }>()
);
