(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Lantern.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3f2731aPmhJp4ZR/UgC1A3V', 'Lantern', __filename);
// Script/Lantern.js

"use strict";

//  灯对象
cc.Class({
  extends: cc.Component,

  properties: {
    data: {
      default: null,
      type: cc.JsonAsset
    }
  },

  //  初始化灯的位置信息
  initLanternPosInfo: function initLanternPosInfo() {
    this.posInfo = this.data.json.posInfo.LEFT_STAND_POINT;
  },


  // 判断灯是否在左边
  atLeft: function atLeft() {
    if (this.posInfo === this.data.json.posInfo.LEFT_STAND_POINT) return true;
    return false;
  },


  //  设置灯的速度
  setTimeConsuming: function setTimeConsuming(timeConsuming) {
    this.timeConsuming = timeConsuming;
  },


  //  转换在桥上的位置信息
  toggleBridgePosInfo: function toggleBridgePosInfo() {
    this.posInfo = this.posInfo === this.data.json.posInfo.LEFT_STAND_POINT ? this.data.json.posInfo.RIGHT_STAND_POINT : this.data.json.posInfo.LEFT_STAND_POINT;
  },


  //  灯移动
  move: function move() {
    var moveAction = this.atLeft() ? cc.moveTo(this.timeConsuming, this.data.json.lantern.rightPos.x, this.data.json.lantern.rightPos.y) : cc.moveTo(this.timeConsuming, this.data.json.lantern.leftPos.x, this.data.json.lantern.leftPos.y);

    return moveAction;
  },
  onLoad: function onLoad() {
    this.initLanternPosInfo();
  },
  start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Lantern.js.map
        