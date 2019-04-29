import { bindCursorEvent, bindScaleEvent, removeMouseDownEvents, resumeMouseDownEvents } from './Utils';

//  主界面重新开始按钮
cc.Class({
  extends: cc.Component,

  properties: {

  },

  //  重新加载场景
  reloadScene() {
    cc.director.loadScene('mainStage');
  },

  //  鼠标点击事件
  onMouseDown() {
    this.reloadScene();
  },

  //  绑定鼠标点击事件
  bindMouseDownEvent() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },

  onLoad () {
    this.bindMouseDownEvent();
    bindCursorEvent(this.node, this);
    bindScaleEvent(this.node, this, 0.3);
    // Editor.Dialog.messageBox();
  },

  start() {

  },

  // update (dt) {},
});
