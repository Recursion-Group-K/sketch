import DrawingWapper from "../../src/api/drawingWrapper";

describe('DrawingWrapperクラスのテスト', () => {
    test('getById', async () => {  
        const drawing1 = await new DrawingWapper().getById(1);
        console.log(drawing1);
    })

    test('getAll()', async () => {
        const allDrawings = await new DrawingWapper().getAll();
        console.log(allDrawings);
    })

    test('getBy(column, data)', async () => {
        const drawing3 = await new DrawingWapper().getBy('id', 3);
        console.log(drawing3);

        const drawingSheep = await new DrawingWapper().getBy('title', 'sheep');
        console.log(drawingSheep);

        const drawingPublic = await new DrawingWapper().getBy('isPublic', true);
        console.log(drawingPublic);

        const drawingUser2 = await new DrawingWapper().getBy('userId', 2);
        console.log(drawingUser2);
    })
})