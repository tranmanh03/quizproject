import { useState, useEffect } from "react";
import Select from "react-select";
import "./ManageQuiz.scss";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
];

function ModalAddQuiz() {

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [type, setType] = useState("easy");
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();

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

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error("Name || Description is required!");
            return;
        }
        let res = await postCreateNewQuiz(
            description,
            name,
            type?.value,
            image
        );
        if (res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setImage(null);
        }
        if (res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">
                                Add new Quiz:
                            </legend>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter quiz name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />
                                <label>Name</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                                <label>Description</label>
                            </div>
                            <Select
                                className="my-3"
                                value={type}
                                onChange={setType}
                                placeholder="Quiz type..."
                                options={options}
                            />
                            <div className="more-actions">
                                <label
                                    className="upload-label"
                                    htmlFor="uploadimg"
                                >
                                    Upload File Image
                                </label>

                                <input
                                    id="uploadimg"
                                    type="file"
                                    hidden
                                    onChange={(e) => handleUploadImage(e)}
                                />
                            </div>
                            {previewImage ? (
                                <div className="img-preview">
                                    <img alt="" src={previewImage} />
                                </div>
                            ) : (
                                <div className="img-preview">
                                    <span>image</span>
                                </div>
                            )}
                            <div className="mt-3">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => handleSubmitQuiz()}
                                >
                                    Save
                                </button>
                            </div>
                        </fieldset>
                    </div>
        </>
    )
}

export default ModalAddQuiz;