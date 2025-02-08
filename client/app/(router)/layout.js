import React from "react";
import Sidenav from "./_components/Sidenav";
import Header from "./_components/Header";

const layout = ({ children }) => {
  return (
    <div>
      <div className="sm:w-64 hidden sm:block fixed">
        <Sidenav />
      </div>
      <div className="sm:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
