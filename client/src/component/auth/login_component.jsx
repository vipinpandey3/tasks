/* eslint-disable no-unreachable */
//from system
import React from "react";
import prop_types from "prop-types";

import constant_helper from "../../helper/constant_helper";
import collection_helper from "../../helper/collection_helper";

import LoginForm from "../../component_form/auth/login_form";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			attributes: {
				email: "",
				token: "",
			},
		};

		this.api_open_create_logins = this.api_open_create_logins.bind(this);

		
		this.set_state = this.set_state.bind(this);
	}

	// mounted
	componentDidMount() {
		// eslint-disable-next-line no-undef

	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	

	api_open_create_logins(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_LOGIN_SUCCESS_DISPATCH,
			endpoint: constant_helper.get_app_constant().LOGIN_API_END_POINT,
			params: {},
			attributes: {
				email: values.email,
				password: values.password
			}
		};

		this.set_state({ loading: true });
		this.props.app_action.api_generic_post(opts, (result) => {
			this.set_state({ loading: false });
			if (result.data.resultShort === "success") {
				collection_helper.process_add_item(constant_helper.get_app_constant().TODO_AUTHORIZATION, result.data.data.jwt);
				collection_helper.process_add_item(constant_helper.get_app_constant().TODO_USER_FIRSTNAME, result.data.data.user_details.user_first_name);
				collection_helper.process_add_item(constant_helper.get_app_constant().TODO_USER_LASTTNAME, result.data.data.user_details.user_last_name);
				collection_helper.process_add_item(constant_helper.get_app_constant().TODO_USER_EMAIL, result.data.data.user_details.user_email);
				collection_helper.process_add_item(constant_helper.get_app_constant().TODO_USER_ID, result.data.data.user_details.user_id);
				collection_helper.process_add_item(constant_helper.get_app_constant().TODO_GENDER, result.data.data.user_details.user_gender);
				// eslint-disable-next-line no-undef
				window.location.reload();
			}
		});
	}

	
	set_state(values) {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			...state,
			...values
		}));
	}

	render() {
		return (<LoginForm {...this.props} state={this.state}
			api_open_create_logins={this.api_open_create_logins}
		/>);
	}
}

LoginComponent.propTypes = properties;

export default LoginComponent;