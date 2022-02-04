import client from './client';
import Drawing from '../models/drawing';
import endpoints from '../api/endpoints';

const { list, listFilter, retrieve, create, update, destroy } = endpoints.drawings;

class ParamsConverter {
    static toClientParams({ id, title, image, is_public, data, created_at, updated_at, user_id }) {
        const params = {
            id: id,
            title: title,
            image: image,
            isPublic: is_public,
            data: data,
            createdAt: new Date(created_at),
            updatedAt: new Date(updated_at),
            userId: user_id,
        };

        return params;
    }

    static toFormDataParams({ title, image, isPublic, data, userId }) {
        const formData = new FormData();
        if (image) formData.append('image', image);
        if (title) formData.append('title', title);
        if (isPublic) formData.append('is_public', isPublic);
        if (data) formData.append('data', data);
        if (userId) formData.append('user_id', userId);
        return formData;
    }
}

export default class DrawingWapper {
    constructor() {}

    /**
     *
     * @param {integer} id
     * @returns {Drawing}
     */
    async getById(id) {
        try {
            const response = await client.get(retrieve(id));
            const params = ParamsConverter.toClientParams(response.data);
            return new Drawing(params);
        } catch (error) {
            return error.response;
        }
    }

    /**
     *
     * @param {string} column
     * @param {string} data
     * @returns {Array<Drawing>}
     */
    async getBy(column, data) {
        try {
            const response = await client.get(listFilter(column, data));
            const drawingsArray = response.data;
            let drawings = [];
            for (const drawing of drawingsArray) {
                const params = ParamsConverter.toClientParams(drawing);
                const newDrawing = new Drawing(params);
                drawings.push(newDrawing);
            }
            return drawings;
        } catch (error) {
            return error.response;
        }
    }

    /**
     *
     * @returns {Array<Drawing>}
     */
    async getAll() {
        try {
            const response = await client.get(list());
            const drawingsArray = response.data;
            let drawings = [];
            for (const drawing of drawingsArray) {
                const params = ParamsConverter.toClientParams(drawing);
                const newDrawing = new Drawing(params);
                drawings.push(newDrawing);
            }
            return drawings;
        } catch (error) {
            return error.response;
        }
    }

    /**
     *
     * @returns {Drawing}
     */
    async create(params) {
        const formData = ParamsConverter.toFormDataParams(params);
        try {
            const response = await client.post(create(), formData);
            return new Drawing(ParamsConverter.toClientParams(response.data));
        } catch (error) {
            return error.response;
        }
    }

    async update(id, params) {
        const formData = ParamsConverter.toFormDataParams(params);
        try {
            const response = await client.patch(update(id), formData);
            return new Drawing(ParamsConverter.toClientParams(response.data));
        } catch (error) {
            return error.response;
        }
    }

    async destroy(id) {
        try {
            const response = await client.delete(destroy(id));
            return response;
        } catch (error) {
            return error.response;
        }
    }
}
