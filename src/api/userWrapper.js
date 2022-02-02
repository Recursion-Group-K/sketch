import axios from 'axios';
import User from '../models/user.js';
import endpoints from '../api/endpoints'
require('dotenv').config();

const superUserAuth = {
    username: process.env.SUPERUSER_NAME,
    password: process.env.SUPERUSER_PASSWORD,
}

const {
    current,
    retrieve,
    update,
} = endpoints;

export default class UserWrapper {

    constructor () { }

    getParams (data) {
        const { id, username, is_active } = data;
        const params = {
            id: id,
            name: username,
            isActive: is_active,
        };

        return params
    }
    
    /* GET current user */
    async getCurrent (access_token) {
        try {
            const response = await axios.get(current(), {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            
            return new User(this.getParams(response.data));
        } catch (error) {
            new Error(error)
        }
    }

    /* GET user */
    async getById(id) {
        try {
            const response = await axios.get(retrieve(id), {
                auth: superUserAuth
            });
            return new User(this.getParams(response.data));
        } catch (error) {
            new Error(error)
        }
    }

    async create ({ name, email, password }) {
        const formData = new FormData()
        formData.append('username', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('is_active', true)

        try {
            const response = await axios.post(retrieve(id),formData,{
                auth: superUserAuth
            });
            return new User(this.getParams(response.data));
        } catch (error) {
            new Error(error)
        }
    }

}
