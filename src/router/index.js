import Vue from "vue";
import VueRouter from "vue-router";
import Pizza from "../components/Page/Pizza";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Pizza",
        component: Pizza,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;