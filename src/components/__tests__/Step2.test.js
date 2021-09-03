import BootstrapVue from 'bootstrap-vue'
import { mount } from '@vue/test-utils'
import Step2 from "../Order/Step2";

import { createLocalVue } from '@vue/test-utils'

// create an extended `Vue` constructor
const localVue = createLocalVue()

// install plugins as normal
localVue.use(BootstrapVue)


describe('Component', () => {

    const wrapper = mount(Step2,{
        localVue
    })

    test('Is Vue component', () => {
        expect(wrapper.vm).toBeTruthy();
    })

    it('Is Contain string', () => {
        expect(wrapper.text()).toContain('Pizza toppings')
    })

    it('Is exist button', () => {
        expect(wrapper.find('.btn').element.tagName === 'DIV').toBe(true)
    })
})