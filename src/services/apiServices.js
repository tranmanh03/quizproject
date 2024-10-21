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

const getQuizUser = () => axios.get("api/v1/quiz-by-participant");
const getDataQuiz = (id) => axios.get(`api/v1/questions-by-quiz?quizId=${id}`);

const postSubmitQuiz = (data) => axios.post("api/v1/quiz-submit", { ...data });

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);

    return axios.post("api/v1/quiz", data);
};

const getAllQuiz = () => axios.get("api/v1/quiz/all");

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append("quiz_id", quiz_id);
    data.append("description", description);
    data.append("questionImage", questionImage);

    return axios.post("api/v1/question", data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post("api/v1/answer", {
        description, correct_answer, question_id}
    );
}

const logout = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    });
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}

const getQuizQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', {...data})
}

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPagiante,
    postLogin,
    postRegister,
    getQuizUser,
    postSubmitQuiz,
    getDataQuiz,
    postCreateNewQuiz,
    getAllQuiz,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    logout,
    postAssignQuiz,
    getQuizQA,
    postUpsertQA
};
