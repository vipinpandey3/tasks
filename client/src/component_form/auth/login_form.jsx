/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


//from system
import * as antd from "antd";


// eslint-disable-next-line no-unused-vars
const LoginForm = (props) => {
	const [form] = antd.Form.useForm();

	// useEffect(() => {
	// 	form.setFieldsValue({ otp: "" });
	// }, [form, props.state.current_step]);

	const render_view = () => {
		return (
			<div>
				<div className="login-formtitle" style={{ marginBottom: 20 }}>Log in</div>

				<antd.Form form={form} onFinish={props.api_open_create_logins}>

					<antd.Form.Item label="Email" name="email" rules={[{ type: "email", message: "Please enter valid email" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Password" name="password" rules={[{ type: "password", message: "Please enter valid password" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item style={{ textAlign: "center", width: "100%" }}>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Continue </antd.Button>
					</antd.Form.Item>


				</antd.Form>
			</div>
		);
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

export default LoginForm;