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

    test('getBy(user, 1)', async () => {
        const drawings1 = await new DrawingWapper().getBy('user', 1);
        for (const drawing in drawings1) {
            expect(drawing.id).toEqual(1);
        }
    });

    test('getBy(mode, 1)', async () => {
        const drawings1 = await new DrawingWapper().getBy('user', 1);
        for (const drawing in drawings1) {
            expect(drawing.id).toEqual(1);
        }
    });
});
