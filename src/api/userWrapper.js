import client from './client.js';
import User from '../models/user.js';

require('dotenv').config();

export default class UserWrapper {
    constructor() {
        this.url = process.env.SERVER_URL + 'api/users/';
    }

    async getById(id) {
        try {
            const response = await client.get(`${this.url}${id}/`, {
                auth: {
                    username: process.env.SUPERUSER_NAME,
                    password: process.env.SUPERUSER_PASSWORD,
                },
            });
            const { id: userId, username, is_active } = response.data;
            const params = {
                id: userId,
                name: username,
                isActive: is_active,
            };
            return new User(params);
        } catch (error) {
            console.log(error);
        }
    }
}
