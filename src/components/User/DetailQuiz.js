import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import SibarPanel from './Content/SidebarPanel'

function DetailQuiz() {
    const location = useLocation();
    const params = useParams();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (id), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDesc,
                        image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDesc = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });
                    return { questionID: key, answers, questionDesc, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    };

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    };

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(
            (item) => +item.questionID === +questionId
        );
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        }
        let index = dataQuizClone.findIndex(
            (item) => +item.questionID === +questionId
        );
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleFinish = async () => {
        console.log("data before submit: ", dataQuiz);
        let payload = {
            quizId: +quizId,
            answers: [],
        };
        let answers = [];
        if (dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = +question.questionID;
                let userAnswerId = [];

                question.answers.forEach((item) => {
                    if (item.isSelected) {
                        userAnswerId.push(item.id);
                    }
                });

                answers.push({
                    questionId,
                    userAnswerId,
                });
            });
        }
        payload.answers = answers;
        //submit answer
        let res = await postSubmitQuiz(payload);
        console.log("check respone", res);
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData,
            });
            setIsShowModalResult(true);
        } else {
        }
    };
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId} : {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-content">
                    <Question
                        handleCheckboxP={handleCheckbox}
                        index={index}
                        data={dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>
                <div className="footer">
                    <button
                        className="btn btn-primary"
                        onClick={() => handlePrev()}
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => handleNext()}
                    >
                        Next
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={() => handleFinish()}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-content">
                <SibarPanel dataQuiz={dataQuiz} handleFinish={handleFinish} setIndex={setIndex}/>
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );
}

export default DetailQuiz;
