<template>
    <div class="step">
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

        <div class="btn btn-warning" @click="prevStep()">
            Prev
        </div>

        <div class="btn btn-info" v-show="warn_pizza_step" @click="nextStep(current_toppings)">
            Next
        </div>
    </div>
</template>

<script>
import Constants from "../../data/constants";

export default {
    name: "Step2",
    data() {
        return {
            topping: Constants.topping,
            current_toppings: [],
            size: Constants.size
        }
    },
    watch: {
        current_toppings: function (value) {
            if (value.length > 6) {
                this.current_toppings.splice(-1);
            }
        },
    },
    computed: {
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
    }
}
</script>

<style scoped>

</style>