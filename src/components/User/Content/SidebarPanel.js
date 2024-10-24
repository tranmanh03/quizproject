import CountDown from "./CountDown";
import { useRef } from "react";

function SidebarPanel({dataQuiz, handleFinish, setIndex}) {
    const divRef = useRef([])
    const onTimeUp = () => {
        handleFinish()
    }
    const getClassQuestion = (question) => {
        if(question && question.answers.length > 0) {
            let isAnswered = question.answers.some(a => a.isSelected === true)
            
            if(isAnswered) {
                return "question selected"
            }
        }
        return "question"
    }

    // console.log(dataQuiz);
    const handleClickIndexQuestion = (question, index) => {
        setIndex(index)

        if(divRef.current) {
            divRef.current.forEach(item => {
                if(item && item.className==="question clicked") {
                    item.className = "question"
                }
            })

            if(question && question.answers.length > 0) {
                let isAnswered = question.answers.some(a => a.isSelected === true)
                if(isAnswered) {
                    return
                }
            }

        }
        divRef.current[index].className = "question clicked"
    }
    
    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp}/>
            </div>
            <div className="main-question">
                {dataQuiz.length > 0 && 
                dataQuiz.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className={getClassQuestion(item)}
                            onClick={() => handleClickIndexQuestion(item, index)}
                            ref ={el => divRef.current[index] = el}
                        >{index+1}</div>
                    )
                })
                }
            </div>
        </>
    );
}

export default SidebarPanel;