//from system
import React from "react";

import prop_types from "prop-types";

import * as redux from "redux";
import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";

import * as app_action from "../../store/action/app_action";

import RegisterComponent from "../../component/auth/register_component";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,

	systeminfos: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};


class RegisterContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	// mounted
	componentDidMount() {

	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	render() {
		return (
			<RegisterComponent {...this.props} />
		);
	}
}

RegisterContainer.propTypes = properties;

const map_state_to_props = state => ({
	header: state.combine_reducer.app.header,
	
});

const map_dispatch_to_props = dispatch => ({
	app_action: redux.bindActionCreators(app_action, dispatch)
});

// eslint-disable-next-line no-class-assign
RegisterContainer = react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null)(RegisterContainer));
export default RegisterContainer;