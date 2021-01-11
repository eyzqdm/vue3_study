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


torefs 