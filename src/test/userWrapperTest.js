import UserWrapper from '../api/userWrapper.js'

const user1 = await new UserWrapper().get(1);

console.log(user1);