// import 'antd/dist/antd.css'; // Add this line at the top of the file
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from "antd";
import * as history from "history";
import * as react_router_dom from "react-router-dom";
import * as react_redux from "react-redux";
import './style/app.less';
import "./style/index.css"
import index_store from "./store/index_store";
import AppRoutes from './routes/app_route';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <react_redux.Provider store={index_store()}>
    <react_router_dom.Router history={history.createBrowserHistory()}>
      <ConfigProvider 
        theme={{
					token: {
						// Seed Token
						// Can get the variables from https://ant.design/theme-editor
						colorPrimary: "#000",
						fontSizeReset: "12px",
					},
				}}>
          <AppRoutes />
      </ConfigProvider>
    </react_router_dom.Router>
  </react_redux.Provider>
);
