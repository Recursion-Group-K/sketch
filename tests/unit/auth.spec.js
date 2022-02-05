import auth from '../../src/api/auth';

test('get token', async () => {
    const response = await auth.login('postman4', 'postman4');
    console.log(response.data);
});
