# 春招JS复习笔记

参考：www.liaoxuefeng.com

## 数据类型

- Number

  不区分整数和浮点数。特殊：NaN、Infinity

  ```
  0/0=NaN, 2/0=Infinity
  ```

- String

- Boolean

- null和undefined

- 数组

- 对象

  对象的键都是字符串类型，值可以是任意数据类型

## strict模式

```
'use strict';
```

强制通过`var`申明变量，未使用`var`申明变量就使用的，将导致运行错误。

## 字符串

- 多行字符串（``)
- 模板字符串（\`${xxx}\`）

常用方法：indexOf、substring（范围型）、substr（长度型）

字符串按字符打散成数组：`.split("")`

字符转数字，不用parseInt：`return +elem; // '+'可以将任何非数字转化为数字`

## 数组

直接给`Array`的`length`赋一个新的值会导致`Array`大小的变化。多的undefined，少的去掉。

常用方法：slice（裁）、splice（先删后加，返回被删除元素）、push和pop（尾部操作）、Array.from、shift和unshift（头部操作）、sort、reverse、concat、join

循环数组推荐使用`.forEach((v, i, self)=>{})`方法（ES5.1）

数组flatten：

- 单次拍平：三点运算符就地展开

  ```js
  xxx.forEach(v=>{
      if (Array.isArray(v)) {
          res.push(...v)
      } else {
          res.push(v)
      }
  })
  ```

- 彻底拍平：递归处理

  ```js
  arr.forEach(v => {
      if (v instanceof Array){
          arr1 = arr1.concat(fn(v))
      } else {
          arr1.push(v)
      }
  })
  ```

- 实验性功能：`Array.prototype.flat(nLayer)`

## 对象

访问属性：xxx['xxx']、xxx.xxx等效

如果我们要检测`xiaoming`是否拥有某一属性，可以用`in`操作符。不过要小心，如果`in`判断一个属性存在，这个属性不一定是`xiaoming`的，它可能是`xiaoming`继承得到的。例如`object.toString`。

要判断一个属性是否是`xiaoming`自身拥有的，而不是继承得到的，可以用`hasOwnProperty()`方法。

`Object.keys`方法可用于遍历所有属性。也可以用`for var key in obj`循环。

## 函数

默认参数的老式实现：`arg || "default"`（ES6已经可以指定默认参数）

函数末尾如果没有`return`，就是隐含的`return undefined;`

- arguments：全部参数。伪数组。arguments[index]，arguments.length，arguments.callee

- function.length表示形参个数

- arguments转真数组：var args = Array.prototype.slice.call(arguments, 0);

- rest参数

  `function xxx(a, b, ...rest)`

形参与内部变量同名：是同一个参数（非严格）或者报重复声明（严格）

```js
function f1(a) { // 相当于首先var a=10;
    console.log(a);// 10;  
    var a=1;
    console.log(a);// 1 
    console.log(arguments[0])// 1; 
}
f1(10)
```

自动加分号的坑：

```js
return
  some_var
```

立即函数：（加括号是为了正确地语法解析）

```js
(function (x) { return x * x })(y)
```

## 变量作用域

- var变量声明提升，赋值不提升。for内部声明也提升。

  ```js
  function foo() {
      var x = 'Hello, ' + y;
      console.log(x);
      var y = 'Bob';
  }
  // y undefined when log
  ```

- 不同函数内部的同名变量互相独立

- 内部函数可以访问外部函数定义的变量，反过来则不行

- 函数在查找变量时从自身函数定义开始，从“内”向“外”查找

- 不在任何函数内定义的变量就具有全局作用域，绑在window

- 用`let`替代`var`可以申明一个块级作用域的变量（如for内部声明），let不提升

- 解构赋值。解构赋值还可以忽略某些元素。可以对嵌套的对象属性进行赋值，只要保证对应层次一致。

  ```js
  var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
  var {name, age, passport} = person;
  ```

## 对象成员方法

成员方法（以下简称方法）和对象是松耦合的。

```js
var fn = xiaoming.getAge; // 先拿到xiaoming的getAge函数
fn(); // NaN，因为this对象是window。如果在strict模式下this指向undefined。
```

在函数内部定义的函数，`this`又指向`undefined`了！（在非strict模式下，它重新指向全局对象`window`！）修复的办法也不是没有，我们用一个`that`变量在外一层首先捕获`this`。

指定this：`apply`、`call`

- `apply()`把参数打包成`Array`再传入；
- `call()`把参数按顺序传入。

