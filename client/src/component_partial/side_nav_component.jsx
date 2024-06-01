import React, { useState } from 'react';
import { Layout, Menu, Button, Badge, Dropdown } from 'antd';
import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SettingOutlined
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const getItem = (label, key, icon, path, type) => ({
  key,
  icon,
  label: <Link to={path}>{label}</Link>,
  type,
});

const menuItems = [
  getItem('Dashboard', '1', <PieChartOutlined />, '/dashboard'),
  getItem('Class', '2', <DesktopOutlined />, '/class'),
  getItem('Student', '3', <ContainerOutlined />, '/students'),
  getItem('User', '4', <UserOutlined />, '/users'),
  getItem('Exams', '5', <MailOutlined />, '/exams'),
];

const SideNav = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const notificationsMenu = {
    items: [
      { key: '1', label: 'Notification 1' },
      { key: '2', label: 'Notification 2' },
      { key: '3', label: 'Notification 3' },
    ],
  };

  const settingsMenu = {
    items: [
      { key: '1', label: 'Setting 1' },
      { key: '2', label: 'Setting 2' },
      { key: '3', label: 'Setting 3' },
    ],
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        style={{ position: 'fixed', height: '100vh', overflow: 'auto', zIndex: 1 }}
      >
        <div className="logo" style={{ height: '45px', margin: '16px', background: 'rgba(255, 255, 255, 0.3)' }} />
        <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark" items={menuItems} />
      </Sider>
      <Layout style={{ marginLeft: isCollapsed ? '80px' : '200px' }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, color: 'white', fontSize: '24px', display: 'flex', justifyContent: 'space-between' }}
        >
          {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggleSidebar,
          })}
          <div>
            <Dropdown menu={notificationsMenu} placement="bottomRight">
              <Badge count={3} dot>
                <Button shape="circle" icon={<BellOutlined />} style={{ marginRight: '10px' }} />
              </Badge>
            </Dropdown>
            <Dropdown menu={settingsMenu} placement="bottomRight">
              <Button shape="circle" icon={<SettingOutlined />} style={{ marginRight: '10px' }} />
            </Dropdown>
            <Button shape="circle" icon={<LogoutOutlined />} onClick={logout} />
          </div>
        </Header>
        <Content
          style={{
            background: '#fff',
            minHeight: 'calc(100vh - 112px)',
            overflowY: 'auto',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideNav;
