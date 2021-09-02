<template>
    <div>
        <h1>This is pizza ordering page</h1>

        <!--    Step 1    -->

        <div class="step" v-show="current_step === 1">
            <div class="row">
                <div class="col-12">
                    <h5>Pizza sizr</h5>

                    <b-form-radio-group
                            id="input-pizza-size"
                            v-model="current_size"
                            :options="size"
                            aria-describedby="warn-input-pizza-size"
                            :state="warn_pizza_size"
                    ></b-form-radio-group>
                    <b-form-invalid-feedback :state="warn_pizza_size">
                        {{ 'Please, choose pizza type' }}
                    </b-form-invalid-feedback>
                </div>
            </div>
            <div class="btn btn-info" v-show="warn_pizza_size" @click="current_step=2">
                Next
            </div>
        </div>

        <!--    Step 2    -->
        <div class="step" v-show="current_step === 2">
            <div class="row">
                <div class="col-12">
                    <label for="input-pizza-toppings">Pizza toppings</label>
                    <b-form-group>
                        <b-form-checkbox-group
                                id="checkbox-pizza-toppings"
                                v-model="current_toppings"
                                :options="topping"
                                :disabled="current_toppings.length === 6"
                                :state="warn_pizza_step"
                                name="flavour-1"
                        ></b-form-checkbox-group>
                    </b-form-group>
                    <b-form-invalid-feedback :state="warn_pizza_toppings_number_min">
                        {{ 'Please, add at least 1 topping' }}
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback :state="warn_pizza_toppings_ingridients">
                        {{ 'Bacon and Mozzarella can\'t be in pizza in same time' }}
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback :state="warn_pizza_toppings_number_max">
                        {{ 'You can\t choose more then 6 toppings' }}
                    </b-form-invalid-feedback>
                </div>
            </div>

            <div class="btn btn-warning" @click="current_step=1">
                Prev
            </div>

            <div class="btn btn-info" v-show="warn_pizza_step" @click="current_step=3">
                Next
            </div>
        </div>

        <!--    Step 3    -->
        <div v-show="current_step===3">
            <div class="row mb-2">
                <div class="d-none d-md-block col-3">
                    {{ 'Name' }}
                </div>

                <div class="col-12 col-md-9">
                    <label for="input-order-name" class="d-md-none">{{ 'Truck ID' }}</label>
                    <b-form-input
                            id="input-order-name"
                            v-model="order_name"
                            placeholder="Enter name"
                            :state="warn_order_name"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="warn_order_name">
                        {{ 'Please, enter person name (at least 3 char)' }}
                    </b-form-invalid-feedback>
                </div>
            </div>

            <div class="row mb-2">
                <div class="d-none d-md-block col-3">
                    {{ 'Address' }}
                </div>

                <div class="col-12 col-md-9">
                    <label for="input-order-address" class="d-md-none">{{ 'Address' }}</label>
                    <b-form-textarea
                            rows="2"
                            max-rows="6"
                            id="input-order-address"
                            v-model="order_address"
                            :placeholder="'Address'"
                            :state="warn_order_address"
                    ></b-form-textarea>
                    <b-form-invalid-feedback :state="warn_order_address">
                        {{ 'Please, enter address (at least 10 char)' }}
                    </b-form-invalid-feedback>
                </div>
            </div>

            <div class="row mb-2">
                <div class="d-none d-md-block col-3">
                    {{ 'Phone' }}
                </div>

                <div class="col-12 col-md-9">
                    <label for="input-order-phone" class="d-md-none">{{ 'Phone' }}</label>
                    <b-form-input
                            id="input-order-phone"
                            v-model="order_phone"
                            placeholder="Enter name"
                            :state="warn_order_phone"
                    ></b-form-input>

                    <b-form-invalid-feedback :state="warn_order_phone_length">
                        {{ 'Please, enter phone (at least 7 char)' }}
                    </b-form-invalid-feedback>

                    <b-form-invalid-feedback :state="warn_order_phone_number">
                        {{ 'Please, enter only digits, + and - )' }}
                    </b-form-invalid-feedback>
                </div>
            </div>

            <div class="btn btn-warning" @click="current_step=2">
                Prev
            </div>

            <div class="btn btn-info" v-show="warn_order" @click="current_step=4">
                Next
            </div>


        </div>


        <!--    Step 4    -->
        <div class="step" v-show="current_step === 4">
            <div class="row">
                <div class="col-12">
                    <h4>Summary order</h4>
                    <p>Pizza size: {{ pizza_size_str }} (pizza price without toppings: $ {{pizza_price|price_format}})</p>

                    <h5>Toppings</h5>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in pizza_toppings" :key="index">
                            <td>
                                {{ item.title }}
                            </td>
                            <td>
                                $ {{ item.price | price_format}}
                            </td>
                        </tr>

                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Summary</td>
                                <td>$ {{pizza_cost | price_format}}</td>
                            </tr>
                            <tr>
                                <td>Discount depending on toppings</td>
                                <td> - $ {{ (pizza_cost - pizza_cost_with_discount) | price_format}}</td>
                            </tr>
                            <tr>
                                <td>Summary with VAT</td>
                                <td>$ {{pizza_cost_with_discount*1.15 | price_format}}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div class="btn btn-warning" @click="current_step=1">
                Restart from begin
            </div>

        </div>


    </div>
