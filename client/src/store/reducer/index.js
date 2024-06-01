import { combineReducers } from "redux";

import app_reducer  from "./app_reducer";
import task_reducer from "./task_reducer";

export default combineReducers({
	app: app_reducer,
	task: task_reducer
});
