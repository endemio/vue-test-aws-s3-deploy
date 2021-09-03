<template>
    <div class="step">
        <div class="row">
            <div class="col-12">
                <h4>Summary order</h4>
                <p>Pizza size: {{ pizza_size_str }} (pizza price without toppings: $
                    {{ pizza_price|price_format }})</p>

                <h5>Toppings</h5>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in topping_list" :key="index">
                        <td>{{ item.title }}</td>
                        <td>$ {{ item.price | price_format }}</td>
                    </tr>

                    </tbody>
                    <tfoot>
                    <tr>
                        <td>Summary</td>
                        <td>$ {{ pizza_cost | price_format }}</td>
                    </tr>
                    <tr>
                        <td>Discount depending on toppings</td>
                        <td> - $ {{ (pizza_cost - pizza_cost_with_discount) | price_format }}</td>
                    </tr>
                    <tr>
                        <td>Summary with VAT</td>
                        <td>$ {{ pizza_cost_with_discount * 1.15 | price_format }}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="btn btn-warning" @click="current_step=1">
            Restart from begin
        </div>

    </div>
</template>

<script>
import Constants from "../../data/constants";

export default {
    name: "Summary",
    props: {
        'pizza_size': {default: 0, type: Number},
        'pizza_toppings': {default(){return []}, type: Array},
        'pizza_order': {default(){return {}}, type: Object}
    },
    data() {
        return {}
    },
    filters: {
        price_format: function (value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
    computed: {
        pizza_size_str() {
            if (this.$props.pizza_size > 0) {
                return Constants.size[Constants.size.findIndex(item => item.value === this.$props.pizza_size)].text;
            }
        },

        pizza_price() {
            if (this.$props.pizza_size > 0) {
                return Constants.size[Constants.size.findIndex(item => item.value === this.$props.pizza_size)].value;
            }
        },

        topping_list() {

            let result = [];

            this.$props.pizza_toppings.forEach(function (item) {
                result.push({
                    title: Constants.topping[Constants.topping.findIndex(top => top.value === item)].text,
                    price: Constants.topping[Constants.topping.findIndex(top => top.value === item)].price,
                })
            }, this);

            return result;
        },

        pizza_cost() {

            let result = 0

            this.$props.pizza_toppings.forEach(function (item) {
                result += Constants.topping[Constants.topping.findIndex(top => top.value === item)].price
            }, this);

            result += this.pizza_price

            return result;

        },

        pizza_cost_with_discount() {

            let prices = [];

            this.$props.pizza_toppings.forEach(function (item) {
                prices.push(Constants.topping[Constants.topping.findIndex(top => top.value === item)].price)
            }, this);

            if (!prices.length) {
                return 0;
            }

            prices.sort();

            if (prices.length === 6) {
                prices.splice(0, 1);
            }

            if (prices.length > 2) {
                prices.splice(0, 1);
            }

            // Add price for pizza size
            prices.push(this.pizza_price)

            return prices.reduce(function (a, b) {
                return a + b;
            });

        },
    }
}
</script>

<style scoped>

</style>