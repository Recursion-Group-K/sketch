import client from './client';
import User from '../models/user.js';
import endpoints from '../api/endpoints';
const FormData = require('form-data');


console.log(FormData)

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
}
    
export default class UserWrapper {

    constructor() {}

    /* GET current user */
    async getCurrent(access_token) {
        try {
            const response = await client.get(current(), {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

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
            console.log(params);
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

        // const data = {
        //     username: name,
        //     email: email,
        //     password: password,
        //     is_active: isActive,
        // }

        try {
            const response = await client.post(create(), data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                auth: superUserAuth,
            });
            return new User(toParams(response.data));
        } catch (error) {
            new Error(error);
        }
    }
}
