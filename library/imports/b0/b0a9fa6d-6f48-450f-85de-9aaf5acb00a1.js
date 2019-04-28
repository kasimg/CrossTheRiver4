"use strict";
cc._RF.push(module, 'b0a9fptb0hFD4Xemq9aywCh', 'Utils');
// Script/Utils.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  //  鼠标移入移出变化样式
  /**
   * 鼠标悬停小手，鼠标离开箭头
   * @param {cc.Node} node 节点
   * @param {cc.Component} component 组件
   */
  bindCursorEvent: function bindCursorEvent(node, component) {
    node.on(cc.Node.EventType.MOUSE_ENTER, function () {
      cc.game.canvas.style.cursor = 'pointer';
    }, component);

    node.on(cc.Node.EventType.MOUSE_LEAVE, function () {
      cc.game.canvas.style.cursor = 'default';
    }, component);
  },
  bindScaleEvent: function bindScaleEvent(node, component, oriScale, terminalScale) {
    var changeScale = function changeScale() {
      // console.log(changeScale);
      node.off(cc.Node.EventType.MOUSE_ENTER, changeScale, component);
      cc.tween(node).to(0.1, { scale: oriScale }).call(function () {
        node.on(cc.Node.EventType.MOUSE_ENTER, changeScale, component);
      }).start();
    };
    node.on(cc.Node.EventType.MOUSE_ENTER, changeScale, component);

    node.on(cc.Node.EventType.MOUSE_LEAVE, function () {
      cc.tween(node).to(0.1, { scale: terminalScale }).start();
    }, component);
  }
};
module.exports = exports['default'];

cc._RF.pop();