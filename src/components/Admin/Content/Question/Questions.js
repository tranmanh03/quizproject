import { useState, useEffect } from "react";
import Select from "react-select";
import "./Questions.scss";
import { TiPlus, TiMinus } from "react-icons/ti";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { getAllQuiz, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from "../../../../services/apiServices";
import { toast } from "react-toastify";

function Questions() {
    const initQuestions = [
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
    ]
    const [questions, setQuestions] = useState(initQuestions);

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({});

    useEffect(() => {
        fetchAllQuiz();
    }, []);

    const fetchAllQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz);
        }
    };
    

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })

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
    
    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if(index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        // validate
        if(_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!')
            return;
        }

        //question validtate
        let isVallidQuestion = true
        let indexQuestion = 0
        
        for(let i=0; i< questions.length; i++) {
            if(!questions[i].description) {
                isVallidQuestion=false
                indexQuestion=i
                break
            }
        }

        if(isVallidQuestion===false) {
            toast.error(`Not empty description for Question ${indexQuestion+1}`)
            return
        }

        //answer validtate
        let isVallidAnswer = true
        let indexQ, indexA = 0
        
        for(let i=0; i< questions.length; i++) {
            for(let j = 0; j < questions[i].answers.length ; j++) {
                if(!questions[i].answers[j].description) {
                    isVallidAnswer=false
                    indexA=j
                    break
                }
            }
            indexQ=i
            if(isVallidAnswer===false) break
        }

        if(isVallidAnswer===false) {
            toast.error(`Not empty Answer ${indexA+1} at Question ${indexQ+1}`)
            return
        }
        
         //submit question
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value, 
                question.description, 
                question.imageFile);

            //submit answer
            for(const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description, answer.isCorrect, q.DT.id
                ) 
            }
        }

        toast.success("Create Question and Answer succed!")
        setQuestions(initQuestions)
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
                        options={listQuiz}
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
                                        <span>
                                            {question.imageName 
                                            ? <span onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span> 
                                            : "0 file is upload"}
                                        </span>
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

                {isPreviewImage && 
                    <Lightbox 
                        image={dataImagePreview.url} 
                        onClose={() => setIsPreviewImage(false)} 
                        title={dataImagePreview.title}
                    >
                    </Lightbox>
                }
            </div>
            
        </div>
    );
}

export default Questions;
