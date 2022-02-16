import { createAction, props } from "@ngrx/store";

export const addItems = createAction(
  '[Items] Add',
  props<{ value: string }>()
)

export const removeItems = createAction(
  '[Items] Remove',
  props<{ value: string }>()
)
