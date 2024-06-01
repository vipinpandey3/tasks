/* eslint-disable indent */
import collection_helper from "../../helper/collection_helper";
import constant_helper from "../../helper/constant_helper";

const initial_state = {
	header: {
		authorization: "" || collection_helper.process_get_item(constant_helper.get_app_constant().TODO_AUTHORIZATION),
	},
};

const app_reducer = (state = initial_state, action) => {
	switch (action.type) {

		// fallback and return the state
		default:
			return {
				...state
			};
	}
};

export default app_reducer;
