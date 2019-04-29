export default {
  //  鼠标移入移出变化样式
  /**
   * 鼠标悬停小手，鼠标离开箭头
   * @param {cc.Node} node 节点
   * @param {cc.Component} component 组件
   */
  bindCursorEvent(node, component) {
    node.on(cc.Node.EventType.MOUSE_ENTER, () => {
      cc.game.canvas.style.cursor = 'pointer';
    }, component);

    node.on(cc.Node.EventType.MOUSE_LEAVE, () => {
      cc.game.canvas.style.cursor = 'default';
    }, component);
  },

  /**
   * 
   * @param {cc.Node} node 对象所在的节点
   * @param {cc.Component} component 对象组件
   * @param {number} oriScale 初始缩放比例
   * @param {number} terminalScale 缩放后的比例
   */
  bindScaleEvent(node, component, scale) {
    const oriScale = node.scale;
    const changeScale = function() {
      // console.log(changeScale);
      node.off(cc.Node.EventType.MOUSE_ENTER, changeScale, component);
      cc.tween(node)
      .to(0.1, { scale: oriScale * (1 + scale) })
      .call(() => {
        node.on(cc.Node.EventType.MOUSE_ENTER, changeScale, component);
      })
      .start();
    };
    node.on(cc.Node.EventType.MOUSE_ENTER, changeScale, component);

    node.on(cc.Node.EventType.MOUSE_LEAVE, () => {
      cc.tween(node)
        .to(0.1, { scale: oriScale })
        .start();
    }, component);
  },

  //  防止狂点
  removeMouseDownEvents(...coms) {
    // console.log(coms[0]);
    coms.forEach((com) => {
      // console.log(com);
      com.node.off(cc.Node.EventType.MOUSE_DOWN, com.onMouseDown, com);
    });
  },

  //  批量恢复点击
  resumeMouseDownEvents (...coms) {
    coms.forEach((com) => {
      com.node.on(cc.Node.EventType.MOUSE_DOWN, com.onMouseDown, com)
    });
  }
}