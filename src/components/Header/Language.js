import { NavDropdown } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

function Language() {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }
    return (
        <>
            <NavDropdown
                title={i18n.language === 'vi' ? "Việt Nam" : "English"}
                id="basic-nav-dropdown"
                className="languages"
            >
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Language;