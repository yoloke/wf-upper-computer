import { ref } from "vue";

export default function useDraw() {
  // * 指向最外层容器
  const appRef = ref();
  // * 定时函数
  const timer = ref(0);
  // * 默认缩放值
  const scale = {
    width: "1",
    height: "1",
  };
  // * 设计稿尺寸（px）
  const baseWidth = 1920;
  const baseHeight = 1080;

  // * 需保持的比例（默认1.77778）
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
  const calcRate = () => {
    // 当前宽高比
    const currentRate = parseFloat(
      (window.innerWidth / window.innerHeight).toFixed(5)
    );
    if (appRef.value) {
      if (currentRate > baseProportion) {
        // 表示更宽
        // scale.width = (
        //   (window.innerHeight * baseProportion) /
        //   baseWidth
        // ).toFixed(5);
        // scale.height = (window.innerHeight / baseHeight).toFixed(5);
        // appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%,0%)`;
        /*如果在窗口缩放时发现代码中的字体变模糊，这可能是因为使用了CSS的缩放变换(transform: scale())导致的。在某些情况下，使用缩放变换可能会导致内容模糊或失真。

为了避免字体模糊，您可以改为使用CSS的zoom属性来代替缩放变换。zoom属性可以缩放整个元素，包括字体，而不会导致字体模糊。 */
        appRef.value.style.zoom = (window.innerHeight / baseHeight).toFixed(5);
      } else {
        // 表示更高
        // scale.height = (
        //   window.innerWidth /
        //   baseProportion /
        //   baseHeight
        // ).toFixed(5);
        // scale.width = (window.innerWidth / baseWidth).toFixed(5);
        // appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, 0%)`;
        appRef.value.style.zoom = (window.innerWidth / baseWidth).toFixed(5);
      }
    }
  };

  const resize = () => {
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      calcRate();
    }, 200);
  };

  // 改变窗口大小重新绘制
  const windowDraw = () => {
    window.addEventListener("resize", resize);
  };

  // 改变窗口大小重新绘制
  const unWindowDraw = () => {
    window.removeEventListener("resize", resize);
  };

  return {
    appRef,
    calcRate,
    windowDraw,
    unWindowDraw,
  };
}
