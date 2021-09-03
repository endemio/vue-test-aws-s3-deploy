<template>
    <div class="step">
        <div class="row">
            <div class="col-12">
                <h5>Pizza size</h5>
                {{$test}}
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
        <div class="btn btn-info" v-show="warn_pizza_size" @click="nextStep(current_size)">
            Next
        </div>
    </div>
</template>

<script>
import Constants from "../../data/constants";

export default {
    name: "Step1",
    props:{

    },
    data(){
        return {
            current_size:null,
            size: Constants.size
        }
    },
    mounted() {
        console.log(this.$test)
    },
    computed:{
        /* Warnings */
        warn_pizza_size() {
            return this.current_size !== null;
        },
    }
}
</script>

<style scoped>

</style>