import React from "react";
import { SideBar } from "../components/SideBar";

export const MainLayout = ({ children }) => (
  <>
    <div className="row">
      <div className="col-md-3 px-3">
        <SideBar />
      </div>
      <div className="col-md-9">{children}</div>
    </div>
  </>
);
