import DrawingWapper from "../../src/api/drawingWrapper";
// import Drawing from "..src/models/drawing"

describe('DrawingWrapperクラスのテスト', () => {
    test('get drawing by id: 1', async () => {  
        const drawing1 = await new DrawingWapper().getById(1);
        console.log(drawing1);
        /* const params1 = {
            id: 1,
            title: "flower garden",
            imgUrl: "https://image.rakuten.co.jp/asiantique/cabinet/03189910/img63361868.jpg",
            isPublic: true,
            data: {},
            createdAt: "2022/1/1/13:30",
            updatedAt: "2022/1/3/15:45",
            userId: 1,
        }
        const drawingTest1 = new Drawing(params1)
        expect(drawing1).toEqual(drawingTest1) */
    })
})