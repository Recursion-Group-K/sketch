export default class Drawing {
    constructor({ id, title, image, isPublic, data, createdAt, updatedAt, userId }) {
        this.id = id; // string
        this.title = title; //string
        this.image = image; // string
        this.isPublic = isPublic; // boolean
        this.data = data; // json
        this.createdAt = createdAt; // datetime
        this.updatedAt = updatedAt; // datetime
        this.userId = userId; // integer
    }
}
