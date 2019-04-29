"use strict";
cc._RF.push(module, 'f64f5xJCxlChLgTXI/ntJMe', 'GameOver');
// Script/GameOver.js

'use strict';

var _Utils = require('./Utils');

//  游戏结束场景总脚本类
cc.Class({
  extends: cc.Component,

  properties: {
    restartBtn: {
      default: null,
      type: cc.Label
    }
  },

  //  重新开始游戏
  restart: function restart() {
    // console.log('restart')
    cc.director.loadScene('mainStage');
  },


  //  按钮点击事件
  onMouseDown: function onMouseDown() {
    this.restart();
  },


  //  绑定按钮点击事件
  bindMouseDownEvent: function bindMouseDownEvent() {
    this.restartBtn.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },
  onLoad: function onLoad() {
    // console.log('load');
    this.bindMouseDownEvent();
    (0, _Utils.bindScaleEvent)(this.restartBtn.node, this, 0.3);
    (0, _Utils.bindCursorEvent)(this.restartBtn.node, this);
  },
  start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();