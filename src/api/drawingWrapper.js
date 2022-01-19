import Drawing from '../models/drawing';

const axios = require('axios');

export default class DrawingWapper {
    url = 'http://localhost:3000/drawings';
    constructor() {}

    async getById(id) { // return Drawing
        try {
            const response = await axios.get(`${this.url}/${id}`);
            const {
                id: drawingId,
                title,
                imgUrl,
                isPublic,
                data,
                createdAt,
                updatedAt,
                userId,
            } = response.data;
            const params = {
                id: drawingId,
                title: title,
                imgUrl: imgUrl,
                isPublic: isPublic,
                data: data,
                createdAt: createdAt,
                updatedAt: updatedAt,
                userId: userId,
            };
            return new Drawing(params);
        } catch (error) {
            console.error(error);
        }
    }

    async getBy(column, data) { // return array<Drawing>
        try {
            const response = await axios.get(`${this.url}?${column}=${data}`)
            const drawingsArray = response.data
            let drawings = [];
            for (const drawing of drawingsArray) {
                const {
                    id: drawingId,
                    title,
                    imgUrl,
                    isPublic,
                    data,
                    createdAt,
                    updatedAt,
                    userId,
                } = drawing;
                const params = {
                    id: drawingId,
                    title: title,
                    imgUrl: imgUrl,
                    isPublic: isPublic,
                    data: data,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    userId: userId,
                };
                const newDrawing = new Drawing(params);
                drawings.push(newDrawing);
            }
            return drawings;
        } catch (error) {
            console.error(error);
        }
    }

    async getAll() { // return array<Drawing>
        try {
            const response = await axios.get(this.url);
            const drawingsArray = response.data
            let drawings = [];
            for (const drawing of drawingsArray) {
                const {
                    id: drawingId,
                    title,
                    imgUrl,
                    isPublic,
                    data,
                    createdAt,
                    updatedAt,
                    userId,
                } = drawing;
                const params = {
                    id: drawingId,
                    title: title,
                    imgUrl: imgUrl,
                    isPublic: isPublic,
                    data: data,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    userId: userId,
                };
                const newDrawing = new Drawing(params);
                drawings.push(newDrawing);
            }
            return drawings;
        } catch (error) {
            console.error(error);
        }
    }
}
