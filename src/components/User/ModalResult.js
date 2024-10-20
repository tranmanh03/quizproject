import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = ({ show, setShow, dataModalResult }) => {
    const handleClose = () => {
        setShow(false);
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
                    <Modal.Title>Result...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Total question: <b>{dataModalResult.countTotal}</b>
                    </div>
                    <div>
                        Total correct anser:
                        <b>{dataModalResult.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Show Answer
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalResult;
