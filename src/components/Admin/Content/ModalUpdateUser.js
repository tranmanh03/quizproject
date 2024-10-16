import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";

const ModelUpdateUser = ({
    show,
    setShow,
    fetchListUser,
    dataUpdate,
    setDataUpdate,
    setCurrentPage,
    currentPage,
    fetchListUserWithPaginate,
}) => {
    const handleClose = () => {
        setShow(false);
        setDataUpdate({});
    };

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState("USER");
    const [username, setUsername] = useState();
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(previewImage);
        };
    }, [previewImage]);

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            // setPreviewImage(null);
        }
    };

    const handleUpdateUser = async () => {
        let data = await putUpdateUser(dataUpdate.id, username, role, image);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // setCurrentPage(1);
            await fetchListUserWithPaginate(currentPage);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

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
                    <Modal.Title>Update a User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                disabled={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                disabled={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
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
                                <FcPlus />
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                hidden
                                id="uploadImg"
                                onChange={(e) => handleUploadImage(e)}
                            />
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
                    <Button
                        variant="primary"
                        onClick={() => handleUpdateUser()}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModelUpdateUser;
