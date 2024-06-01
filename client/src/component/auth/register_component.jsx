/* eslint-disable no-unreachable */
//from system
import React from "react";
import prop_types from "prop-types";

import constant_helper from "../../helper/constant_helper";
import collection_helper from "../../helper/collection_helper";

import RegisterForm from "../../component_form/auth/register_form";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class RegisterComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			attributes: {
				firstName: "",
				laststName: "",
				email: "",
				password: "",
				gender: ""
			},
		};

		this.api_open_create_accounts = this.api_open_create_accounts.bind(this);
		
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

	api_open_create_accounts(values) {
		if (!values.terms) return collection_helper.show_message("Please accept the terms", "error");

		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_OTP_DISPATCH,
			endpoint: "create-user",
			params: {},
			attributes: {
				email: values.email,
				referral_code: values.referral_code,
			},
		};

		this.set_state({ loading: true });
		this.props.app_action.api_generic_post(opts, (result) => {
			this.set_state({ loading: false });
			// if (result.meta.status === "success") {
			// 	this.set_state({
			// 		current_step: 2,
			// 		attributes: {
			// 			...this.state.attributes,
			// 			name: values.name,
			// 			email: values.email,
			// 			referral_code: values.referral_code,
			// 			token: result.data.token,
			// 			country: values.country,
			// 		}
			// 	});
			// }
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
		return (<RegisterForm {...this.props} state={this.state}
			api_open_create_accounts={this.api_open_create_accounts} />);
	}
}

RegisterComponent.propTypes = properties;

export default RegisterComponent;