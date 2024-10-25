import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import { updateQuiz } from "../../../../services/apiServices"; 
import { toast } from "react-toastify";
import _ from "lodash";

const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
];

const ModalUpdateQuiz = ({
    show,
    setShow,
    dataQuizUpdate,
    setDataQuizUpdate,
    fetchAllQuiz
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [updateQuizPreviewImage, setUpdateQuizPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false);
        setDataQuizUpdate({});
    };

    useEffect(() => {
        if (!_.isEmpty(dataQuizUpdate)) {
            setName(dataQuizUpdate.name);
            setDescription(dataQuizUpdate.description);
            setType(dataQuizUpdate.difficulty);

            if (dataQuizUpdate.image) {
                setUpdateQuizPreviewImage(`data:image/jpeg;base64,${dataQuizUpdate.image}`);
            } else {
                setUpdateQuizPreviewImage(""); // Reset if no image
            }
        }
    }, [dataQuizUpdate]);

    useEffect(() => {
        return () => {
            if (updateQuizPreviewImage) {
                URL.revokeObjectURL(updateQuizPreviewImage);
            }
        };
    }, [updateQuizPreviewImage]);

    const handleUploadImageU = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUpdateQuizPreviewImage(URL.createObjectURL(file));
            setImage(file);
        } else {
            setUpdateQuizPreviewImage("");
            setImage(null);
        }
    };

    const handleUpdateQuiz = async () => {
        const data = await updateQuiz(dataQuizUpdate.id, description, name, type, image);
        console.log("Updating quiz with data:", {
            id: dataQuizUpdate.id,
            description,
            name,
            type,
            image
        });
        
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            fetchAllQuiz();
        } else {
            toast.error(data.EM);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            backdrop="static"
            className="modal-create-user"
        >
            <Modal.Header closeButton>
                <Modal.Title>Update a Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter quiz name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label>Description</label>
                    </div>
                    <Select
                        className="my-3"
                        value={options.find((option) => option.value === type)}
                        onChange={(selectedOption) => setType(selectedOption.value)}
                        placeholder="Quiz type..."
                        options={options}
                    />
                    <div className="more-actions">
                        <label className="upload-label" htmlFor="uploadimg1">
                            Upload File Image
                        </label>
                        <input
                            id="uploadimg1"
                            type="file"
                            hidden
                            onChange={(e) => handleUploadImageU(e)}
                        />
                    </div>
                    {updateQuizPreviewImage ? (
                        <div className="img-preview">
                            <img alt="" src={updateQuizPreviewImage} />
                        </div>
                    ) : (
                        <div className="img-preview">
                            <span>No image uploaded</span>
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
                    onClick={handleUpdateQuiz}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateQuiz;
