import axios from "../ultis/axiosConfig";

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    return axios.post("api/v1/participant", data);
};

const getAllUsers = () => axios.get("api/v1/participant/all");
const getUserWithPagiante = (page, limit) =>
    axios.get(`api/v1/participant?page=${page}&limit=${limit}`);

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    return axios.put("api/v1/participant", data);
};

const deleteUser = (userId) =>
    axios.delete("api/v1/participant", { data: { id: userId } });

const postLogin = (email, password) =>
    axios.post("api/v1/login", { email, password, delay: 3000 });

const postRegister = (email, password, username) => {
    return axios.post("api/v1/register", { email, password, username });
};

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPagiante,
    postLogin,
    postRegister,
};
