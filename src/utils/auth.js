import ls from './localStorage';
import bus from './bus';
import api from './api';
import facebook from './social-login/facebook';

const JWT_TOKEN = 'JWT_TOKEN';
const AUTH_USER = 'AUTH_USER';
const AUTH_PSEUDO = 'AUTH_PSEUDO';

class Auth {

    check() {

        return !!ls.get(JWT_TOKEN, false);

    }

    login() {

        const $this = this;

        return new Promise(function (resolve, reject) {

            if($this.check())
                return resolve();

            facebook.login().then(function (socialToken) {

                api.login('facebook', socialToken).then(function (data) {

                    ls.set(JWT_TOKEN, data.token);
                    ls.set(AUTH_USER, data.user.data);
                    ls.set(AUTH_PSEUDO, data.user.pseudonym);
                    bus.$emit('logedin');

                    resolve();

                }).catch(function (error) {

                    reject(error);

                });

            }).catch(function (response) {

                reject(response);

            });

        });

    }

    logout() {

        ls.set(JWT_TOKEN, null);
        bus.$emit('logedout');

    }

    token(token = null) {

        if (token)
            return ls.set(JWT_TOKEN, token);

        return ls.get(JWT_TOKEN);

    }

    user() {

        if(!this.check())
            return null;

        return ls.get(AUTH_USER);

    }

    pseudonym() {

        if(!this.check())
            return null;

        return ls.get(AUTH_PSEUDO);

    }

    onLogin(callback) {

        bus.$on('logedin', callback);

    }

    onLogout(callback) {

        bus.$on('logedout', callback);

    }

}

export default new Auth();
