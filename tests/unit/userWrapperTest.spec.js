import UserWrapper from '../../src/api/userWrapper.js';

describe('UserWrapper', () => {
    it('get User by id:1', async () => {
        const user1 = await new UserWrapper().getById(1);

        console.log(user1);
    });

    it('get User by id:2', async () => {
        const user2 = await new UserWrapper().getById(2);

        console.log(user2);
    });

    it('get User by id:3', async () => {
        const user3 = await new UserWrapper().getById(3);

        console.log(user3);
    });
});
