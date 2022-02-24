import { SET_OUTPUT_ITEMS, REMOVE_OUTPUT_ITEM, CLEAR_OUTPUT } from '../actions'

const initialState = []

export default function outputReducer (state = initialState, action) {
  switch (action.type) {
    case SET_OUTPUT_ITEMS:
      return [...state, action.item]
    case REMOVE_OUTPUT_ITEM:
      return action.items
    case CLEAR_OUTPUT:
      return []

    default:
      return state
  }
}