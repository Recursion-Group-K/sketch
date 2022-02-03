import auth from '../../src/api/auth';

test('get token', async () => {
    const response = await auth.login('admin', '0maR3zSs');
    console.log(response.data);
});
