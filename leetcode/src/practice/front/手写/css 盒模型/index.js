window.onload = function () {
  /**
   * 盒模型有 content + padding + border + margin
   * w3c 标准盒模型 width = content
   * IE 怪异盒模型 width = content + boder + padding
   */

  const $html = document.documentElement;
  const $body = document.body;
  const $scroll = document.getElementsByClassName('scroll')[0];
  const $box = document.getElementsByClassName('box')[0];

  console.log($html.style.width);
  console.log($body.style.width);

  // 获取盒模型的 宽高
  // element.style.width
  // 极不推荐适用于，只能 获取到 联样式 定义的内, 内嵌样式表和外部样式表都无法获取到
  // console.log(window.getComputedStyle($html).width);
  // console.log(window.getComputedStyle($body).width);
  // console.log(window.getComputedStyle($scroll).width);

  // console.log($html.offsetWidth); // 不包括外边距
  // console.log($body.offsetWidth);
  // console.log($scroll.offsetWidth);

  // console.log($box.offsetTop); // 当前元素顶部到相对于父级元素顶部的距离
  // console.log($box.offsetWidth); // 不包括外边距

  // console.log($box.clientWidth); // 当前元素的内容宽度，不包括内边距，边框，包含滚动条

  // console.log($html.clientWidth);
  // console.log($body.clientWidth);
  // console.log($scroll.clientWidth);

  // console.log($box.clientTop); // 好像就是border的值

  // console.log($body.scrollWidth);
  // console.log($box.scrollHeight); // 滚动区域，也就是子元素的内容小于父元素的内容，值为父元素的宽高，大于的话就是子元素的宽高 + 父元素的padding

  // console.log($box.scrollTop); // 元素内滚动条的距离，子元素没有父元素大，就是 0

  // let windowHeight = window.innerHeight
  // console.log(windowHeight)

  // window.document.body.onscroll = throttle(function () {
  //   let {top, bottom} = $box.getBoundingClientRect();
  //   console.log(top, bottom)
  //   console.log(top - windowHeight > 0)
  // });

  // function throttle(fn) {
  //   let timer = null;
  //   return function () {
  //     if (!timer) {
  //       timer = setTimeout(() => {
  //         fn.call(this, ...arguments);
  //         timer = null;
  //       }, 300);
  //     }
  //   };
  // }
  let ob = new IntersectionObserver(
    function (entries) {
      console.log(entries);
      let entire = entries[0]
      // 表示进入与否，最开始会触发一次，离开也会触发一次
      if (entire.isIntersecting) {
        
      }
    },
    {
      thresholds: 0.1,
      root: null, // 为空表示可视窗口
    }
  );
  ob.observe($box);
};
