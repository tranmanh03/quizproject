import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

function HomePage() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );

    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video width="750" height="500" autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">
                    {t('homepage.title1')}
                </div>
                <div className="title-2">
                    Collect all the data you need to understand customers with
                    forms designed to be refreshingly different.
                </div>
                <div className="title-3">
                    {isAuthenticated === false ? (
                        <button onClick={() => navigate("/login")}>
                            Get started. It's free
                        </button>
                    ) : (
                        <button onClick={() => navigate("/users")}>
                            Start Quiz Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
