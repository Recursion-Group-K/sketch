import axios from 'axios';
import User from '../models/user.js';

require('dotenv').config();

export default class UserWrapper {
    constructor() {
        this.url = 'https://sketch-skgl-server-test.herokuapp.com/api';
    }

    async getById(id) {
        try {
            const response = await axios.get(`${this.url}/users/${id}/`, {
                auth: {
                    username: process.env.SUPERUSER_NAME,
                    password: process.env.SUPERUSER_PASSWORD
                }
            });
            const { id: userId, username, is_active } = response.data;
            const params = {
                id: userId,
                name: username,
                isActive: is_active
            };
            return new User(params);
        } catch (error) {
            console.log(error);
        }
    }
}
