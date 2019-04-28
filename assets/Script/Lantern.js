//  灯对象
cc.Class({
  extends: cc.Component,

  properties: {
    data: {
      default: null,
      type: cc.JsonAsset,
    }
  },

  //  初始化灯的位置信息
  initLanternPosInfo() {
    this.posInfo = this.data.json.posInfo.LEFT_STAND_POINT;
  },

  // 判断灯是否在左边
  atLeft() {
    if (this.posInfo === this.data.json.posInfo.LEFT_STAND_POINT) return true;
    return false;
  },

  //  设置灯的速度
  setTimeConsuming(timeConsuming) {
    this.timeConsuming = timeConsuming;
  },

  //  转换在桥上的位置信息
  toggleBridgePosInfo() {
    this.posInfo = this.posInfo === this.data.json.posInfo.LEFT_STAND_POINT
    ? this.data.json.posInfo.RIGHT_STAND_POINT
    : this.data.json.posInfo.LEFT_STAND_POINT;
  },

  //  灯移动
  move() {
    const moveAction = this.atLeft()
    ? cc.moveTo(this.timeConsuming, this.data.json.lantern.rightPos.x, this.data.json.lantern.rightPos.y)
    : cc.moveTo(this.timeConsuming, this.data.json.lantern.leftPos.x, this.data.json.lantern.leftPos.y);

    return moveAction;
  },

  onLoad() {
    this.initLanternPosInfo();
  },

  start() {

  },

  // update (dt) {},
});
