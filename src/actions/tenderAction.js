import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./messageAction";

import {
  GET_TENDERS,
  TENDERS_LOCATION,
  TENDERS_BOOKMARKED,
  CREATE_TENDER_BOOKMARK
} from "./types";

export const getTenders = () => (dispatch, getState) => {
  axios
    .get("http://127.0.0.1:8000/api/v1/tenders/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TENDERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getTendersLocations = () => (dispatch, getState) => {
  axios
    .get(
      "http://127.0.0.1:8000/api/v1/tender_locations/",
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: TENDERS_LOCATION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getBookmarkedTenders = () => (dispatch, getState) => {
  axios
    .get(
      "http://127.0.0.1:8000/api/v1/bookmarked_tenders/",
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: TENDERS_BOOKMARKED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addBookmarkedTenders = tenderID => (dispatch, getState) => {
  const body = JSON.stringify({ tender: tenderID });

  axios
    .post(
      "http://127.0.0.1:8000/api/v1/create_bookmarked_tenders/",
      body,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: CREATE_TENDER_BOOKMARK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getFilteredTenders = filteredResultsAPI => (
  dispatch,
  getState
) => {
  axios
    .get(`${filteredResultsAPI}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TENDERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
