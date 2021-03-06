import client from './client';
import User from '../models/user.js';
import endpoints from '../api/endpoints';
const FormData = require('form-data');

const superUserAuth = {
    username: process.env.VUE_APP_SUPERUSER_NAME,
    password: process.env.VUE_APP_SUPERUSER_PASSWORD,
};

const { current, retrieve, create } = endpoints.users;

const toParams = ({ id, username, is_active }) => {
    const params = {
        id: id,
        name: username,
        isActive: is_active,
    };

    return params;
};

export default class UserWrapper {
    constructor() {}

    /* GET current user */
    async getCurrent() {
        try {
            const response = await client.get(current());
            return new User(toParams(response.data));
        } catch (error) {
            new Error(error);
        }
    }

    /* GET user */
    async getById(id) {
        try {
            const response = await client.get(
                retrieve(id),
                {},
                {
                    auth: superUserAuth,
                }
            );
            const params = toParams(response.data);
            return new User(params);
        } catch (error) {
            throw new Error(error);
        }
    }

    async create({ name, email = '', password, isActive = true }) {
        const data = new FormData();
        data.append('username', name);
        data.append('email', email);
        data.append('password', password);
        data.append('is_active', isActive);

        try {
            const response = await client.post(create(), data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                auth: superUserAuth,
            });
            return new User(toParams(response.data));
        } catch (error) {
            return error.response;
        }
    }
}
