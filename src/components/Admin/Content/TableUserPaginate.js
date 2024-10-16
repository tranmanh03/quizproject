import ReactPaginate from "react-paginate";

const TableUserPaginate = ({
    listUser,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
    fetchListUserWithPaginate,
    pageCount,
    currentPage,
    setCurrentPage,
}) => {
    const handlePageClick = (event) => {
        fetchListUserWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };
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
            <div className="d-flex justify-content-center mt-4">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
};

export default TableUserPaginate;
