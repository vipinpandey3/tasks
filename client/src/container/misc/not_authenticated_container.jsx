//from system
import React from "react";

import prop_types from "prop-types";

import * as redux from "redux";
import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";

//from antd
import * as app_action from "../../store/action/app_action";

import collection_helper from "../../helper/collection_helper";
import constant_helper from "../../helper/constant_helper";

const properties = {
	location: prop_types.any.isRequired,
	history: prop_types.any.isRequired,
	path: prop_types.string.isRequired,

	header: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

class NotAuthenticatedContainer extends React.Component {
	render() {
		const auth_token = collection_helper.process_get_item(constant_helper.get_app_constant().TODO_AUTHORIZATION) || "";
		return (
			<react_router_dom.Route exact path={this.props.path} render={(props) => (auth_token.length > 0 ? (this.props.location.pathname != "/" && <react_router_dom.Redirect {...props} to='/' />) : <this.props.component {...props} />)} />
		);
	}
}

NotAuthenticatedContainer.propTypes = properties;

const map_state_to_props = state => ({
	header: state.combine_reducer.app.header,
});

const map_dispatch_to_props = dispatch => ({
	app_action: redux.bindActionCreators(app_action, dispatch)
});

// eslint-disable-next-line no-class-assign
NotAuthenticatedContainer = react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null)(NotAuthenticatedContainer));
export default NotAuthenticatedContainer;