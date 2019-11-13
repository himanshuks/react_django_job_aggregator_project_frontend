import { GET_SOCIAL } from "../actions/types";

const initialState = {
  social: [],
  social_count: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SOCIAL:
      return {
        ...state,
        social: action.payload.results,
        social_count: action.payload.count
      };
    default:
      return state;
  }
}
