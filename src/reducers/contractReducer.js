import {
  GET_CONTRACTS,
  CONTRACTS_LOCATION,
  CONTRACTS_BOOKMARKED,
  CREATE_CONTRACT_BOOKMARK
} from "../actions/types";

const initialState = {
  contracts: [],
  contracts_count: 0,
  contract_locations: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTRACTS:
      return {
        ...state,
        contracts: action.payload.results,
        contracts_count: action.payload.count
      };
    case CONTRACTS_LOCATION:
      return {
        ...state,
        contract_locations: action.payload
      };
    case CONTRACTS_BOOKMARKED:
      return {
        ...state,
        contracts: action.payload
      };
    case CREATE_CONTRACT_BOOKMARK:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
