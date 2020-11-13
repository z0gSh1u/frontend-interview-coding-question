#### 文字环绕图片

- 对图片进行float：`float: left`

- 问题：连续的英文字母时连成一串甚至超出去，而不是自动换行

  原因：浏览器默认解析英文或者数字时，是按照单词进行解析

  解决：word-wrap : break-word;（要求换行）  word-break: break-all;   （紧凑）

#### 媒体查询

可以针对不同的媒体类型定义不同的样式

@media *mediatype* and|not|only *(media feature)*

#### 预处理器和后处理器

预处理器：Less、Sass。提供更舒服的语法、变量支持（CSS3现在也支持变量了）

后处理器：处理的是CSS本身。例如cleancss（压缩）、autoprefixer（浏览器前缀）

#### 让元素消失

z-index负值可以隐藏元素，只需要层叠上下文内的某一个父元素加个背景色就可以。

![image-20200318042705853](.\面试题.assets\image-20200318042705853.png)

#### em, rem

- 字体大小 = em值 × 最近父元素字体大小
- 字体大小 = rem值 × 根元素（html）字体大小

#### 字体

- chrome最小字体12px

  突破：transform scale

- 字体通常用偶数px大小，这样0.5、1.5倍能得到整数

#### position的属性

- fixed：固定。搭配TRBL布局。可用于浮动工具块

- relative：相对。参照父级的原始点为原始点，配合TRBL

- absolute：绝对。他是参照浏览器的左上角，配合TRBL进行定位

  相对定位一般配合绝对定位使用（将父元素设置相对定位，使其相对于父元素偏移）

- static：默认值，正常处于文档流

#### 浮动清除

- div clear both
- parent::after content: "" display: block clear: both

一般不单独使用clear left、right，因为元素只会float一个方向，clear both可以确保清除

#### css3新特性

- 选择器nth-child、last-child等
- 动画transition、translate、rotate
- border-radius

#### CSS居中

- 水平居中

  margin: 0 auto。注意父元素要撑开。

- 垂直居中

  先要设置div元素的祖先元素html和body的高度为100%，并且清除默认样式，即把margin和padding设置为0

  - 法1：top
    - position: relative   （static下top无效，relative不脱离文档流，而是占据之前位置。设置为相对定位的元素框会偏移某个距离。元素仍然保持其未定位前的形状，**它原本所占的空间仍保留**。）
    - top: 50%
    - margin-top: 负<盒子的一半高> （向上一半）**注意这是relative定位进行上推的方法**
  - 法2：translateY
    - position: relative
    - top: 50%
    - transform: translateY(-50%)
  - 法3：flex
    - 父元素display: flex
    - align-items: center
    - justify-content: center

#### position的absolute应用

```html
<div id="A"><div id="B"></div></div>
```

当A的position为relative时，B的position为absolute才有效。这时候left:0、top:0就不再针对窗口文档，而是针对id为A的这个div了。

#### css盒子模型

- 一个盒子由外到内可以分成四个部分：**margin（外边距）、border（边框）、padding（内边距）、content（内容）**。会发现margin、border、padding是CSS属性，因此可以通过这三个属性来控制盒子的这三个部分。而content则是HTML元素的内容。

#### Flex布局（伸缩盒子、弹性盒子）

- flex比例：父元素display: flex，子元素flex: n，n=1,2,3...
- 轴
  - flex-direction：当我们不想沿着默认的方向分房子的时候，我们可以改变`flex-direction`属性的值来改变主轴和方向，该属性默认的取值为row。还可以取row-reverse（伸缩项反排）、column、column-reverse。主轴：能串串所有盒子的轴。
  - justify-content： flex-start | flex-end | center | space-between | space-around    沿主轴的分隔方式
  - align-items： flex-start | flex-end | center | baseline | stretch   沿次轴的分隔方式
  - align-self：  覆盖align-items

#### 移动端适配

- meta，viewport为设备宽度，不允许缩放，从而形成ideal viewport
- DPR：1个css像素相当于多少物理像素
- 根据不同dpr设置root的fontsize，然后其他地方用rem
- 新单位：vm，vh，规定视区总宽度为100vw, 总高度为100vh

#### @import

@import url()

link rel stylesheet... href...

建议使用link引入