import Drawing from '../models/drawing';

const axios = require('axios');

function toParams(drawingData) {
    // object
    const {
        id: drawingId,
        title,
        imgUrl,
        isPublic,
        data,
        createdAt,
        updatedAt,
        userId,
    } = drawingData;
    const params = {
        id: drawingId,
        title: title,
        imgUrl: imgUrl,
        isPublic: isPublic,
        data: data,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        userId: userId,
    };

    return params;
}

export default class DrawingWapper {
    /* url = 'http://localhost:3000/drawings';
    constructor() {} */
    
    constructor(url) {
        this.url = url;
    }

    async getById(id) {
        // return Drawing
        try {
            const response = await axios.get(`${this.url}/${id}`);
            const params = toParams(response.data);
            return new Drawing(params);
        } catch (error) {
            console.error(error);
        }
    }

    async getBy(column, data) {
        // return array<Drawing>
        try {
            const response = await axios.get(`${this.url}?${column}=${data}`);
            const drawingsArray = response.data;
            let drawings = [];
            for (const drawing of drawingsArray) {
                const params = toParams(drawing);
                const newDrawing = new Drawing(params);
                drawings.push(newDrawing);
            }
            return drawings;
        } catch (error) {
            console.error(error);
        }
    }

    async getAll() {
        // return array<Drawing>
        try {
            const response = await axios.get(this.url);
            const drawingsArray = response.data;
            let drawings = [];
            for (const drawing of drawingsArray) {
                const params = toParams(drawing);
                const newDrawing = new Drawing(params);
                drawings.push(newDrawing);
            }
            return drawings;
        } catch (error) {
            console.error(error);
        }
    }
}
