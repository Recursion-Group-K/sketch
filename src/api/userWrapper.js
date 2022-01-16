import axios from 'axios';
<<<<<<< HEAD
import User from '../models/user.js';
=======
// import User from '../models/user.js';
>>>>>>> 512bf31d415728e1a691f10305c4f5b915edb362

export default class UserWrapper {
    url = 'https://jsonplaceholder.typicode.com';
    constructor() {}

    async getById(id) {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            const params = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                password: response.data.username,
            };
<<<<<<< HEAD
            return new User(params);
=======
            return params;
            // return new User(params);
>>>>>>> 512bf31d415728e1a691f10305c4f5b915edb362
        } catch (error) {
            console.log(error);
        }
    }
}
