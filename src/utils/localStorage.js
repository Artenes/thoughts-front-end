import local_storage from 'local-storage';

const LOCAL_STORAGE_KEY = 'THOUGHTS_LS';

const ls = {

    retrieve() {

        let app = local_storage.get(LOCAL_STORAGE_KEY);

        if (!app) {

            app = {};
            local_storage.set(LOCAL_STORAGE_KEY, app);

        }

        return app;

    },

    get(key, defaultValue = null) {

        let value = this.retrieve()[key];

        if (!value)
            return defaultValue;

        return value;

    },

    set(key, value) {

        let app = this.retrieve();

        app[key] = value;

        local_storage.set(LOCAL_STORAGE_KEY, app);

    }

};

export default ls;
