import axios from "axios";

export const getToken = async (username, password) => {
    try {
        const response = await axios.post('https://sketch-skgl-server-test.herokuapp.com/auth/', { username: username, password: password });
        return response.data.token;
    } catch (error) {
        console.error(error);
    }
}