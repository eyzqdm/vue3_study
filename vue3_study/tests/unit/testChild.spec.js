import { mount } from '@vue/test-utils'
import Child from '../../src/views/Home.vue'

describe('Child.vue', () => {
  it('测试父子传值', () => {
    const msg = '熊出没'
    const wrapper = mount(Child, {
      props: {
        msg
      }
    })
    expect(wrapper.find('h3').text()).toBe(msg)
  })
}
)
