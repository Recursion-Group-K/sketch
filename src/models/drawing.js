export default class Drawing {
    constructor(params) {
        this.id = params.id; // string
        this.title = params.title; //string
        this.imgUrl = params.imgUrl; // string
        this.isPublic = params.isPublic; // boolean
        this.data = params.data; // json
        this.created_at = params.created_at; // datetime
        this.updated_at = params.updated_at; // datetime
        this.userId = params.userId; // integer
    }
}
