/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types'
import * as redux from "redux";
import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";

import * as app_action from '../../store/action/app_action'
import TaskComponent from '../../component/task';

class TaskContainer extends React.Component {
  constructor(props) {
    super(props);
	}
  

  render() {
		return (
			<TaskComponent {...this.props} />
		);
	}
}

TaskContainer.propTypes = {
  task: PropTypes.object.isRequired,
};

const map_state_to_props = state => {
  console.log("tasks", state.combine_reducer.task)
  return {
    task: state.combine_reducer.task
  }
}

const map_dispatch_to_props = dispatch => ({
	app_action: redux.bindActionCreators(app_action, dispatch)
});

TaskContainer = react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null)(TaskContainer));
// export default Class
export default TaskContainer