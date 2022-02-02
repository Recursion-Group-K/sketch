const root = process.env.SERVER_URL;
const endpoints = {
    auth: {
        token: () => `${root}/api/token-auth/`,
        refresh: () => `${root}/api/token-auth/refresh`,
    },
    users: {
        current: () => `${root}/api/current_user`,
        list: () => `${root}/api/users/`,
        create: () => `${root}/api/users/`,
        retrieve: (id) => `${root}/api/users/${id}/`,
        update: (id) => `${root}/api/users/${id}/`,
    },
    drawings: {
        list: () => `${root}/api/drawings/`,
        create: () => `${root}/api/drawings/`,
        retrieve: (id) => `${root}/api/drawings/${id}/`,
        update: (id) => `${root}/api/drawings/${id}/`,
        destroy: (id) => `${root}/api/drawings/${id}/`,
    },
};

export default endpoints;
