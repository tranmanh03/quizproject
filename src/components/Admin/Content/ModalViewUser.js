import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

const ModelViewUser = ({ show, setShow, dataUser, setDataUser }) => {
    const handleClose = () => {
        setShow(false);
        setDataUser({});
    };

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState("USER");
    const [username, setUsername] = useState();
    const [previewImage, setPreviewImage] = useState();

    useEffect(() => {
        if (!_.isEmpty(dataUser)) {
            setEmail(dataUser.email);
            setPassword(dataUser.password);
            setUsername(dataUser.username);
            setRole(dataUser.role);
            if (dataUser.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUser.image}`);
            }
        }
    }, [dataUser]);

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
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                disabled={true}
                                className="form-control"
                                value={email}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                value={password}
                                disabled={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                value={username}
                            />
                        </div>
                        <div className="mb-3">
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
                        <div className="mb-3">
                            <label
                                className="form-label upload-label"
                                htmlFor="uploadImg"
                            >
                                Image
                            </label>
                            <input type="file" hidden id="uploadImg" />
                        </div>
                        {previewImage ? (
                            <div className="mb-3 img-preview">
                                <img alt="" src={previewImage} />
                            </div>
                        ) : (
                            <div className="mb-3 img-preview">
                                <span>image</span>
                            </div>
                        )}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModelViewUser;
