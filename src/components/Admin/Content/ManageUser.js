import ModelCreateUser from "./ModelCreateUser";
// import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import ModelUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import "./MU.scss";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import {
    getUserWithPagiante,
    getAllUsers,
} from "../../../services/apiServices";

function ManageUser() {
    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setModalCreateUser] = useState(false);
    const [showModalViewUser, setModalViewUser] = useState(false);
    const [showModalUpdateUser, setModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataUDelete, setDataUDelete] = useState({});

    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1);
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    };

    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPagiante(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setDataUpdate(user);
        setModalUpdateUser(true);
    };

    const handleClickBtnView = (user) => {
        setDataUpdate(user);
        setModalViewUser(true);
    };

    const handleClickBtnDelete = (user) => {
        setDataUDelete(user);
        setModalDeleteUser(true);
    };

    return (
        <div className="manage-user-container" style={{ padding: "15px" }}>
            <div
                className="title"
                style={{ fontSize: "20px", fontWeight: "500" }}
            >
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new" style={{ margin: "15px 0" }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => setModalCreateUser(true)}
                    >
                        Add new User
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalViewUser
                    show={showModalViewUser}
                    dataUser={dataUpdate}
                    setDataUser={setDataUpdate}
                    setShow={setModalViewUser}
                />
                <ModelCreateUser
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    show={showModalCreateUser}
                    setShow={setModalCreateUser}
                    fetchListUser={fetchListUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModelUpdateUser
                    show={showModalUpdateUser}
                    setShow={setModalUpdateUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    fetchListUser={fetchListUser}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    dataUDelete={dataUDelete}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    fetchListUser={fetchListUser}
                    show={showModalDeleteUser}
                    setShow={setModalDeleteUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;
