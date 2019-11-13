import { GET_TOKEN } from "../actions/types";

const initialState = {
    paymentToken: [],
    // payment_SToken: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state,
                paymentToken: action.payload
            };
        // case POST_TOKEN:
        //     return {
        //         ...state,
        //         payment_SToken: action.payload
        //     };
        default:
            return state;
    }
}
