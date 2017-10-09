import auth from './../auth';

class Facebook {

    init() {

        window.fbAsyncInit = function () {
            FB.init({
                appId: process.env.FACEBOOK_APP_ID,
                cookie: true,
                version: 'v2.8'
            });
            FB.AppEvents.logPageView();
        }.bind(this);

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }

    login() {

        return new Promise(function (accept, reject) {

            if(auth.check())
                return accept(auth.token());

            FB.login(function (response) {

                if (response.authResponse) {

                    accept(response.authResponse.accessToken);

                } else {

                    reject(response);

                }

            }.bind(this), {scope: ['public_profile', 'email']});

        });

    }

}

export default new Facebook();
