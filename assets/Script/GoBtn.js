import { bindCursorEvent, bindScaleEvent } from './Utils';
//  go按钮对象
cc.Class({
  extends: cc.Component,

  properties: {
  },

  //  初始化总消耗的时间
  initTimeConsumingSum() {
    this.timeConsumingSum = 0;
  },

  //  移动动物和灯笼
  moveAnimalsAndLantern() {
    // const bridgeNode = this.mainScriptCom.bridgeNode;
    const bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    const passages = bridgeCom.getPassages();
    // const lanternNode = this.mainScriptCom.lanternNode;
    const lanternCom = this.mainScriptCom.lanternNode.getComponent('Lantern');
    // const 

    //  获取移动时间
    const timeConsuming = bridgeCom.getTimeConsuming();

    //  乘客移动
    passages.forEach((passage) => {
      passage.setTimeConsuming(timeConsuming);
      passage.node.runAction(cc.sequence(passage.crossRiver(), cc.callFunc(() => {
        passage.toggleBridgePosInfo();
        // this.updateTimeConsuming();
      })));
    });

    //  灯笼移动
    lanternCom.setTimeConsuming(timeConsuming);
    lanternCom.node.runAction(cc.sequence(lanternCom.move(), cc.callFunc(() => {
      lanternCom.toggleBridgePosInfo();
      this.updateTimeConsuming();
    })))
    // lanternCom.move();
  },

  //  按钮点击事件
  onMouseDown() {
    const bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    if (!bridgeCom.isEmpty()) {
      this.moveAnimalsAndLantern();
    }
  },

  //  绑定按钮点击事件
  bindMouseDownEvent() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },

  //  显示此次过河需要的时间
  showTime() {
    const bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    const timeDisplayer = this.mainScriptCom.crossTimeConsumingDisplayer;
    if (bridgeCom.getPassages().length > 0) {  //  如果有乘客才显示过河需要花费的时间
      const timeConsuming = bridgeCom.getTimeConsuming();
      //  缓慢浮现时间
      timeDisplayer.string = '此次过河需要' + timeConsuming + '秒';
      const appearTween = cc.tween(timeDisplayer.node)
        .to(0.3, { opacity: 255 });
      appearTween.start();
    }
  },

  //  取消过河时间的显示
  hideTime() {
    const timeDisplayer = this.mainScriptCom.crossTimeConsumingDisplayer;
    cc.tween(timeDisplayer.node)
      .to(0.3, { opacity: 0 })
      .start();
  },

  //  更新总耗时的显示
  updateTimeConsuming() {
    console.log('update')
    const timer = this.mainScriptCom.timer;
    const bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    this.timeConsumingSum += bridgeCom.getTimeConsuming();
    timer.string = '总耗时: ' + this.timeConsumingSum + '秒';
  },

  //  鼠标离开事件
  onMouseLeave() {
    this.hideTime();
  },

  //  鼠标悬停事件
  onMouseEnter() {
    this.showTime();
  },

  //  绑定鼠标悬停事件
  bindMouseEnterEvent() {
    this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
  },

  //  绑定鼠标离开事件
  bindMouseLeaveEvent() {
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
  },

  onLoad() {
    this.initTimeConsumingSum();
    this.bindMouseDownEvent();
    this.bindMouseEnterEvent();
    this.bindMouseLeaveEvent();
    bindCursorEvent(this.node, this);
    bindScaleEvent(this.node, this, 0.21 , 0.19);
    // this.updateTimeConsuming();
    // this.node.on(cc.Node.EventType.MOUSE_ENTER, () => {console.log('a')}, this);
    // this.node.on(cc.Node.EventType.MOUSE_ENTER, () => {console.log('b')}, this);
  },

  start() {

  },

  // update (dt) {},
});
