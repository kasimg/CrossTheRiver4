(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Animal.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1322e7zL7pGAZ6w70HQuQW9', 'Animal', __filename);
// Script/Animal.js

'use strict';

var _Utils = require('./Utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//  动物类
cc.Class({
  extends: cc.Component,

  properties: {
    data: { //  游戏静态总数据
      default: null,
      type: cc.JsonAsset
    }
  },

  //  判断动物是否能上桥
  canGetOnTheBridge: function canGetOnTheBridge() {
    var lanternCom = this.mainScriptCom.lanternNode.getComponent('Lantern');
    // console.log(this.posInfo, lanternCom.posInfo);
    if (this.posInfo === this.data.json.posInfo.LEFT_RIVER_BANK && lanternCom.posInfo === this.data.json.posInfo.LEFT_STAND_POINT) return true;
    if (this.posInfo === this.data.json.posInfo.RIGHT_RIVER_BANK && lanternCom.posInfo === this.data.json.posInfo.RIGHT_STAND_POINT) return true;
    return false;
  },


  //  点击响应事件
  onMouseDown: function onMouseDown() {
    var _this = this;

    var bridgeNode = this.mainScriptCom.bridgeNode;
    var bridgeCom = bridgeNode.getComponent('Bridge');
    // console.log(bridgeNode, bridgeCom);
    // console.log(this.posInfo);
    var action = null;

    // if (this.canGetOnTheBridge()) {
    //  取消任何可以点击的部位的点击事件
    _Utils.removeMouseDownEvents.apply(undefined, _toConsumableArray(this.mainScriptCom.animalComs).concat([this.mainScriptCom.goBtnNode.getComponent('GoBtn')]));

    switch (this.posInfo) {
      case this.data.json.posInfo.LEFT_RIVER_BANK:
        {
          //  在左岸，向左集合点移动
          if (this.canGetOnTheBridge()) {

            //  先更新桥上站位的信息
            var pointIndex = bridgeCom.searchStandPoint();
            console.log(pointIndex);
            if (pointIndex !== -1) {
              // console.log(pointIndex);
              bridgeCom.getOn(this, pointIndex);
              this.posInfo = this.data.json.posInfo.LEFT_STAND_POINT;
              action = this.moveTo(bridgeCom.standPoints[this.standPointIndex].leftPos);
              // this.node.runAction(this.moveTo(bridgeCom.standPoints[this.standPointIndex].leftPos));
            }
          }
          break;
        }
      case this.data.json.posInfo.LEFT_STAND_POINT:
        {
          //  在左集合点，向左岸移动
          bridgeCom.getOff(this);
          this.posInfo = this.data.json.posInfo.LEFT_RIVER_BANK;
          action = this.moveTo(this.leftPos);
          // this.node.runAction(this.moveTo(this.leftPos));

          break;
        }
      case this.data.json.posInfo.RIGHT_STAND_POINT:
        {
          //  在右集合点，向右岸移动
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
      case this.data.json.posInfo.RIGHT_RIVER_BANK:
        {
          //  在右岸，向右集合点移动
          // bridgeCom.getOff(this);
          // this.posInfo = this.data.json.posInfo.RIGHT_STAND_POINT;
          // this.node.runAction(this.moveTo(this.rightPos));

          if (this.canGetOnTheBridge()) {
            // removeMouseDownEvents(...this.mainScriptCom.animalComs, this.mainScriptCom.goBtnNode.getComponent('GoBtn'));
            //  先更新桥上站位的信息
            var _pointIndex = bridgeCom.searchStandPoint();
            if (_pointIndex !== -1) {
              // console.log(pointIndex);
              bridgeCom.getOn(this, _pointIndex);
              this.posInfo = this.data.json.posInfo.RIGHT_STAND_POINT;
              action = this.moveTo(bridgeCom.standPoints[this.standPointIndex].rightPos);
              // this.node.runAction(this.moveTo(bridgeCom.standPoints[this.standPointIndex].rightPos));
            }
          }
          break;
        }
    }
    // }


    //  开始移动
    if (action) {
      this.node.runAction(cc.sequence(action, cc.callFunc(function () {
        //  动画播放完之后恢复点击事件
        _Utils.resumeMouseDownEvents.apply(undefined, _toConsumableArray(_this.mainScriptCom.animalComs).concat([_this.mainScriptCom.goBtnNode.getComponent('GoBtn')]));

        //  检测是否游戏胜利
        if (_this.mainScriptCom.ifSucceed()) {
          _this.mainScriptCom.succeed();
        }
      }, this)));
    } else {
      _Utils.resumeMouseDownEvents.apply(undefined, _toConsumableArray(this.mainScriptCom.animalComs).concat([this.mainScriptCom.goBtnNode.getComponent('GoBtn')]));
    }
  },


  //  绑定鼠标点击事件
  bindMouseDownEvent: function bindMouseDownEvent() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },


  //  解除鼠标点击事件
  removeMouseDownEvent: function removeMouseDownEvent() {
    this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },


  //  初始化动物位置信息
  initPosInfo: function initPosInfo() {
    this.posInfo = this.data.json.posInfo.LEFT_RIVER_BANK;
  },


  //  移动(特指上下桥的移动)
  moveTo: function moveTo(_ref) {
    var x = _ref.x,
        y = _ref.y;

    // console.log(this.timeComsuming);
    var moveAction = cc.moveTo(this.timeConsuming / 3, x, y);
    return moveAction;
  },


  //  设置过桥的速度
  setTimeConsuming: function setTimeConsuming(timeComsuming) {
    this.crossRiverTimeConsuming = timeComsuming;
  },


  //  转换动物在桥上的位置状态
  toggleBridgePosInfo: function toggleBridgePosInfo() {
    this.posInfo = this.posInfo === this.data.json.posInfo.LEFT_STAND_POINT ? this.data.json.posInfo.RIGHT_STAND_POINT : this.data.json.posInfo.LEFT_STAND_POINT;
  },


  //  过河(特指过河的移动)
  crossRiver: function crossRiver() {
    var bridgeNode = this.mainScriptCom.bridgeNode;
    var bridgeCom = bridgeNode.getComponent('Bridge');
    var crossAction = null;
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
  showTimeConsuming: function showTimeConsuming() {
    var displayer = this.mainScriptCom.AnimalTimeConsumingDisplayer;
    displayer.string = this.chineseName + '过桥需要' + this.timeConsuming + '秒';
    // console.log(displayer);
  },


  //  鼠标悬停事件
  onMouseEnter: function onMouseEnter() {
    this.showTimeConsuming();
  },


  //  绑定鼠标悬停事件
  bindMouseEnterEvent: function bindMouseEnterEvent() {
    this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
  },
  onLoad: function onLoad() {
    this.initPosInfo();
    this.bindMouseDownEvent();
    this.bindMouseEnterEvent();
    (0, _Utils.bindCursorEvent)(this.node, this);
    (0, _Utils.bindScaleEvent)(this.node, this, 0.2);
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
        //# sourceMappingURL=Animal.js.map
        