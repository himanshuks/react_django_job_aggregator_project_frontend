import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./messageAction";

import { GET_PLANS } from "./types";

export const getPlans = () => (dispatch, getState) => {
    axios
        .get("http://127.0.0.1:8000/api/v1/subscription_plans/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PLANS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
