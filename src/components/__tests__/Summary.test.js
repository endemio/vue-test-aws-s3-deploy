import BootstrapVue from 'bootstrap-vue'
import { mount } from '@vue/test-utils'
import Summary from "../Order/Summary";
import { createLocalVue } from '@vue/test-utils'

// create an extended `Vue` constructor
const localVue = createLocalVue()

// install plugins as normal
localVue.use(BootstrapVue)

describe('Component', () => {

    const wrapper = mount(Summary,{
        localVue,
        propsData:{
            pizza_size:10
        }
    })

    test('Is Vue component', () => {
        expect(wrapper.vm).toBeTruthy();
    })

    it('Is Contain string', () => {
        expect(wrapper.text()).toContain('Summary order')
    })

    it('Is exist button', () => {
        expect(wrapper.find('.btn').element.tagName === 'DIV').toBe(true)
    })
})