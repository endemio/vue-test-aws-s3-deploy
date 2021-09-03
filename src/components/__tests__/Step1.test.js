import BootstrapVue from 'bootstrap-vue'
import { mount } from '@vue/test-utils'
import Step1 from "../Order/Step1";

import { createLocalVue } from '@vue/test-utils'

// create an extended `Vue` constructor
const localVue = createLocalVue()

// install plugins as normal
localVue.use(BootstrapVue)

describe('Component', () => {

    const wrapper = mount(Step1,{
        localVue
    })

    test('Is Vue component', () => {
        expect(wrapper.vm).toBeTruthy();
    })

    it('Is Contain string', () => {
        expect(wrapper.text()).toContain('Please, choose pizza type')
    })

    it('Is exist button', () => {
        expect(wrapper.find('.btn').element.tagName === 'DIV').toBe(true)
    })
})