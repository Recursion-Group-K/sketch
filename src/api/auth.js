import axios from "axios";

export default {
    login(username, password) {
        return axios.post('https://sketch-skgl-server-staging.herokuapp.com/api/token-auth/', { username, password });
    }
}