// system import
import { thunk } from "redux-thunk";
import promise from "redux-promise";
import logger from "redux-logger";

import * as redux from "redux";

import combine_reducer from './reducer/index'

import collection_helper from "../helper/collection_helper";

let middleware = [thunk, promise];
let enhancer = null;
middleware = [...middleware, logger];

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
enhancer = composeEnhancers(redux.applyMiddleware(...middleware));
// if (collection_helper.process_env_value(process.env.REACT_APP_MODE) !== "production") {
// } else {
// 	enhancer = redux.applyMiddleware(...middleware);
// }

const initialize_store = () => (redux.createStore(redux.combineReducers({ combine_reducer }), enhancer));
export default initialize_store;
