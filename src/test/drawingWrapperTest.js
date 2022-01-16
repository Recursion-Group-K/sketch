import DrawingWapper from '../api/drawingWrapper';

const drawing = await new DrawingWapper().getById(1);

console.log('Hello World!');
console.log(drawing);
