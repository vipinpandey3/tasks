/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Card, Descriptions, Avatar } from 'antd';
import PropTypes from 'prop-types';
import constant_helper from '../../helper/constant_helper';
import collection_helper from '../../helper/collection_helper';
import { UserOutlined } from '@ant-design/icons';
import maleAvatar from '../../assets/boy-avatar.png'; // Add the path to your male avatar image
import femaleAvatar from '../../assets/girl-avatar.png'; // Add the path to your female avatar image

const attributes = [
  {
    id: 'user_email',
    name: 'User Email',
  },
  {
    id: 'user_firstname',
    name: 'First Name',
  },
  {
    id: 'user_lastname',
    name: 'Is Class Teacher',
  },
  {
    id: 'user_id',
    name: 'User Id',
  },
  {
    id: 'user_gender',
    name: 'Standard',
  },
];

class UserComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.set_state = this.set_state.bind(this);
    this.render_description = this.render_description.bind(this);
  }

  componentDidMount() {}

  // updating
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  // unmount
  componentWillUnmount() {}

  render_description() {
    let data_source = collection_helper.process_get_all_items();
    const avatarSrc = data_source.GENDER === 'Male' ? maleAvatar : data_source.GENDER === 'Female' ? femaleAvatar : "";

    return (
      <Card>
        <Descriptions title="User Info">
          <Descriptions.Item label="User Avatar">
            <Avatar size={64} src={avatarSrc} icon={<UserOutlined />} />
          </Descriptions.Item>
          <Descriptions.Item label="User Id">{data_source.user_id}</Descriptions.Item>
          <Descriptions.Item label="First Name">{data_source.user_firstname}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{data_source.user_lastname}</Descriptions.Item>
          <Descriptions.Item label="Email">{data_source.user_email}</Descriptions.Item>
          <Descriptions.Item label="Gender">{data_source.GENDER}</Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }

  set_state(key, value) {
    this.setState({
      ...this.state,
      [key]: value,
    });
  }

  render() {
    return <>{this.render_description()}</>;
  }
}

UserComponent.propTypes = {
  // class: PropTypes.object.isRequired,
  app_action: PropTypes.object.isRequired,
};

export default UserComponent;