装饰器（劫持方法）：

```js
var count = 0;
var oldParseInt = parseInt; // 保存全局的原函数
window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};
```

## 函数高级主题

- map：每个都做某操作，注意回调函数要有返回值

  ```js
  xxx = xxx.map((v)=>{return xxx})
  ```

  arr.map会为调用的函数传入三个参数： v、i、self；parseInt接受参数为(string, radix?)

- forEach：遍历一遍

- reduce：从前到后两两堆起应用回调函数，然后推回，注意回调函数要有返回值

- 函数的toString结果是函数声明+函数体

- string2int：字符串转数字，不用parseInt

  ```js
  let ss = s.split("")
  ss = ss.map(v=>+v) // 转数字。不转的话x*10+y会变成x0y而不是xy
  let res = ss.reduce((x,y)=>x*10+y)
  return res
  ```

- nameNorm(arr)：首字母大写其余小写

  ```js
  return arr.map(name=>(name.split("").map((v,i)=>!i?v.toUpperCase():v.toLowerCase())).reduce((a,b)=>a+b))
  ```

- filter：过滤，根据回调返回的真假选择是否保留

- sort：`Array`的`sort()`方法默认把所有元素先转换为String再排序。自定义cmpfn时，小于0升序，大于0降序。

- every：所有

- some：至少一个

- find：返回元素

- findIndex：返回下标

## 闭包

函数返回函数来实现延迟计算：

```js
function lazy_sum(arr) {
    return function () {
        // return arr的和
    }
}
var f = lazy_sum([1, 2, 3, 4, 5]); // function sum()
f(); // 15
```

当`lazy_sum`返回函数`sum`时，**相关参数和变量都保存在返回的函数中**，称为“闭包（Closure）”。

相同函数生成的闭包进行===操作为false。这表明闭包之间互不影响。

闭包不立即执行：

```js
function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(
            // 这个函数闭包引用了闭包外的变量！
            function () {
            	return i * i;
        	}
        );
    }
    return arr;
}
var results = count(); // Array<func>
var f1 = results[0]; var f2 = results[1]; var f3 = results[2];
f1(); f2(); f3(); // 均为16
```

返回的函数**引用了变量`i`**，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量`i`已经变成了`4`，因此最终结果为`16`。返回闭包时牢记的一点就是：返回函数**不要引用任何后续会发生变化的变量**。

如果一定要引用循环变量怎么办？方法是**再创建一个函数，用该函数的参数绑定循环变量当前的值**：（创建一个匿名函数并使用立刻执行语法）

```js
// ...省略
    for (var i=1; i<=3; i++) {
        arr.push(
            (function (n) {
            	return function () {
                    // 注意这里面的代码在循环过程中并不会被执行，仍具有延迟执行特性
                	return n * n;
            	}
        	})(i) // 但是变量i通过这种方式绑定到闭包内的变量n上了
        );
// ...省略
f1(); f2(); f3(); // 1，4，9
```

闭包的重要应用：私有变量。换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来。

```js
// JS中没有私有属性，this.xxx均可被外部访问。但是其中的var xxx不可以被访问。
// 外界如果需要访问var xxx，则函数内要暴露this.getxxx=function(){return xxx}
// this.getxxx() = newXXX是非法的，这就实现了私有化，只能读，不能写
```

Curry化：把N个参数分成多次传递，实现逐步构建函数，实现复用。

```js
function make_pow(n) {
    return function (x) {
        return Math.pow(x, n);
    }
}
var pow2 = make_pow(2);
var pow3 = make_pow(3);
```

## 箭头函数

箭头函数没有自己的this，它的this是其声明位置向外找一层。如果使用箭头函数，以前的那种hack写法`var that = this`就不再需要了。

用`call()`或者`apply()`调用箭头函数时，无法对`this`进行绑定，即传入的第一个参数被忽略。

## 生成器

generator由`function*`定义，除了`return`语句，还可以用`yield`返回多次。

函数只能返回一次，所以必须返回`Array`。generator可以一次返回一个数，不断返回多次。

直接调用一个generator和调用函数不一样，`fib(5)`仅仅是创建了一个generator对象，还没有去执行它。执行generator可以不断调用`next()`（返回{value: xxx, done: false}，要自己判断done），也可以for...of...循环。

作用：异步语法糖，同步化（现在有了async await后已经较少使用yield了）

## 面向对象

