import axios from 'axios';
import User from '../models/user.js';

export default class UserWrapper {
    url = 'https://jsonplaceholder.typicode.com';
    constructor() {}

    async getById(userId) {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const { id, name, email, username } = response.data;
            const param = {
                id: id,
                name: name,
                email: email,
                password: username,
            };
            return new User(param);
        } catch (error) {
            console.log(error);
        }
    }
}
