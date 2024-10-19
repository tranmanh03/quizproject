import _ from "lodash";

function Question({ data, index, handleCheckboxP }) {
    if (_.isEmpty(data)) {
        return <></>;
    }

    const handleCheckbox = (e, aID, qID) => {
        handleCheckboxP(aID, qID);
    };
    return (
        <>
            {data.image ? (
                <div className="q-img">
                    <img src={`data:image/jpeg;base64,${data.image}`} alt="" />
                </div>
            ) : (
                <div className="q-img"></div>
            )}
            <div className="question">
                Question {index + 1}: {data.questionDesc}?
            </div>
            <div className="answer">
                {data.answers.length > 0 &&
                    data.answers.map((a, index) => (
                        <div key={index} className="answer-child">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={a.isSelected}
                                onChange={(e) =>
                                    handleCheckbox(e, a.id, data.questionID)
                                }
                            />
                            <label className="form-check-label">
                                {a.description}
                            </label>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Question;