JS不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。它没有“Class”的概念，**所有对象都是实例**，所谓继承关系不过是**把一个对象的原型指向另一个对象**而已。

`obj.__proto__`可以看到一个对象的原型。`Object.create()`方法可以传入一个原型对象，并创建一个基于该原型的新对象。

每个创建的对象都会设置一个原型，指向它的原型对象。当我们用`obj.xxx`**访问一个对象的属性时**，先在当前对象上查找该属性，如果没有找到，就到其原型对象上找，如果还没有找到，就一直上溯到`Object.prototype`对象，最后，如果还没有找到，就只能返回`undefined`。

Object.prototype是所有对象的最高级原型（除非Object.create(null)），故{}的原型是Object.prototype。Object的原型是null。

构造函数：如果不写`new`，就是一个普通函数，返回`undefined`。如果写了`new`，它就变成了一个构造函数。如果在调用了不写new的，则非严格模式下this是window。

```js
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
var xiaoming = new Student('小明');
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!
// 注意，使用这种方式创建的实例每个都有独自的hello函数，但实际上可以共享同一个来节省内存避免拷贝：
Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};
// 注意这里不能使用箭头函数，否则将导致this无效
```

**原型继承：**继承关系表现在原型链上。例如：

```
BEFORE: new PrimaryStudent() ----> PrimaryStudent.prototype ----> Object.prototype ----> null
AFTER: new PrimaryStudent() ----> PrimaryStudent.prototype ----> Student.prototype ----> Object.prototype ----> null
```

继承关系可以用instanceof来验证。

实现：借助中间对象。

```js
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype; // F原型指向父类
    Child.prototype = new F(); // 子类原型指向F
    Child.prototype.constructor = Child; // 修复构造函数
}
function PrimaryStudent(props) {
    Student.call(this, props); // 调用上级构造函数（给this绑属性）
    this.grade = props.grade || 1;
}
inherits(PrimaryStudent, Student);
```

**Class继承：**利用ES6的class关键字

```js
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }
}
```

## 标准对象

`number`、`string`、`boolean`、`function`和`undefined`有别于其他类型。**特别注意`null`的类型是`object`，`Array`的类型也是`object`，和通常意义上的object——`{}`。**

一些规则：

- 用`parseInt()`或`parseFloat()`来转换任意类型到`number`；
- 用`String()`来转换任意类型到`string`，或者直接调用某个对象的`toString()`方法，注意数字要加括号
- `typeof`操作符可以判断出`number`、`boolean`、`string`、`function`和`undefined`；
- 判断`Array`要使用`Array.isArray(arr)`；
- 判断`null`请使用`myVar === null`；
- 判断某个全局变量是否存在用`typeof window.myVar === 'undefined'`；
- 函数内部判断某个变量是否存在用`typeof myVar === 'undefined'`。
- `null`和`undefined`没有`toString`

## RegExp

全局匹配标记g：不带g，在正则过程中，字符串是从左至右匹配的，如果匹配成功就不再继续向右匹配了。如果你带g，它会**从头到尾的把正确匹配的字符串挑选出来**。全局匹配类似搜索，因此不能使用`/^...$/`，那样只会最多匹配一次。

```js
var str = 'aaaaaaaa'
var reg1 = /a/
var reg2 = /a/g
str.match(reg1)  // 结果为：["a", index: 0, input: "aaaaaaaa"]
str.match(reg2)  // 结果为：["a", "a", "a", "a", "a", "a", "a", "a"]
```

忽略大小写标记i

非贪婪匹配：（默认贪婪）\d+?

## JSON

- `JSON.stringify(对象, 是否要挑选哪些属性, 缩进)`
- `JSON.parse(JSON文本, 后处理函数(k,v)?)`

## 浏览器

对象：

- window：全局作用域，浏览器窗口
- navigator：浏览器自身信息（不可靠），如UA、名称、操作系统平台
- screen：屏幕
- location：当前URL信息

- document：页面
  - document.cookie：服务器在设置cookie时可以使用httpOnly，禁止被JavaScript读取
- history：控制前进后退路由，如今已经很少使用

DOM操作常用API：获取、更新、插入、删除

- document.getElementById / Name / TagName / ClassName

  可以级联调用

- document.querySelector / querySelectorAll

  使用类似于CSS选择器的selector语法

- innerHTML, innerText：前者不转义，后者转义（可以避免XSS）, value（表单类组件内容）

- \<DOM\>.style：修改CSS

- document.createElement创建元素，进一步地可以setAttribute

