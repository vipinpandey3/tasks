/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import constant_helper from "../../helper/constant_helper";
import collection_helper from "../../helper/collection_helper";
import { Card, Typography } from 'antd';
import {  Row, Col } from 'antd';
import * as antd from 'antd'

const attributes = [
    {
        "id": "user_email",
        "name": "User Email"
    },
    {
        "id": "user_firstname",
        "name": "First Name"
    },
    {
        "id": "user_laststname",
        "name": "Is Class Teacher"
    },
    {
        "id": "user_id",
        "name": "User Id"
    },
    {
        "id": "user_gender",
        "name": "Standard"
    }
]

class UserComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};
		this.set_state = this.set_state.bind(this);
        this.render_description = this.render_description.bind(this);
	}

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

    render_description() {
        
        let data_source = collection_helper.process_get_all_items();
        return (
          <antd.Card>
            <antd.Descriptions title="User Info">
                <antd.Descriptions.Item label="User Id">{data_source.user_id}</antd.Descriptions.Item>
                <antd.Descriptions.Item label="First Name">{data_source.user_firstname}</antd.Descriptions.Item>
                <antd.Descriptions.Item label="Last Name">{data_source.user_lastname}</antd.Descriptions.Item>
                <antd.Descriptions.Item label="Email">{data_source.user_email}</antd.Descriptions.Item>
                <antd.Descriptions.Item label="Gender">
                {data_source.GENDER}
                </antd.Descriptions.Item>
            </antd.Descriptions>
          </antd.Card>
        )
      }

	
	set_state(key, value) {
		this.setState({
			...this.state,
			[key]: value
		})
	}

	render() {
		return (
            <>
                {this.render_description()}
            </>
        )
	}
}

UserComponent.propTypes = {
	// class: PropTypes.object.isRequired,
	app_action: PropTypes.object.isRequired,
};


export default UserComponent