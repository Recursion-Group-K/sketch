import client from './client';
import endpoints from './endpoints';

class Auth {
    constructor() {}

    login(username, password) {
        return client.post(endpoints.auth.token(), {
            username,
            password,
        });
    }

    refreshToken (refreshToken) {
        return client.post(endpoints.auth.refresh(), {
            refresh: refreshToken,
        })
    }
}

export default Auth;
