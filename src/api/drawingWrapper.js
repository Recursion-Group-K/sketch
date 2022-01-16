import Drawing from '../models/drawing';

const axios = require('axios');

export default class DrawingWapper {
    url = 'http://localhost:3000/drawings';
    constructor() {}

    async getById(id) { // return Drawing
        try {
            const response = await axios.get(`${this.url}/${id}`);
            const { id: drawingId, title, imgUrl, isPublic, data, created_at, updated_at, userId } = response;
            const params = {
                id: drawingId,
                title: title,
                imgUrl: imgUrl,
                isPublic: isPublic,
                data: data,
                created_at: created_at,
                updated_at: updated_at,
                userId: userId,
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
