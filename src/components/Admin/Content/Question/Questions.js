import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { TiPlus, TiMinus } from "react-icons/ti";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _, { iteratee } from "lodash";

function Questions() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
            ],
        },
    ]);

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "add") {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isCorrect: false,
                    },
                ],
            };

            setQuestions([...questions, newQuestion]);
        }

        if (type === "remove") {
            let questionsClone = _.cloneDeep(questions);

            questionsClone = questions.filter((item) => {
                return item.id !== id;
            });
            setQuestions(questionsClone);
        }
    };

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);

        if (type === "add") {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                isCorrect: false,
            };

            let index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            questionsClone[index].answers.push(newQuestion);
            setQuestions(questionsClone);
        }

        if (type === "remove") {
            let index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            questionsClone[index].answers = questionsClone[
                index
            ].answers.filter((item) => item.id !== answerId);

            setQuestions(questionsClone);
        }
    };
    const handleOnChange = (type, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === "question") {
            let index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    };

    const handleOnChangeFile = (questionId, e) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1 && e.target.files && e.target.files[0]) {
            questionsClone[index].imageFile = e.target.files[0];
            questionsClone[index].imageName = e.target.files[0].name;
            setQuestions(questionsClone);
        }
    };

    const handleAnswerQuestion = (type, anwerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(
                (answer) => {
                    if (answer.id === anwerId) {
                        if (type === "checkbox") {
                            answer.isCorrect = value;
                        }
                        if (type === "input") {
                            answer.description = value;
                        }
                    }
                    return answer;
                }
            );
            setQuestions(questionsClone);
        }
    };

    const handleSubmitQuestionForQuiz = () => {
        console.log(questions);
    };

    return (
        <div className="questions-container">
            <div className="title">Manage question</div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className="mt-3 mb-2">Add questions:</div>
                {questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div className="q-main mb-5" key={question.id}>
                                <div className="questions-content">
                                    <div class="form-floating description">
                                        <input
                                            type="type"
                                            class="form-control"
                                            placeholder="enter your question..."
                                            value={question.description}
                                            onChange={(e) =>
                                                handleOnChange(
                                                    "question",
                                                    question.id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <label>
                                            Questions {index + 1} description
                                        </label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={question.id}>
                                            <RiImageAddFill className="label-upload" />
                                        </label>
                                        <input
                                            id={question.id}
                                            type="file"
                                            hidden
                                            onChange={(e) =>
                                                handleOnChangeFile(
                                                    question.id,
                                                    e
                                                )
                                            }
                                        />
                                        {question.imageName ? (
                                            <span>{question.imageName}</span>
                                        ) : (
                                            <span>0 file is upload</span>
                                        )}
                                    </div>
                                    <div className="btn-add">
                                        <span
                                            onClick={() =>
                                                handleAddRemoveQuestion(
                                                    "add",
                                                    ""
                                                )
                                            }
                                        >
                                            <TiPlus className="icon-add" />
                                        </span>
                                        {questions.length > 1 && (
                                            <span
                                                onClick={() =>
                                                    handleAddRemoveQuestion(
                                                        "remove",
                                                        question.id
                                                    )
                                                }
                                            >
                                                <TiMinus className="icon-remove" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div
                                                className="answers-content"
                                                key={answer.id}
                                            >
                                                <input
                                                    className="form-check-input isCorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(e) =>
                                                        handleAnswerQuestion(
                                                            "checkbox",
                                                            answer.id,
                                                            question.id,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <div class="form-floating answer-name">
                                                    <input
                                                        value={
                                                            answer.description
                                                        }
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="enter your answer"
                                                        onChange={(e) =>
                                                            handleAnswerQuestion(
                                                                "input",
                                                                answer.id,
                                                                question.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <label>
                                                        Answer {index + 1}
                                                    </label>
                                                </div>
                                                <div className="btn-group">
                                                    <span
                                                        onClick={() =>
                                                            handleAddRemoveAnswer(
                                                                "add",
                                                                question.id
                                                            )
                                                        }
                                                    >
                                                        <AiFillPlusSquare className="icon-add" />
                                                    </span>
                                                    {question.answers.length >
                                                        1 && (
                                                        <span
                                                            onClick={() =>
                                                                handleAddRemoveAnswer(
                                                                    "remove",
                                                                    question.id,
                                                                    answer.id
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineMinusCircle className="icon-remove" />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}

                {questions.length > 0 && (
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className="btn btn-warning"
                        >
                            Save Questions
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Questions;
