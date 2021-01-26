关于setup函数 
  1.setup在beforeCreate生命周期回调之前执行,且只执行一次
   因此setup在执行的时,当前的组件实例还没有创建出来,也就意味着:不能使用this。
   this是undefined,说明,就不能通过this再去调用data/computed/methods/props中的相关内容了

   这里不能使用this是指不能直接使用this，可以间接使用。即可以在setup定义的方法中使用this,当模板或methods中
   有使用到该方法时，实例早已创建，this可以正常使用。要注意的是当setup中定义的函数xxx使用了this 则使用该函数时(无论时模板中还是方法中)都要加this. 因为要绑定this指向。函数内部的this指向是在被调用时确定的,指向调用该函数的实例。this.XXX 可以保证xxx调用时内部this指向当前实例。直接写函数名字，就像使用methods中定义的函数那样是不行的。那样就是全局调用，在严格模式下this指向unefined。


   其实所有的composition API相关回调函数中也都不可以。
   如果setup中定义的函数中需要操作组件实例（如表单实例的校验方法），则需要一个获取组件实例的函数。而不是使用this.

  2 setup中的返回值是一个对象,内部的属性和方法是给html模版使用的

    setup中的对象内部的属性和data函数中的return对象的属性都可以在html模版中使用

    setup中的对象中的属性和data函数中的对象中的属性会*合并*为组件对象的属性

    setup中的对象中的方法和methods对象中的方法会合并为组件对象的方法

    在Vue3中尽量不要混合的使用data和setup及methods和setup

    methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods

    setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据

关于生命周期
  大部分2.x中的生命周期钩子都可以在3中使用，区别时是

 1. 3中的setup可以替代2.x中created和beforeCreated
 2. 2.x中的beforeDestroy和destroyed这两个生命周期回调已经在vue3中改成beforeUnmount,unmounted
 3. 3中的生命周期是composition api 要在其中写回调函数

如
 onMounted(()=>{
      console.log('3.0中的onMounted')
   })

注意 2.x的生命周期钩子在setup外部写，3.x的生命周期在setup内部写

关于自定义hooks与普通工具函数的区别 hooks一般以use开头
自定义hooks与混入mixin类似 像一段vue代码段 会使用到ref reactive 各种工具库如axios等

***v3泛型的使用 为什么不能reactive初始化一个符合泛型约束的数据


关于 torefs 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref 什么意思?
当我们想把一个响应式对象分解使用,即把某个属性结构出来使用，这样就不用每次obj.xxx使用了。
但会有个问题，分解出来的属性不是响应式的，当我们修改这个结构出来的属性时，原来对象的这个属性不会改变。
这时候就要用到torefs，他会把对象的每个属性变成ref对象。 const { name, age } = toRefs(state)

注意要与toref区别开来

关于 shallowReactive 与 shallowRef
shallowReactive 浅响应式 只把第一层数据响应化
shallowRef 不能将对象响应化

关于深只读和浅只读 readonly 与 shallowReadonly

关于toRaw 与 markRaw 去响应化 不同的是toraw是对已经响应化的对象使用的
toRaw 不改变原对象的响应式，返回值是将一个已经响应化的对象去响应化。用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
 const user = toRaw(state)
 user.name += '==' 界面无更新
markRaw 标记一个对象，使其永远不会转换为代理。返回对象本身

toRef 将一个响应式对象的属性变为ref对象

customRef 自定义ref 对数据的get和set进行劫持 自定义一些行为 input框的onchange事件 每次输入都会触发
可以使用该方法进行节流。该方法传入一个回调，回调的两个参数方法分别是 通知vue追踪数据。通知vue更新界面。

provide 与 inject 跨代传值
爷 provide('color',color)
孙 const color = inject('color')

动态引入组件

Suspense组件 包裹住异步组件(组件中用到异步数据的组件) 在异步组件加载完毕之前做一些事 作用类似于骨架屏