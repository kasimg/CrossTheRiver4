"use strict";
cc._RF.push(module, '420dasRAZdMz731sl3N0x4V', 'restartBtn');
// Script/restartBtn.js

'use strict';

var _Utils = require('./Utils');

//  主界面重新开始按钮
cc.Class({
  extends: cc.Component,

  properties: {},

  //  重新加载场景
  reloadScene: function reloadScene() {
    cc.director.loadScene('mainStage');
  },


  //  鼠标点击事件
  onMouseDown: function onMouseDown() {
    this.reloadScene();
  },


  //  绑定鼠标点击事件
  bindMouseDownEvent: function bindMouseDownEvent() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },
  onLoad: function onLoad() {
    this.bindMouseDownEvent();
    (0, _Utils.bindCursorEvent)(this.node, this);
    (0, _Utils.bindScaleEvent)(this.node, this, 0.3);
    // Editor.Dialog.messageBox();
  },
  start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();