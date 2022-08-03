import Login from "./authentication/login";

import Clients from "./dashboard/admin/clients";
import Products from "./dashboard/admin/products";
import Activations from "./dashboard/admin/activations";
import MyProducts from "./dashboard/clients/my-products";
import Dashboard from "./dashboard/main";

import Loading from "./utilities/loading";

export default {
    loading: Loading,
    authentication: {
        login: Login,
    },

    dashboard: {
        main: Dashboard,
        admins: {
            activations: Activations,
            products: Products,
            clients: Clients,
        },

        clients: {
            myProducts: MyProducts
        },
    }
};