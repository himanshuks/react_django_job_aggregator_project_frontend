import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./messageAction";
import { GET_TOKEN, PAYMENT_FAIL, PAYMENT_SUCCESS } from "./types";

export const getToken = () => (dispatch, getState) => {
    axios
        .get("http://127.0.0.1:8000/api/v1/checkout/new/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TOKEN,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
export const payment = ({ subscription_plan_id, payment_method_nonce }) => (dispatch, getState) => {
    // Headers
    // const config = {
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // };

    // Request Body
    const body = JSON.stringify({
        subscription_plan_id,
        payment_method_nonce
    });

    axios
        .post("http://127.0.0.1:8000/api/v1/checkout/new/", body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: PAYMENT_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: PAYMENT_FAIL
            });
        });
};
