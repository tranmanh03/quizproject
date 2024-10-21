import { useState, useEffect } from "react";
import Select from "react-select";
import { getAllQuiz, getAllUsers, postAssignQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

function AssignQuiz() {
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchAllQuiz();
        fetchAllUser();
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

    const fetchAllUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newUser);
        }
    };

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        
        if(res.EC ===0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
        
    }

    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
            </div>

            <div className="col-6 form-group">
                    <label className="mb-2">Select User:</label>
                    <Select
                        value={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                    />
            </div>

            <div>
                <button 
                    className="btn btn-warning mt-3"
                    onClick={() => handleAssign()}
                >
                    Assign
                </button>
            </div>
        </div>
    );
}

export default AssignQuiz;