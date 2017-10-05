import axios from 'axios';
import auth from './auth';

const client = axios.create({

    baseURL: 'http://api.thought.dev/v1/'

});

client.interceptors.request.use(function (config) {

    config.headers.Authorization = 'Bearer ' + auth.token();

    return config;

});

client.interceptors.response.use(function (response) {

    let authorization = response.headers.Authorization;

    if(authorization) {

        auth.token(authorization.split(' ')[1])

    }

    return response;

});

const api = {

    login(service, socialToken) {

        return new Promise(function (accept, reject) {

            client.post('login', {service, token: socialToken}).then(function (response) {

                accept(response.data.token);

            }).catch(function (error) {

                reject(error);

            });

        })

    }

};

export default api;
