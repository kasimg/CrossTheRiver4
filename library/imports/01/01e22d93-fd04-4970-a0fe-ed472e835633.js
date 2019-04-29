"use strict";
cc._RF.push(module, '01e222T/QRJcKD+7Ucug1Yz', 'Succeed');
// Script/Succeed.js

'use strict';

var _Utils = require('./Utils');

//  成功后的脚本
cc.Class({
  extends: cc.Component,

  properties: {
    againBtn: {
      default: null,
      type: cc.Label
    }
  },

  //  再来一盘
  again: function again() {
    cc.director.loadScene('mainStage');
  },


  //  按钮点击事件
  onMouseDown: function onMouseDown() {
    this.again();
  },


  //  绑定按钮点击事件
  bindMouseDownEvent: function bindMouseDownEvent() {
    this.againBtn.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },
  onLoad: function onLoad() {
    // console.log('load');
    this.bindMouseDownEvent();
    (0, _Utils.bindScaleEvent)(this.againBtn.node, this, 0.3);
    (0, _Utils.bindCursorEvent)(this.againBtn.node, this);
  },
  start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();