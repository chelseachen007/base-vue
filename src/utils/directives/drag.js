export default {
  bind(el, binding, vnode) {
    let dragEl = el.lastChild;
    el.style.position = "absolute";
    el.addEventListener(
      "mousedown",
      event => {
        let wrapper = document.getElementById("wrapper");
        let transform = "";
        if (getComputedStyle(wrapper).transform !== "none") {
          // console.log(getComputedStyle(wrapper).transform);

          transform = getComputedStyle(wrapper).transform.replace(
            /[^\d.,]/g,
            ""
          );
        } else {
          transform = "1, 0, 0, 1, 0, 0";
        }
        let xScale = 1 / transform.split(",")[0];
        let yScale = 1 / transform.split(",")[3];
        let offsetX = parseInt(getComputedStyle(el).left) / xScale; // 获取当前的x轴距离
        let offsetY = parseInt(getComputedStyle(el).top) / yScale; // 获取当前的y轴距离
        let innerX = event.clientX - offsetX; // 获取鼠标在方块内的x轴距
        let innerY = event.clientY - offsetY; // 获取鼠标在方块内的y轴距
        let wrapperWidth = parseInt(getComputedStyle(wrapper).width);
        let wrapperHeight = parseInt(getComputedStyle(wrapper).height);
        let elWidth = parseInt(getComputedStyle(el).width);
        let elHeight = parseInt(getComputedStyle(el).height);
        document.onmousemove = event => {
          el.style.left = "100px";
          el.style.left = (event.clientX - innerX) * xScale + "px";
          el.style.top = (event.clientY - innerY) * yScale + "px";
          if (parseInt(el.style.left) <= 0) {
            el.style.left = "0px";
          }
          if (parseInt(el.style.top) <= 0) {
            el.style.top = "0px";
          }
          if (parseInt(getComputedStyle(el).left) >= wrapperWidth - elWidth) {
            el.style.left = wrapperWidth - elWidth + "px";
          }
          if (parseInt(getComputedStyle(el).top) >= wrapperHeight - elHeight) {
            el.style.top = wrapperHeight - elHeight + "px";
          }
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
          let position = {
            top:parseInt(el.style.top),
            left:parseInt(el.style.left)
          }
          binding.value({position,el});
        };
      },
      false
    );
  }
};
