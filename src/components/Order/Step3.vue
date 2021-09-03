<template>
    <div class="step">
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

        <div class="btn btn-warning" @click="prevStep()">
            Prev
        </div>

        <div class="btn btn-info" v-show="warn_order" @click="nextStep(order)">
            Next
        </div>


    </div>

</template>

<script>
export default {
    name: "Step3",
    data() {
        return {
            order_name: '123123qwdqwd',
            order_address: 'qwdqwd33dqewdqwdqw',
            order_phone: '123123122'
        }
    },
    computed: {

        order(){
            return {
                name: this.order_name,
                phone: this.order_phone,
                address: this.order_address,
            }
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