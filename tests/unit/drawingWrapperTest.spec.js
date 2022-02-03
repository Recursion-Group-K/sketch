import DrawingWapper from '../../src/api/drawingWrapper';

describe('DrawingWrapperクラスのテスト', () => {
    test('getById', async () => {
        const drawing1 = await new DrawingWapper().getById(1);
        expect(drawing1.id).toEqual(1);
    });

    test('getAll()', async () => {
        const allDrawings = await new DrawingWapper().getAll();
        expect(allDrawings).not.toBeNull();
        expect(allDrawings).not.toBeUndefined();
    });

    test('getBy(column, data)', async () => {
        const drawing3 = await new DrawingWapper().getBy('id', 3);
        expect(drawing3[0].id).toEqual(3);

        const drawingSheep = await new DrawingWapper().getBy('title', 'sheep');
        expect(drawingSheep[0].title).toEqual('sheep');

        const drawingPublic = await new DrawingWapper().getBy('isPublic', true);
        expect(drawingPublic[0].isPublic).toEqual(true);

        const drawingUser2 = await new DrawingWapper().getBy('userId', 2);
        expect(drawingUser2[0].userId).toEqual(2);
    });
});
