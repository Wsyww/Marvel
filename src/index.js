import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
// import App from '@/pages/login'
// import App from '@/pages/home'
import '@/common/style/frame.less'

const antdConfig = {
  locale: zhCN
}

ReactDOM.render(
  <ConfigProvider {...antdConfig}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

