import axios from 'axios';
import auth from './auth';

const BASER_URL = 'http://api.thought.dev/v1/';

const client = axios.create({

    baseURL: BASER_URL

});

client.interceptors.request.use(function (config) {

    config.headers.Authorization = 'Bearer ' + auth.token();

    return config;

});

client.interceptors.response.use(function (response) {

    let authorization = response.headers.authorization;

    if (authorization) {

        auth.token(authorization.split(' ')[1])

    }

    return response;

}, function (error) {

    if (error.response && error.response.status === 401) {

        auth.logout();
        alert('Your session has expired. Please login again.');

    }

    return Promise.reject(error);

});

const api = {

    popularUlr: BASER_URL + 'thoughts/popular',
    latestUlr: BASER_URL + 'thoughts/latest',
    feedUlr: BASER_URL + 'feed',
    userThoughtsUrl: BASER_URL + 'thoughts/user/',
    userLikesUrl: BASER_URL + 'likes/user/',

    get(url) {

        return new Promise(function (accept, reject) {

            client.get(url).then(function (response) {

                accept(response.data);

            }).catch(function (error) {

                reject(error);

            });

        });

    },

    login(service, socialToken) {

        return new Promise(function (accept, reject) {

            client.post('login', {service, token: socialToken}).then(function (response) {

                accept(response.data);

            }).catch(function (error) {

                reject(error);

            });

        });

    },

    find(search, page = 1) {

        return new Promise(function (accept, reject) {

            client.get('find?s=' + search + '&page=' + page).then(function (response) {

                accept(response.data);

            }).catch(function (error) {

                reject(error);

            });

        });

    },

    toggleLike(thoughtId) {

        return new Promise(function (accept, reject) {

            auth.login().then(function () {

                client.post('likes', {thought_id: thoughtId}).then(function (response) {

                    accept(response.data);

                }).catch(function (error) {

                    reject(error);

                });

            });

        });

    },

    toggleFollow(userId) {

        return new Promise(function (accept, reject) {

            client.post('followers', {user_id: userId}).then(function (response) {

                accept(response.data);

            }).catch(function (error) {

                reject(error);

            });

        });

    },

    user(username = null) {

        return new Promise(function (accept, reject) {

            const route = username ? 'user/' + username : 'user';

            client.get(route).then(function (response) {

                accept(response.data);

            }).catch(function (error) {

                reject(error);

            });

        });

    }

};

export default api;
