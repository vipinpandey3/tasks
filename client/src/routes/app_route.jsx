//from system
import { Suspense } from "react";
import * as antd from "antd";
import * as react_router_dom from "react-router-dom";

// containers

import AuthenticatedContainer from "../container/misc/authenticated_container";
import NotAuthenticatedContainer from "../container/misc/not_authenticated_container";

import AppContainer from "../container/app_container";

import LoginContainer from "../container/auth/login_container";
import RegisterContainer from "../container/auth/register_container";
import TasksContainer from '../container/tasks'

const PageLoader = () => (
	<div className="nector-center" style={{ height: "100%" }}>
		<antd.Spin size="large" />
	</div>
);


const AppRoutes = () => {
	return (
		<AppContainer>
			<Suspense fallback={<PageLoader />}>
				<react_router_dom.Switch>
					<NotAuthenticatedContainer exact path="/login" component={LoginContainer} />
					<NotAuthenticatedContainer exact path="/register" component={RegisterContainer} />
					<AuthenticatedContainer exact path="/tasks" component={TasksContainer} />
					<react_router_dom.Redirect from='*' to='/tasks' />
				</react_router_dom.Switch>
			</Suspense>
		</AppContainer>
	);
};

export default AppRoutes;