import { useState, useEffect } from "react";
import { getAllQuiz } from "../../../../services/apiServices";

function TableQuiz() {
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
    return (
        <>
            <div>List quiz:</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz.length > 0 &&
                        listQuiz.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button className="btn btn-warning">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default TableQuiz;
