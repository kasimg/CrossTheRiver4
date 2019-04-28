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

  bindScaleEvent(node, component, oriScale, terminalScale) {
    const changeScale = function() {
      // console.log(changeScale);
      node.off(cc.Node.EventType.MOUSE_ENTER, changeScale, component);
      cc.tween(node)
      .to(0.1, { scale: oriScale })
      .call(() => {
        node.on(cc.Node.EventType.MOUSE_ENTER, changeScale, component);
      })
      .start();
    };
    node.on(cc.Node.EventType.MOUSE_ENTER, changeScale, component);

    node.on(cc.Node.EventType.MOUSE_LEAVE, () => {
      cc.tween(node)
        .to(0.1, { scale: terminalScale })
        .start();
    }, component);
  }
}