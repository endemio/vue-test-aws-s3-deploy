<template>
    <div>
        <h1>This is pizza ordering page</h1>

        <!--    Step 1    -->
        <Step1 @next-step="pizzaSizeSelected" v-show="current_step===1"></Step1>

        <!--    Step 2    -->
        <Step2 @next-step="pizzaToppingSelected" @prev-step="current_step=1" v-show="current_step===2"></Step2>

        <!--    Step 3    -->
        <Step3 @next-step="pizzaSummary" @prev-step="pizzaSizeSelected" v-show="current_step===3"></Step3>

        <!--    Step 4    -->
        <Summary :pizza_order="order_detail" :pizza_size="current_size" :pizza_toppings="current_toppings"
                 v-if="current_step===4" :key="current_toppings+order_detail+current_size"></Summary>

    </div>
</template>

<script>
import Constants from "../../data/constants";

import Step1 from "../Order/Step1";
import Step2 from "../Order/Step2";
import Step3 from "../Order/Step3";
import Summary from "../Order/Summary";

export default {
    name: "Pizza",
    components: {Summary, Step3, Step2, Step1},
    props: {},
    data() {
        return {
            size: Constants.size,
            topping: Constants.topping,

            current_step: 1,
            current_size: null,
            current_toppings: [],

            order_detail: {}
        }
    },
    methods: {
        pizzaSizeSelected(value) {
            this.current_size = value;
            this.current_step = 2;
        },
        pizzaToppingSelected(value) {
            this.current_toppings = value;
            console.log(this.current_toppings)
            this.current_step = 3;
        },
        pizzaSummary(value) {
            this.order_detail = value;
            this.current_step = 4;
        }
    },
}
</script>

<style scoped>

</style>