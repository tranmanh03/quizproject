import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavDropdown } from "react-bootstrap";
import Language from '../Header/Language'

function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => {setCollapsed(!collapsed)}}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <NavDropdown
                                title="Settings"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Language />
                    </div>
                </div>
                <div className="admin-content-details">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;
