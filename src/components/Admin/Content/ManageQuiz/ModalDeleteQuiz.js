import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiServices";

const ModalDeleteQuiz = ({
    show,
    setShow,
    dataQuizDelete,
    fetchAllQuiz
}) => {
    const handleClose = () => setShow(false);
    const handleDeleteQuiz = async () => {
        let data = await deleteQuiz(dataQuizDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            fetchAllQuiz()
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
                    Are you sure delete this quiz width id = {dataQuizDelete.id}, name : {dataQuizDelete.name}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDeleteQuiz()}>
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

export default ModalDeleteQuiz;
