import Vue from "vue";
import App from "./views/App.vue";
import router from "./router";

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

Vue.prototype.$test = process.env.VUE_APP_CUSTOM_VARIABLE

Vue.mixin({
        methods: {
            nextStep(value) {
                this.$emit('next-step', value);
            },
            prevStep() {
                this.$emit('prev-step');
            },
        }
    }
)

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");