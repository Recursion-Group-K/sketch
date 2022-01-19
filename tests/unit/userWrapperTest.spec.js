import UserWrapper from '../../src/api/userWrapper.js';

describe('UserWrapper', () => {
    it('get User by id:1', async () => {
        const user1 = await new UserWrapper().getById(1);

        console.log(user1);
    });
});
