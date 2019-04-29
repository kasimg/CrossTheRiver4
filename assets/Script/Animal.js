import { bindCursorEvent, bindScaleEvent, removeMouseDownEvents, resumeMouseDownEvents } from './Utils';
//  动物类
cc.Class({
  extends: cc.Component,

  properties: {
    data: {  //  游戏静态总数据
      default: null,
      type: cc.JsonAsset,
    }
  },

  //  点击响应事件
  onMouseDown() {
    const bridgeNode = this.mainScriptCom.bridgeNode;
    const bridgeCom = bridgeNode.getComponent('Bridge');
    // console.log(bridgeNode, bridgeCom);
    // console.log(this.posInfo);
    let action = null;
    
    //  取消任何可以点击的部位的点击事件
    removeMouseDownEvents(...this.mainScriptCom.animalComs, this.mainScriptCom.goBtnNode.getComponent('GoBtn'));
    switch(this.posInfo) {
      case this.data.json.posInfo.LEFT_RIVER_BANK: {  //  在左岸，向左集合点移动
        //  先更新桥上站位的信息
        const pointIndex = bridgeCom.searchStandPoint();
        console.log(pointIndex);
        if (pointIndex !== -1) {
          // console.log(pointIndex);
          bridgeCom.getOn(this, pointIndex);
          this.posInfo = this.data.json.posInfo.LEFT_STAND_POINT;
          action = this.moveTo(bridgeCom.standPoints[this.standPointIndex].leftPos);
          // this.node.runAction(this.moveTo(bridgeCom.standPoints[this.standPointIndex].leftPos));
        }
        break;
      }
      case this.data.json.posInfo.LEFT_STAND_POINT: {  //  在左集合点，向左岸移动
        bridgeCom.getOff(this);
        this.posInfo = this.data.json.posInfo.LEFT_RIVER_BANK;
        action = this.moveTo(this.leftPos);
        // this.node.runAction(this.moveTo(this.leftPos));

        break;
      }
      case this.data.json.posInfo.RIGHT_STAND_POINT: {  //  在右集合点，向右岸移动
        //  先更新桥上站位的信息
        // const pointIndex = bridgeCom.searchStandPoint();
        // if (pointIndex !== -1) {
        //   // console.log(pointIndex);
        //   bridgeCom.getOn(this, pointIndex);
        //   this.posInfo = this.data.json.posInfo.RIGHT_RIVER_BANK;
        //   this.node.runAction(this.moveTo(bridgeCom.standPoints[this.standPointIndex].rightPos));
        // }

        bridgeCom.getOff(this);
        this.posInfo = this.data.json.posInfo.RIGHT_RIVER_BANK;
        action = this.moveTo(this.rightPos);
        // this.node.runAction(this.moveTo(this.rightPos));

        break;
      }
      case this.data.json.posInfo.RIGHT_RIVER_BANK: {  //  在右岸，向右集合点移动
        // bridgeCom.getOff(this);
        // this.posInfo = this.data.json.posInfo.RIGHT_STAND_POINT;
        // this.node.runAction(this.moveTo(this.rightPos));

        //  先更新桥上站位的信息
        const pointIndex = bridgeCom.searchStandPoint();
        if (pointIndex !== -1) {
          // console.log(pointIndex);
          bridgeCom.getOn(this, pointIndex);
          this.posInfo = this.data.json.posInfo.RIGHT_STAND_POINT;
          action = this.moveTo(bridgeCom.standPoints[this.standPointIndex].rightPos);
          // this.node.runAction(this.moveTo(bridgeCom.standPoints[this.standPointIndex].rightPos));
        }
        break;
      }
    }

    //  开始移动
    if (action) {
      this.node.runAction(cc.sequence(action, cc.callFunc(() => {
        //  动画播放完之后恢复点击事件
        resumeMouseDownEvents(...this.mainScriptCom.animalComs, this.mainScriptCom.goBtnNode.getComponent('GoBtn'));

        //  检测是否游戏胜利
        if(this.mainScriptCom.ifSucceed()) {
          this.mainScriptCom.succeed();
        }
        }, this)));
    }
  },

  //  绑定鼠标点击事件
  bindMouseDownEvent() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },

  //  解除鼠标点击事件
  removeMouseDownEvent() {
    this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },

  //  初始化动物位置信息
  initPosInfo() {
    this.posInfo = this.data.json.posInfo.LEFT_RIVER_BANK;
  },

  //  移动(特指上下桥的移动)
  moveTo({ x, y }) {
    // console.log(this.timeComsuming);
    const moveAction = cc.moveTo(this.timeConsuming / 3, x, y);
    return moveAction;
  },

  //  设置过桥的速度
  setTimeConsuming(timeComsuming) {
    this.crossRiverTimeConsuming = timeComsuming;
  },

  //  转换动物在桥上的位置状态
  toggleBridgePosInfo() {
    this.posInfo = this.posInfo === this.data.json.posInfo.LEFT_STAND_POINT
    ? this.data.json.posInfo.RIGHT_STAND_POINT
    : this.data.json.posInfo.LEFT_STAND_POINT;
  },

  //  过河(特指过河的移动)
  crossRiver() {
    const bridgeNode = this.mainScriptCom.bridgeNode;
    const bridgeCom = bridgeNode.getComponent('Bridge');
    let crossAction = null;
    // console.log(this.posInfo);
    if (this.posInfo === this.data.json.posInfo.LEFT_STAND_POINT) {
      crossAction = cc.moveTo(this.crossRiverTimeConsuming, bridgeCom.standPoints[this.standPointIndex].rightPos.x, bridgeCom.standPoints[this.standPointIndex].rightPos.y);
      // this.posInfo = this.data.json.posInfo.RIGHT_STAND_POINT;
    } else {
      crossAction = cc.moveTo(this.crossRiverTimeConsuming, bridgeCom.standPoints[this.standPointIndex].leftPos.x, bridgeCom.standPoints[this.standPointIndex].leftPos.y);
      // this.posInfo = this.data.json.posInfo.LEFT_STAND_POINT;
    }
    return crossAction;
  },

  //  显示过河所花的时间
  showTimeConsuming() {
    const displayer = this.mainScriptCom.AnimalTimeConsumingDisplayer;
    displayer.string = this.chineseName + '过桥需要' + this.timeConsuming + '秒';
    // console.log(displayer);
  },

  //  鼠标悬停事件
  onMouseEnter() {
    this.showTimeConsuming();
  },

  //  绑定鼠标悬停事件
  bindMouseEnterEvent() {
    this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
  },

  onLoad() {
    this.initPosInfo();
    this.bindMouseDownEvent();
    this.bindMouseEnterEvent();
    bindCursorEvent(this.node, this);
    bindScaleEvent(this.node, this, 0.2);
  },

  start() {

  },

  // update (dt) {},
});
