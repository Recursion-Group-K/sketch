import axios from 'axios';
import User from '../models/user.js';

export default class UserWrapper {
    constructor() {
        this.url = 'https://jsonplaceholder.typicode.com';
    }

    async getById(id) {
        try {
            const response = await axios.get(`${this.url}/users/${id}`);
            const { id: userId, name, isActive: is_active } = response.data;
            const params = {
                id: userId,
                name: name,
                isActive: is_active
            };
            return new User(params);
        } catch (error) {
            console.log(error);
        }
    }
}
