import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import Language from '../Header/Language'
import Profile from "../Header/Profile";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import {logout} from '../../services/apiServices'

function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const [isShowModalInfo, setIsShowModalInfo] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const account = useSelector((state) => state.account.account);

    const handleLogout = async () => {
        let res = await logout(account.email, account.refresh_token)
        if(res && res.EC === 0) {
            dispatch(doLogout())
            navigate('/login')
        } else {
            toast.error(res.EM)
        }
    }

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
                                <NavDropdown.Item onClick={() => setIsShowModalInfo(true)}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
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
            <Profile show={isShowModalInfo} setShow={setIsShowModalInfo}/>
        </div>
    );
}

export default Admin;
