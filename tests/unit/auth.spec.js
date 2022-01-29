// import { getToken } from "../../src/api/auth";
// import auth from "../../src/api/auth";
import auth from "../../src/store/auth"

/* test('get token', async () => {
    const token = await getToken('test2', 'test2');
    console.log(token);
})

test('get token', () => {
    auth.login('test2', 'test2').then(response => console.log(response.data.token));
}) */

describe('/src/store/auth.js', () => {
    test('dispatch login', () => {
        this.$store.dispatch('auth/login', {username: 'test2', password: 'test2'});
    })
})