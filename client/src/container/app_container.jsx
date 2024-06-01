//from system
import prop_types from "prop-types";
import React from "react";

import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";
import * as redux from "redux";
import * as antd from "antd";

import * as app_action from "../store/action/app_action";

import HeaderComponentPartial from "../component_partial/header_component_partial.jsx";
import SideNav from "../component_partial/side_nav_component.jsx";
import collection_helper from "../helper/collection_helper.js"
import constant_helper from "../helper/constant_helper.js";
import dayjs from 'dayjs';

dayjs.locale('en'); // Change 'en' to your desired locale

const properties = {
	children: prop_types.object.isRequired,
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,
	// actions
	app_action: prop_types.object.isRequired,
};

class AppContainer extends React.Component {
	constructor(props) {
		super(props);

		

		this.set_state = this.set_state.bind(this);
	}

	set_state(values) {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			...state,
			...values,
		}));
	}

	render() {
		const extra_style = this.props.location.pathname === "/" ? {} : { width: 'calc(100vw)', padding: "20px" };
		let auth_token = collection_helper.process_get_item(constant_helper.get_app_constant().CLASSMENT_AUTHORIZATION)
		return (
			<antd.Layout>
				<antd.Layout hasSider style={{ maxHeight: "100%", overflow: "hidden" }}>
					<antd.Layout id="main-container" style={{ overflow: "auto" }}>
						<HeaderComponentPartial {...this.props} />

						<antd.Layout.Content style={{ ...extra_style }}>
							{this.props.children}
						</antd.Layout.Content>

					</antd.Layout>
				</antd.Layout>
			</antd.Layout>
		);
	}
}

AppContainer.propTypes = properties;

const map_state_to_props = (state) => {
	return {
		header: state.combine_reducer.app.header
	}
};

const map_dispatch_to_props = (dispatch) => ({
	app_action: redux.bindActionCreators(app_action, dispatch),
});

// eslint-disable-next-line no-class-assign
AppContainer = react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null, {})(AppContainer));
export default AppContainer;