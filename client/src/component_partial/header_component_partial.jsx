/* eslint-disable indent */
//from system
import React from "react";
import prop_types from "prop-types";

import * as antd from "antd";

// import collection_helper from "../helper/collection_helper";
// import constant_helper from "../helper/constant_helper";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

class HeaderComponentPartial extends React.Component {
	constructor(props) {
		super(props);

		this.on_register = this.on_register.bind(this);
		this.on_login = this.on_login.bind(this);
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

	on_register() {
		this.props.history.push("/register");
	}

	on_login() {
		this.props.history.push("/login");
	}

	render() {
		return (
			<antd.Layout.Header style={{ background: "#FFF", borderBottom: "1px solid #00000010" }}>
				<div style={{ padding: "0", margin: "0 auto", maxWidth: 1200, height: "inherit", display: "flex", flex: 1, }}>
					<div style={{ flex: 1 }}>
						<span className="nector-logo" style={{ cursor: "pointer" }}>
							{/* <antd.Avatar style={{ height: 50, width: 50 }} src={"https://cdn.nector.io/nector-static/image/nectoryellow.png"} /> */}
							<span className="nectorflash-subtitle" style={{ color: "#000" }}>To Do's</span>
						</span>
					</div>

					<div>
						<antd.Button type="link" style={{ marginRight: 20, color: "#000" }} onClick={this.on_register}>Join</antd.Button>
						<antd.Button type="link" style={{ color: "#000" }} onClick={this.on_login}>Log in</antd.Button>
					</div>
				</div>
			</antd.Layout.Header>
		);
	}
}

HeaderComponentPartial.propTypes = properties;
export default HeaderComponentPartial;