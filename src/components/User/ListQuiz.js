import { useState, useEffect } from "react";
import { getQuizUser } from "../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

function ListQuiz() {
    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        let res = await getQuizUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    };
    return (
        <>
            <div className="list-quiz-container container">
                {arrQuiz.length > 0 &&
                    arrQuiz.map((quiz, index) => {
                        return (
                            <div
                                key={index}
                                className="card"
                                style={{ width: "18rem" }}
                            >
                                <img
                                    src={`data:image/jpeg;base64,${quiz.image}`}
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Quiz {index + 1}
                                    </h5>
                                    <p className="card-text">
                                        {quiz.description}
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate(`/quiz/${quiz.id}`, {
                                                state: {
                                                    quizTitle: quiz.description,
                                                },
                                            })
                                        }
                                    >
                                        Start Now
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                {arrQuiz.length === 0 && (
                    <div>
                        <h3>You don't have quiz now...</h3>
                    </div>
                )}
            </div>
        </>
    );
}

export default ListQuiz;
