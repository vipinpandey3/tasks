import * as types from '../types'

import collection_helper from "../../helper/collection_helper";
import constant_helper from "../../helper/constant_helper";

const inntialState = {
    // isAuth: collection.getCookie(types.AUTH_TOKEN) ? true : false,
    // token: "" || collection.getCookie(types.AUTH_TOKEN),
    error: false,
    message: "",
    loading: false,
    authorization: "" || collection_helper.process_get_item(constant_helper.get_app_constant().CLASSMENT_AUTHORIZATION),
};

const authReducer = (state = inntialState, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            // collection.setCookies(types.AUTH_TOKEN, action.payload.token);
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                error: action.payload.error,
                message: action.payload.message,
                loading: action.payload.loading,
                
            };

        case types.LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                isAuth: false,
                token: "",
                message: action.payload.message
            };

        case types.REMOVE_COOKIE:
            // collection.deleteCookie(types.AUTH_TOKEN)
            return {
                ...state,
                isAuth: false,
                token: ""
            };

        case types.USER_LOGOUT: 
            // collection.deleteCookie(types.AUTH_TOKEN)
            return {
                ...state,
                isAuth: false,
                token: ""
            };
    
        case types.HIDE_NOTIFICATION:
            return {
                ...state,
                error: false,
                message: ""
            }
        default:
            return state;
    }
}

export default authReducer