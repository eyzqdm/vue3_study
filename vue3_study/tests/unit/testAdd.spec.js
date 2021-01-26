import { mount } from '@vue/test-utils'
import About from '../../src/views/About'

describe('About.vue', () => {
  it('测试', (done) => {
    const wrapper = mount(About)
    // wrapper.find('button').trigger('click')
    wrapper.vm.add()
    expect(wrapper.vm.num).toBe(10)
    setTimeout(() => {
      expect(wrapper.find('h2').text()).toBe('10')
      done()
    }, 1000)
  })
}
)
