import { getToken } from "../../src/api/getToken";

test('get token', async () => {
    const token = await getToken('test2', 'test2');
    console.log(token);
})