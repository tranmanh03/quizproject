function TableUser({
    listUser,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
}) {
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser.length > 0 ? (
                        listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                handleClickBtnView(item)
                                            }
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() =>
                                                handleClickBtnUpdate(item)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleClickBtnDelete(item)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={4}>User not found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TableUser;
