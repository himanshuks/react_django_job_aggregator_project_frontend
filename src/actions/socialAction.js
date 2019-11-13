import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./messageAction";

import { GET_SOCIAL } from "./types";

export const getSocial = () => (dispatch, getState) => {
  axios
    .get(
      "http://127.0.0.1:8000/api/v1/social_feed_posts/",
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: GET_SOCIAL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getFilteredSocial = filteredResultsAPI => (dispatch, getState) => {
  axios
    .get(`${filteredResultsAPI}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SOCIAL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
