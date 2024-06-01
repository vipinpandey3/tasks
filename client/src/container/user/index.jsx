/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types'
import * as redux from "redux";
import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";

import * as app_action from '../../store/action/app_action'
import UserComponent from '../../component/user';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
	}
  

  render() {
		return (
			<UserComponent {...this.props} />
		);
	}
}

UserContainer.propTypes = {
};

const map_state_to_props = state => {
  return {}
}

const map_dispatch_to_props = dispatch => ({
	app_action: redux.bindActionCreators(app_action, dispatch)
});

UserContainer = react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null)(UserContainer));
// export default Class
export default UserContainer