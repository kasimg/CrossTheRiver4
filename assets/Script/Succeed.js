import { bindCursorEvent, bindScaleEvent, removeMouseDownEvents, resumeMouseDownEvents } from './Utils';

//  成功后的脚本
cc.Class({
  extends: cc.Component,

  properties: {
    againBtn: {
      default: null,
      type: cc.Label,
    },
  },

  //  再来一盘
  again() {
    cc.director.loadScene('mainStage');
  },

  //  按钮点击事件
  onMouseDown() {
    this.again();
  },

  //  绑定按钮点击事件
  bindMouseDownEvent() {
    this.againBtn.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },

  onLoad() {
    // console.log('load');
    this.bindMouseDownEvent();
    bindScaleEvent(this.againBtn.node, this, 0.3);
    bindCursorEvent(this.againBtn.node, this);
  },

  start() {

  },

  // update (dt) {},
});
