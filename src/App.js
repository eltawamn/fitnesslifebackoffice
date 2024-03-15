import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from "./routes/route";
import { ConfigProvider } from "antd";


const App = () => {
  return (
    <ConfigProvider theme={'realDark'}>
      <BrowserRouter>
        <UserContextProvider>
          <AppRoutes />
          <ToastContainer />
        </UserContextProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
