import UserWrapper from '../../src/api/userWrapper.js';

describe('UserWrapper', () => {
    it('GET admin User by id:1', async () => {
        const user1 = await new UserWrapper().getById(1);
        expect(user1).not.toBeNull();
        expect(user1).not.toBeUndefined();
        expect(user1.id).toEqual(1);
    });

    /**
     * jestでformdataはうまく送らないらしい。
     * ボタンをおいて実際にブラウザでテストしたらうまく行ったけど、
     * こっちのコードではうまくいかないので一旦コメントアウト
     */
    // it('POST user', async () => {
    //     const numStr = process.env.VUE_APP_TEST_USER_NUMBER;
    //     process.env.VUE_APP_TEST_USER_NUMBER = String(parseInt(numStr) + 1);

    //     const userPrams = {
    //         name: `test${numStr}`,
    //         email: `test${numStr}@gmail.com`,
    //         password: `test${numStr}`,
    //     };

    //     const user = await new UserWrapper().create(userPrams);

    //     expect(user).not.toBeNull();
    //     expect(user).not.toBeUndefined();
    //     expect(user.name).toEqual(userPrams.name);
    //     expect(user.email).toEqual(userPrams.email);
    //     expect(user.isActive).toEqual(true);
    //     expect(user.id).not.toBeNull();
    //     expect(user.id).not.toBeUndefined();
    // });
});
