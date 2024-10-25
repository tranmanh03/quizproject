import { useState, useEffect } from "react";
import Select from "react-select";
import "./ManageQuiz.scss";
import TableQuiz from "./TableQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { getAllQuiz } from "../../../../services/apiServices";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalAddQuiz from "./ModalAddQuiz";


function ManageQuiz() {

    const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false)
    const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false)
    const [dataQuizDelete, setDataQuizDelete] = useState({})
    const [dataQuizUpdate, setDataQuizUpdate] = useState({})

    const [key, setKey] = useState('managequiz');

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchAllQuiz();
    }, []);

    const fetchAllQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };


    const handleCliclBtnUpdate = (item) => {
        setDataQuizUpdate(item)
        setIsShowModalUpdateQuiz(true)
    }

    return (
        <div className="quiz-container">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                justify
            >
                <Tab eventKey="managequiz" title="ManageQuiz">
                    <ModalAddQuiz />
                    <div className="list-detail">
                        <TableQuiz 
                            setShow={setIsShowModalDeleteQuiz} 
                            handleCliclBtnUpdate={handleCliclBtnUpdate}
                            setDataQuizDelete={setDataQuizDelete}
                            listQuiz={listQuiz}
                        />
                    </div>
                </Tab>
                <Tab eventKey="updateAQ" title="Update Q/A Quizzes">
                    <QuizQA />
                </Tab>
                <Tab eventKey="assigntouser" title="Assign to Users">
                    <AssignQuiz />
                </Tab>
            </Tabs>
            <ModalDeleteQuiz 
                show={isShowModalDeleteQuiz} 
                setShow={setIsShowModalDeleteQuiz}  
                dataQuizDelete={dataQuizDelete}
                fetchAllQuiz={fetchAllQuiz}
            />
            <ModalUpdateQuiz 
                show={isShowModalUpdateQuiz} 
                setShow={setIsShowModalUpdateQuiz}
                dataQuizUpdate={dataQuizUpdate}  
                fetchAllQuiz={fetchAllQuiz}
                setDataQuizUpdate={setDataQuizUpdate}
            />
        </div>
    );
}

export default ManageQuiz;
