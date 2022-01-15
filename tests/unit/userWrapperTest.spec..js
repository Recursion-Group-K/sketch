import UserWrapper from '../src/api/userWrapper.js'

describe('UserWrapper', () => {
  it('get Use by id:1', async() => {
    const user1 = await new UserWrapper().get(1);

    console.log(user1);
  })
})