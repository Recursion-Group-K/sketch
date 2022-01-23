export default class Drawing {
    constructor({ id, title, imgUrl, isPublic, data, createdAt, updatedAt, userId }) {
        this.id = id; // string
        this.title = title; //string
        this.imgUrl = imgUrl; // string
        this.isPublic = isPublic; // boolean
        this.data = data; // json
        this.createdAt = createdAt; // datetime
        this.updatedAt = updatedAt; // datetime
        this.userId = userId; // integer
    }
}
