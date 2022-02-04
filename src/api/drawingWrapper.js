import client from './client';
import Drawing from '../models/drawing';
import endpoints from '../api/endpoints';

const { list, listFilter, retrieve, create, update, destroy } = endpoints.drawings;

class ParamsConverter {
    static toClientParams({ id, title, image, is_public, data, created_at, updated_at, user }) {
        const params = {
            id: id,
            title: title,
            image: image,
            isPublic: is_public,
            data: data,
            createdAt: new Date(created_at),
            updatedAt: new Date(updated_at),
            userId: user.id,
        };

        return params;
    }

    static toRequestParams({ id, title, image, isPublic, data, createdAt, updatedAt, user }) {
        //console.log({ id, title, image, isPublic, data, createdAt, updatedAt, user })
        const params = {
            id: id,
            title: title,
            image: image,
            is_public: isPublic,
            data: data,
            created_at: createdAt,
            updated_at: updatedAt,
            user_id: user.id,
        };
        return params;
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
            console.error(error);
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
            console.error(error);
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
            console.error(error);
        }
    }

    /**
     *
     * @returns {Drawing}
     */
    async create(params) {
        const requestParams = ParamsConverter.toRequestParams(params);
        try {
            console.log("start create");
            const response = await client.get(create(requestParams));
            console.log("end create");
            console.log(response)
            return new Drawing(ParamsConverter.toClientParams(response.data));
        } catch (error) {
            console.error(error);
        }
    }

    async update(params) {
        const requestParams = ParamsConverter.toRequestParams(params);
        try {
            const response = await client.get(update(requestParams.id), requestParams);
            return new Drawing(ParamsConverter.toClientParams(response.data));
        } catch (error) {
            console.error(error);
        }
    }

    async destroy(id) {
        try {
            const response = await client.get(destroy(id));
            return new Drawing(ParamsConverter.toClientParams(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}
