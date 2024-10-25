import Container from "react-bootstrap/Container";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {logout} from '../../services/apiServices'
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Profile from "./Profile";

const Header = () => {
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );
    const account = useSelector((state) => state.account.account);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [isShowModalInfo, setIsShowModalInfo] = useState(false)

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

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
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className="navbar-brand">
                        Quiz Project
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">
                                {t('header.home')}
                            </NavLink>
                            <NavLink to="/users" className="nav-link">
                                {t('header.Users')}
                            </NavLink>
                            <NavLink to="/admin" className="nav-link">
                                {t('header.Admin')}
                            </NavLink>
                        </Nav>
                        <Nav>
                            {isAuthenticated === false ? (
                                <>
                                    <button
                                        className="btn-login"
                                        onClick={() => handleLogin()}
                                    >
                                        {t('header.Login')}
                                    </button>
                                    <button
                                        className="btn-signup"
                                        onClick={() => handleRegister()}
                                    >
                                        {t('header.Logout')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavDropdown
                                        title="Settings"
                                        id="basic-nav-dropdown"
                                    >
                                        <NavDropdown.Item onClick={() => setIsShowModalInfo(true)}>{t('header.Profile')}</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleLogout()}>{t('header.Logout')}</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            )}
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile show={isShowModalInfo} setShow={setIsShowModalInfo}/>
        </>
    );
};

export default Header;
