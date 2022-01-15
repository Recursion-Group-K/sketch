import axios from 'axios';
import User from '../models/user.js';

export default class UserWrapper {
    url = 'https://jsonplaceholder.typicode.com';
    constructor() {}

    async get(id) {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            const params = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                password: response.data.username,
            };
            return new User(params);
        } catch (error) {
            console.log(error);
        }
    }
}
