export default {
  bind(el, binding, vnode) {
    el.onmousewheel = e => {
      if (e.altKey === false) return;
      var delta = 0;
      if (e.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta / 120;
        //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
        if (window.opera) delta = -delta;
      } else if (event.detail) {
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3;
      }
      if (delta) {
        handle(delta, e);
      }
    };
    function handle(delta, e) {
      el.style.transformOrigin = `${e.x}px ${e.y}px`;
      let transform = "";
      if (getComputedStyle(el).transform !== "none") {
        transform = getComputedStyle(wrapper).transform.replace(/[^\d.,]/g, "");
      } else {
        transform = "1, 0, 0, 1, 0, 0";
      }
      let scale = Number(transform.split(",")[0]);
      if (delta > 0) {
        //向上滚动
        if (scale <= 4) {
          //设最大值
          scale += 0.2;
        }
        el.style.transform = `scale(${scale})`;
      } else {
        //向下滚动
        if (scale >= 0.2) {
          //设最小值
          scale -= 0.2;
        }
        el.style.transform = `scale(${scale})`;
      }
    }
  }
};