</template>

<script>
export default {
    name: "Pizza",
    props: {},
    data() {
        return {
            size: [
                {
                    text: 'XXL',
                    value: 20
                },
                {
                    text: 'L',
                    value: 15
                },
                {
                    text: 'M',
                    value: 10
                },
                {
                    text: 'S',
                    value: 5
                },
            ],
            topping: [
                {
                    text: 'Mushrooms',
                    value: 1,
                    price: 1
                },
                {
                    text: 'Olives',
                    value: 2,
                    price: 1
                },
                {
                    text: 'Tomato',
                    value: 3,
                    price: 0
                },
                {
                    text: 'Tona',
                    value: 4,
                    price: 3
                },
                {
                    text: 'Pineapple',
                    value: 5,
                    price: 3
                },
                {
                    text: 'Seafood',
                    value: 6,
                    price: 5
                },
                {
                    text: 'Pepperoni',
                    value: 7,
                    price: 2
                },
                {
                    text: 'Bacon',
                    value: 8,
                    price: 1
                },
                {
                    text: 'Onion',
                    value: 9,
                    price: 0
                },
                {
                    text: 'Mozzarella',
                    value: 10,
                    price: 3
                },
            ],
            current_step: 1,
            current_size: null,
            current_toppings: [],

            order_name: '',
            order_address: '',
            order_phone: ''

        }
    },
    mounted() {

    },
    methods: {},
    filters:{
        price_format: function (value){
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
    watch: {
        current_toppings: function (value) {
            if (value.length > 6) {
                this.current_toppings.splice(-1);
            }
        },
        current_step: function (value){
            if (value === 1){
                this.current_toppings = [];
                this.order_phone = '';
                this.order_address = '';
                this.order_name = '';
            }
        }
    },
    computed: {



        pizza_size_str() {
            if (this.current_size) {
                return this.size[this.size.findIndex(item => item.value === this.current_size)].text;
            }
        },

        pizza_price() {
            if (this.current_size) {
                return this.size[this.size.findIndex(item => item.value === this.current_size)].value;
            }
        },

        pizza_toppings() {

            let result = [];

            let toppings = this.topping;

            this.current_toppings.forEach(function (item) {
                result.push({
                    title: toppings[toppings.findIndex(top => top.value === item)].text,
                    price: toppings[toppings.findIndex(top => top.value === item)].price,
                })
            }, this);

            return result;
        },

        pizza_cost() {

            let result = 0

            let toppings = this.topping;

            this.current_toppings.forEach(function (item) {
                result += toppings[toppings.findIndex(top => top.value === item)].price
            }, this);

            result+=this.pizza_price

            return result;

        },

        pizza_cost_with_discount() {

            let prices = [];

            let toppings = this.topping;

            this.current_toppings.forEach(function (item) {
                prices.push(toppings[toppings.findIndex(top => top.value === item)].price)
            }, this);

            if (!prices.length){
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


        /* Warnings */
        warn_pizza_size() {
            return this.current_size !== null;
        },
        warn_pizza_step() {
            return this.warn_pizza_toppings_ingridients && this.warn_pizza_toppings_number_max && this.warn_pizza_toppings_number_min;
        },
        warn_pizza_toppings_number_min() {
            return this.current_toppings.length > 0;
        },
        warn_pizza_toppings_number_max() {
            return this.current_toppings.length <= 6;
        },
        warn_pizza_toppings_ingridients() {
            return !(this.current_toppings.includes(8) && this.current_toppings.includes(10));
        },

        warn_order() {
            return this.warn_order_name && this.warn_order_address && this.warn_order_phone;
        },

        warn_order_name() {
            return this.order_name.length > 3
        },

        warn_order_address() {
            return this.order_address.length > 10
        },

        warn_order_phone() {
            return this.warn_order_phone_length && this.warn_order_phone_number;
        },

        warn_order_phone_length() {
            return this.order_phone.length > 7
        },

        warn_order_phone_number() {
            return !this.order_phone.match(/[^0-9\-+]/);
        }

    }


}
</script>

<style scoped>

</style>