/* eslint-disable indent */
import collection_helper from "../../helper/collection_helper";
import constant_helper from "../../helper/constant_helper";

const initial_state = {
	tasks: {
        list: [],
        attributes: []
    }
};

const task_reducer = (state = initial_state, action) => {
	switch (action.type) {
        case constant_helper.get_app_constant().FETCH_TASKS_LIST:
            console.log("action", action.payload)
            return {
                ...state,
                tasks: {
                    list: action.payload.data.tasks,
                    attributes: action.payload.data.attributes
                }
            }
		// fallback and return the state
		default:
			return {
				...state
			};
	}
};

export default task_reducer;
