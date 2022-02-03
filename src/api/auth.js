import axios from 'axios';
import endpoints from './endpoints';

class Auth {
    constructor() {}

    login(username, password) {
        return axios.post( endpoints.auth.token(), {
            username,
            password,
        });
    }
}

export default Auth;
