import DrawingWapper from "../api/drawingWrapper";

const drawing = await new DrawingWapper().getDrawingById(1);

console.log(drawing);