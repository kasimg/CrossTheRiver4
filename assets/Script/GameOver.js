import { bindCursorEvent, bindScaleEvent, removeMouseDownEvents, resumeMouseDownEvents } from './Utils';
//  游戏结束场景总脚本类
cc.Class({
  extends: cc.Component,

  properties: {
    restartBtn: {
      default: null,
      type: cc.Label,
    },
  },

  //  重新开始游戏
  restart() {
    // console.log('restart')
    cc.director.loadScene('mainStage');
  },

  //  按钮点击事件
  onMouseDown() {
    this.restart();
  },

  //  绑定按钮点击事件
  bindMouseDownEvent() {
    this.restartBtn.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },

  onLoad () {
    // console.log('load');
    this.bindMouseDownEvent();
    bindScaleEvent(this.restartBtn.node, this, 0.3);
    bindCursorEvent(this.restartBtn.node, this);
  },

  start() {

  },

  // update (dt) {},
});
