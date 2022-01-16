export default class Drawing {
    constructor({ id, title, imgUrl, isPublic, data, created_at, updated_at, userId }) {
        this.id = id; // string
        this.title = title; //string
        this.imgUrl = imgUrl; // string
        this.isPublic = isPublic; // boolean
        this.data = data; // json
        this.created_at = created_at; // datetime
        this.updated_at = updated_at; // datetime
        this.userId = userId; // integer
    }
}
