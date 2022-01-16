import Drawing from '../models/drawing';

const axios = require('axios');

export default class DrawingWapper {
    url = 'http://localhost:3000/drawings';
    constructor() {}

    async getById(id) { // return Drawing
        try {
            const response = await axios.get(`${this.url}/${id}`);
            const params = {
                id: response.id,
                title: response.title,
                imgUrl: response.imgUrl,
                isPublic: response.isPublic,
                data: response.data,
                created_at: response.created_at,
                updated_at: response.updated_at,
                userId: response.userId,
            };
            return new Drawing(params);
        } catch (error) {
            console.error(error);
        }
    }

    /*getBy(column, data) { // return array<Drawing>
        try {
            
        }
    }

    getAll() { // return array<Drawing>

    }*/
}
