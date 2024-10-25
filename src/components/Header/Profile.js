import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './Profile.scss'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, changePassword, getHistory } from "../../services/apiServices";
import {toast} from 'react-toastify'
import { doUpdateInfo } from "../../redux/action/userAction";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Profile = ({ show, setShow}) => {
    const handleClose = () => {
        setShow(false);
    };
    const account = useSelector((state) => state.account.account);
    const dispatch = useDispatch()

    const [isShowPassword, setIsShowPassword] = useState(false);

    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [username, setUsername] = useState();
    const [image, setImage] = useState();
    const [previewImageP, setpreviewImageP] = useState();

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [dataHistory, setDataHistory] = useState([])


    useEffect(() => {
        setEmail(account.email)
        setRole(account.role)
        setUsername(account.username)
        
        if (account.image) {
            if(account.image.includes("data:image/png;base64,")) {
                setpreviewImageP(account.image);
            } else {
                setpreviewImageP(`data:image/png;base64,${account.image}`);
            }
        }
        fetchHistory()
        
    }, [])
    
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(previewImageP);
        };
    }, [previewImageP]);

    const fetchHistory =  async () => {
        
        let res = await getHistory()
        if(res && res.EC===0) {
            setDataHistory(res.DT.data)
        }
    }

    const handleUploadImageP = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setpreviewImageP(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            // setpreviewImageP(null);
        }
    };
    
    const [key, setKey] = useState('information');

    const handleClickBtnSave = async (key) => {
        if(key==='information') {
            let res = await updateProfile(username, image)
            let imageb64 = await toBase64(image)
            
            if(res && res.EC===0) {
                console.log(account);
                toast.success(res.EM)
                dispatch(doUpdateInfo({username, imageb64}))
                
            } else {
                toast.error(res.EM);
            }
        }
        else if (key === 'password') {
            let res = await changePassword(currentPassword, newPassword)
            if(res && res.EC===0) {
                toast.success(`Password of ${res.DT.email} is update success`)
                setCurrentPassword('')
                setNewPassword('')
                setRePassword('')
            } else {
                toast.error(res.EM)
            } 
        } else {
            return 
        }
    }
    
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                className="modal-create-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>User profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="b-profile">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="information" title="Information">
                            <form onSubmit={(e) => {e.preventDefault()}}>
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>                                  
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            disabled={true}
                                            className="form-control"
                                            value={email}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-12">
                                        <label className="form-label">Role</label>
    
                                        <select
                                            className="form-select"
                                            value={role}
                                            disabled={true}
                                        >
                                            <option value="USER">USER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        className="form-label upload-label"
                                        htmlFor="uploadImg333"
                                    >
                                        Image
                                    </label>
                                    <input 
                                        type="file" 
                                        hidden 
                                        id="uploadImg333" 
                                        onChange={(e) => handleUploadImageP(e)}
                                    />
                                </div>
                                {previewImageP ? (
                                    <div className="mb-3 img-preview">
                                        <img alt="" src={previewImageP} />
                                    </div>
                                ) : (
                                    <div className="mb-3 img-preview">
                                        <span>image</span>
                                    </div>
                                )}
                            </form>
                        </Tab>
                        <Tab eventKey="password" title="Change Password">
                            <form onSubmit={(e) => {e.preventDefault()}}>
                                <div className="mb-3 pass-group">
                                    <label className="form-label">Current Password</label>
                                    <input
                                        type={isShowPassword ? "text" : "password"}
                                        className="form-control"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
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
                                <div className="mb-3 pass-group">
                                    <label className="form-label">New Password</label>
                                    <input
                                        type={isShowPassword ? "text" : "password"}
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
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
                                <div className="mb-3 pass-group">
                                    <label className="form-label">Re-Password</label>
                                    <input
                                        type={isShowPassword ? "text" : "password"}
                                        className="form-control"
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
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
                            </form>
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">participant_id</th>
                                    <th scope="col">quiz_id</th>
                                    <th scope="col">total_questions</th>
                                    <th scope="col">total_correct</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataHistory.length >0 &&
                                        dataHistory.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.participant_id}</td>
                                                    <td>{item.quiz_id}</td>
                                                    <td>{item.total_questions}</td>
                                                    <td>{item.total_correct}</td>
                                                </tr>
                                            )
                                        })
                                    }                                  
                                </tbody>
                            </table>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    { key!== "history" 
                    ?
                    <Button variant="success" onClick={() => handleClickBtnSave(key)}>
                        Save
                    </Button>
                    :
                    <></>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Profile;
