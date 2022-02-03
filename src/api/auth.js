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

    refreshToken(refreshToken) {
        return client.post(endpoints.auth.refresh(), {
            refresh: refreshToken,
        });
    }

    createAccount(username, email, password) {
        return client.post(endpoints.users.create(), {
            username,
            email,
            password
        });
    }
}

export default Auth;
