import {
  GET_TENDERS,
  TENDERS_LOCATION,
  TENDERS_BOOKMARKED,
  CREATE_TENDER_BOOKMARK
} from "../actions/types";

const initialState = {
  tenders: [],
  tenders_count: 0,
  tender_locations: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TENDERS:
      return {
        ...state,
        tenders: action.payload.results,
        tenders_count: action.payload.count
      };
    case TENDERS_LOCATION:
      return {
        ...state,
        tender_locations: action.payload
      };
    case TENDERS_BOOKMARKED:
      return {
        ...state,
        tenders: action.payload
      };
    case CREATE_TENDER_BOOKMARK:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
