import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';

export const NAV_LIST = [
    { key: '1', icon: <UploadOutlined />, children: 'Dashboard', to: "/dashboard" },
    { key: '2', icon: <UserOutlined />, children: 'User', to: "/user" },
    { key: '3', icon: <VideoCameraOutlined />, children: 'Class', to: "/class" },
];