import React from "react";
import ResponsiveAppBar from "../NavBar/index";
import Sidebar from "../Sidebar/Index";

const Layout = ({ children }) => {

  return (
    <div style={{ display: "flex" }}>
        <div
          style={{
            width: "15%",
            height: "100vh",
            borderRight: "1px solid black",
          }}
        >
          <Sidebar />
        </div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ width: "100%" }}>
            <ResponsiveAppBar />
          </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
