import React from "react";
import Header from "./Header";

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[80%]">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
