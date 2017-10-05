import ls from './localStorage';
import bus from './bus';
import api from './api';

const AUTHT_KEY = 'JWT_TOKEN';

class Auth {

    check() {

        return !!ls.get(AUTHT_KEY, false);

    }

    login(socialToken) {

        return new Promise(function (resolve, reject) {

            api.login('facebook', socialToken).then(function (token) {

                ls.set(AUTHT_KEY, token);
                bus.$emit('logedin');

                resolve();

            }).catch(function (error) {

                reject(error);

            });

        });

    }

    logout() {

        ls.set(AUTHT_KEY, null);
        bus.$emit('logedout');

    }

    token(token = null) {

        if (token)
            return ls.set(AUTHT_KEY, token);

        return ls.get(AUTHT_KEY);

    }

    onLogin(callback) {

        bus.$on('logedin', callback);

    }

    onLogout(callback) {

        bus.$on('logedout', callback);

    }

}

export default new Auth();
