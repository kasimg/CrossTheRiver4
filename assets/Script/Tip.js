import { bindCursorEvent, bindScaleEvent, removeMouseDownEvents, resumeMouseDownEvents } from './Utils';
//  显示游戏规则的按钮
cc.Class({
  extends: cc.Component,

  properties: {
    ruleContext: {
      default: null,
      type: cc.RichText,
    },
  },

  //  初始化tip内容
  initTips() {
    this.ruleContext.node.opacity = 0;
  },

  //  显示tip
  toggleTipState() {
    const opacity = this.ruleContext.node.opacity === 0 ? 255 : 0;

    cc.tween(this.ruleContext.node)
    .to(0.2, { opacity })
    .start();
  },

  //  点击事件
  onMouseDown() {
    this.toggleTipState();
  },

  //  绑定点击事件
  bindMouseDown() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },

  onLoad() {
    this.bindMouseDown();
    this.initTips();
    bindCursorEvent(this.node, this);
    bindScaleEvent(this.node, this, 0.25);
  },

  start() {

  },

  // update (dt) {},
});
