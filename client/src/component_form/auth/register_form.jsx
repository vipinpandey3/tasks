/* eslint-disable react/prop-types */
// eslint-disable no-useless-escape
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";

//from system
import * as antd from "antd";
// import * as antd_icons from "@ant-design/icons";

const RegisterForm = (props) => {
	const [form] = antd.Form.useForm();

	const render_view = () => {
			return (
			<div>
				<div className="nectorflash-protitle" style={{ marginBottom: 20 }}>Join </div>
				<antd.Form form={form} onFinish={props.api_open_create_accounts}>
					<antd.Row gutter={12}>
						<antd.Col span={12}>
							<antd.Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
								<antd.Input />
							</antd.Form.Item>
						</antd.Col>

						<antd.Col span={12}>
							<antd.Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
								<antd.Input />
							</antd.Form.Item>
						</antd.Col>

					</antd.Row>
					<antd.Form.Item label="Email" name="email" rules={[{ type: "email", message: "Please enter valid email" }, { required: true, message: "Please enter a value" }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>
					<antd.Form.Item 
						label="Password"
						name="password"
						rules={[
							{ type: "string", message: "password" }, 
							{ required: true, message: "Please enter a value" }
						]}
						labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>



					<div style={{ textAlign: "center" }}>
						<Link to="/login">
							<antd.Button style={{ padding: 0, marginBottom: 20 }} type="text">
								<span className="nectorflash-pretext" style={{ textDecoration: "underline" }}>{"Already have an account? Log in"}</span>
							</antd.Button>
						</Link>
					</div>
					<antd.Form.Item style={{ textAlign: "center" }}>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Register </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</div >);
		
	};

	return (
		<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<div style={{ margin: "0 auto", width: 500 }}>
				<antd.Card bodyStyle={{ display: "flex", alignItems: "left", flexDirection: "column", }} style={{ margin: "auto", textAlign: "left" }}>
					{render_view()}
				</antd.Card>
			</div>
		</div>
	);
};

export default RegisterForm;