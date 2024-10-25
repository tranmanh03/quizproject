import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { ImSpinner10 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import Language from "../Header/Language";
import { useTranslation } from 'react-i18next';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLoggin = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }

        if (!password) {
            toast.error("Invalid password");
            return;
        }
        setIsLoading(true);

        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate("/");
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    };

    const hanleOnKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleLoggin()
        }
    }
    return (
        <div className="login-container">
            <div className="header col-4">
                <span>{t('login.header_title')}</span>
                <button onClick={() => navigate("/register")}>{t('login.signup')}</button>
                <Language />
            </div>
            <div className="title col-4 mx-auto">{t('login.title-quiz')}</div>
            <div className="welcome col-4 mx-auto">{t('login.welcome')}</div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group pass-group">
                    <label>{t('login.password')}</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => hanleOnKeyDown(e)}
                    />
                    {isShowPassword ? (
                        <span
                            className="icons-eye"
                            onClick={() => setIsShowPassword(false)}
                        >
                            <VscEye />
                        </span>
                    ) : (
                        <span
                            className="icons-eye"
                            onClick={() => setIsShowPassword(true)}
                        >
                            <VscEyeClosed />
                        </span>
                    )}
                </div>
                <span className="forgot-password">{t('login.forgotPass')}</span>
                <div>
                    <button
                        className="btnLogin"
                        onClick={() => handleLoggin()}
                        disabled={isLoading}
                    >
                        {isLoading && <ImSpinner10 className="loaderIcon" />}
                        <span>{t('login.login')}</span>
                    </button>
                </div>
                <div className="text-center">
                    &#60;&#60;
                    <span onClick={() => navigate("/")}>{t('login.gotohomepage')}</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
