import axios from 'axios';

class Auth {
    constructor () { }
    
    login(username, password) {
        return axios.post('https://sketch-skgl-server-staging.herokuapp.com/api/token-auth/', {
            username,
            password,
        });
    }

}

export default Auth