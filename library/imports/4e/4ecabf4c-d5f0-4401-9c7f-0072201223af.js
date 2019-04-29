"use strict";
cc._RF.push(module, '4ecab9M1fBEAZx/AHIgEiOv', 'Tip');
// Script/Tip.js

'use strict';

var _Utils = require('./Utils');

//  显示游戏规则的按钮
cc.Class({
  extends: cc.Component,

  properties: {
    ruleContext: {
      default: null,
      type: cc.RichText
    }
  },

  //  初始化tip内容
  initTips: function initTips() {
    this.ruleContext.node.opacity = 0;
  },


  //  显示tip
  toggleTipState: function toggleTipState() {
    var opacity = this.ruleContext.node.opacity === 0 ? 255 : 0;

    cc.tween(this.ruleContext.node).to(0.2, { opacity: opacity }).start();
  },


  //  点击事件
  onMouseDown: function onMouseDown() {
    this.toggleTipState();
  },


  //  绑定点击事件
  bindMouseDown: function bindMouseDown() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },
  onLoad: function onLoad() {
    this.bindMouseDown();
    this.initTips();
    (0, _Utils.bindCursorEvent)(this.node, this);
    (0, _Utils.bindScaleEvent)(this.node, this, 0.25);
  },
  start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();