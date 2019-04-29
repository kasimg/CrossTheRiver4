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


  /**
   * 
   * @param {cc.Node} node 对象所在的节点
   * @param {cc.Component} component 对象组件
   * @param {number} oriScale 初始缩放比例
   * @param {number} terminalScale 缩放后的比例
   */
  bindScaleEvent: function bindScaleEvent(node, component, scale) {
    var oriScale = node.scale;
    var changeScale = function changeScale() {
      // console.log(changeScale);
      node.off(cc.Node.EventType.MOUSE_ENTER, changeScale, component);
      cc.tween(node).to(0.1, { scale: oriScale * (1 + scale) }).call(function () {
        node.on(cc.Node.EventType.MOUSE_ENTER, changeScale, component);
      }).start();
    };
    node.on(cc.Node.EventType.MOUSE_ENTER, changeScale, component);

    node.on(cc.Node.EventType.MOUSE_LEAVE, function () {
      cc.tween(node).to(0.1, { scale: oriScale }).start();
    }, component);
  },


  //  防止狂点
  removeMouseDownEvents: function removeMouseDownEvents() {
    for (var _len = arguments.length, coms = Array(_len), _key = 0; _key < _len; _key++) {
      coms[_key] = arguments[_key];
    }

    // console.log(coms[0]);
    coms.forEach(function (com) {
      // console.log(com);
      com.node.off(cc.Node.EventType.MOUSE_DOWN, com.onMouseDown, com);
    });
  },


  //  批量恢复点击
  resumeMouseDownEvents: function resumeMouseDownEvents() {
    for (var _len2 = arguments.length, coms = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      coms[_key2] = arguments[_key2];
    }

    coms.forEach(function (com) {
      com.node.on(cc.Node.EventType.MOUSE_DOWN, com.onMouseDown, com);
    });
  }
};
module.exports = exports['default'];

cc._RF.pop();