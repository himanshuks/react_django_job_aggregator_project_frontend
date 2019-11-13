import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./messageAction";

import {
  GET_CONTRACTS,
  CONTRACTS_LOCATION,
  CONTRACTS_BOOKMARKED,
  CREATE_CONTRACT_BOOKMARK
} from "./types";

export const getContracts = () => (dispatch, getState) => {
  axios
    .get("http://127.0.0.1:8000/api/v1/contracts/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CONTRACTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getContractsLocations = () => (dispatch, getState) => {
  axios
    .get(
      "http://127.0.0.1:8000/api/v1/contract_locations/",
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: CONTRACTS_LOCATION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getBookmarkedContracts = () => (dispatch, getState) => {
  axios
    .get(
      "http://127.0.0.1:8000/api/v1/bookmarked_contracts/",
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: CONTRACTS_BOOKMARKED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addBookmarkedContracts = contractID => (dispatch, getState) => {
  const body = JSON.stringify({ contract: contractID });

  axios
    .post(
      "http://127.0.0.1:8000/api/v1/create_bookmarked_contracts/",
      body,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: CREATE_CONTRACT_BOOKMARK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getFilteredContracts = filteredResultsAPI => (
  dispatch,
  getState
) => {
  axios
    .get(`${filteredResultsAPI}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CONTRACTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