- \<DOM>.childNodes, removeChild, appendChild：注意删child要倒着删。

- insertBefore：`parentElement.insertBefore(newElement, referenceElement);`，ref通常是子节点

表单：略

文件操作：读文件用FileReader

浏览器与跨域的关系：浏览器收到响应后，首先检查`Access-Control-Allow-Origin`是否包含本域，如果是，则此次跨域请求成功，如果不是，则请求失败。可见，跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的`Access-Control-Allow-Origin`，决定权始终在对方手中。日常加载CDN上的JS、CSS、字体，对方服务器均允许你跨域访问。

## AJAX

现代浏览器采用标准的XMLHttpRequest进行AJAX请求。

- 确认是否支持：window.XMLHttpRequest === "undefined"？
- 用法：先open，再send。`open(method, url, async)`，`send(body)`。可以`setRequestHeader`。
- XMLHttpRequest对象属性：
  - readyState为4表示HTTP响应已经接收
  - responseText是相应内容
  - status响应状态码，200成功
  - onreadystatechange回调函数

## Promise

JS所有代码都是单线程执行的，导致JavaScript的所有网络操作，浏览器事件，都必须是异步执行。

- 定义诺言：

```js
return new Promise((resolve, reject) => {
    // ...
    resolve(data) // or reject()
})
```

- 使用诺言：

```js
// 链式调用
xxx.then((resolved_data)=>{...}).catch((rejected_data)=>{...})
// 同步化
async function foo() { 
    await xxx();  // 不期待resolved_data
    yyy = await xxx(); // 取到resolved_data
}
```

- 诺言赛跑：

有些时候，多个异步任务是为了容错。比如，同时向两个URL读取用户的个人信息，只需要获得先返回的结果即可。这种情况下，用`Promise.race()`实现：

```js
Promise.race([p1, p2]).then(function (result) {
    console.log(result);
});
```

- 诺言合组：（多个并行）

将多个Promise实例包装成一个新的Promise实例：

```js
Promise.all([p1, p2]).then((result) => {
  console.log(result) // ['成功了', 'success'] 成功的时候返回的是一个结果数组
}).catch((error) => {
  console.log(error) // xxx 失败的时候返回最先被reject的值
})
```

## jQuery

- 消除浏览器差异，避免适配的繁琐
- 简洁的操作DOM的方法
- 动画、修改CSS等各种操作

层级选择器：`$('ancestor descendant')`来选择，层级之间用空格隔开

修改css：`.css('attrib', 'value')`

事件绑定：`a.on('click', cb)`，`a.click(cb)`

AJAX：

```js
var jqxhr = $.ajax('/api/categories', {
    async: ?
    method: ?
    contentType: ?
    headers: ?
    data: ? // POST请求会自动编码为contentType的对应格式
}).done(function (data) {
    ajaxLog('成功, 收到的数据: ' + JSON.stringify(data));
}).fail(function (xhr, status) {
    ajaxLog('失败: ' + xhr.status + ', 原因: ' + status);
}).always(function () {
    ajaxLog('请求完成: 无论成功或失败都会调用');
});
```

## Node.js浅谈

JS的单线程导致了它只能使用异步IO。

Node.js为JS提供了基于V8引擎的非浏览器运行时。

## 模块化

- **CommonJS规范** - 代表：Node.js；问题：不适合在浏览器端实现，因为它是同步的

  ```js
  module.exports.xxx = xxx
  module.exports = {xxx, yyy} // Object的键值省略写法
  const xxx = require('xxx')
  ```

  实现原理：

  - 对每个模块构建闭包（使用立即函数`(function(){})()`，实现变量互不干扰）
  - 对每个模块准备对象`module`
  - 加载模块时取它的`module.exports`

  不建议使用`exports.xxx=xxx`，有坑

- **AMD规范** - 需要利用RequireJS引入，是异步的

  定义了一个函数`define(id?, dependencies?, factory)`用来定义模块

- CMD规范- 利用SeaJS，异步，较少用

- **ES6模块化** - ES6已经原生支持模块化了

  ```js
  export { xxx }
  import { xxx } from 'xxx'
  export default xxx // 默认输出，用户导入时就不用知道变量名/函数名了
  const xxx = () => import('./xxx') // Promise异步按需加载，Vue中就有应用
  ```

  在支持ES6模块化的现代浏览器中，script标签可带如下两个**异步化**属性：

  - defer - 渲染完再执行
  - async - 下载完就执行，中断渲染过程

