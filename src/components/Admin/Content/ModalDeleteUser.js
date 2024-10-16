import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteUser = ({
    show,
    setShow,
    dataUDelete,
    fetchListUser,
    fetchListUserWithPaginate,
    setCurrentPage,
}) => {
    const handleClose = () => setShow(false);
    const handleDeleteUser = async () => {
        let data = await deleteUser(dataUDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fetchListUser();
            setCurrentPage(1);
            await fetchListUserWithPaginate(1);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this user. email :{" "}
                    <b>{dataUDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDeleteUser()}>
                        Confirm
                    </Button>
                    <Button variant="sencondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteUser;
