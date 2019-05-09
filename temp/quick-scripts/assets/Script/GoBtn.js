(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GoBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9d833jSFk1My4nt5AAmnGgi', 'GoBtn', __filename);
// Script/GoBtn.js

'use strict';

var _Utils = require('./Utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//  go按钮对象
cc.Class({
  extends: cc.Component,

  properties: {},

  //  初始化总消耗的时间
  initTimeConsumingSum: function initTimeConsumingSum() {
    this.timeConsumingSum = 0;
  },


  //  移动动物和灯笼
  moveAnimalsAndLantern: function moveAnimalsAndLantern() {
    var _this = this;

    // const bridgeNode = this.mainScriptCom.bridgeNode;
    var bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    var passages = bridgeCom.getPassages();
    // const lanternNode = this.mainScriptCom.lanternNode;
    var lanternCom = this.mainScriptCom.lanternNode.getComponent('Lantern');
    // const 

    //  获取移动时间
    var timeConsuming = bridgeCom.getTimeConsuming();

    //  乘客移动
    passages.forEach(function (passage) {
      passage.setTimeConsuming(timeConsuming / 3); //  让实际运动时间减少一点
      passage.node.runAction(cc.sequence(passage.crossRiver(), cc.callFunc(function () {
        passage.toggleBridgePosInfo();
        // this.updateTimeConsuming();
      })));
    });

    //  灯笼移动
    lanternCom.setTimeConsuming(timeConsuming / 3);
    lanternCom.node.runAction(cc.sequence(lanternCom.move(), cc.callFunc(function () {
      lanternCom.toggleBridgePosInfo();
      _this.updateTimeConsuming();

      //  过河之后恢复点击
      _Utils.resumeMouseDownEvents.apply(undefined, _toConsumableArray(_this.mainScriptCom.animalComs).concat([_this.mainScriptCom.goBtnNode.getComponent('GoBtn')]));
    })));
    // lanternCom.move();
  },


  //  按钮点击事件
  onMouseDown: function onMouseDown() {
    var bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');

    //  取消所有点击事件
    _Utils.removeMouseDownEvents.apply(undefined, _toConsumableArray(this.mainScriptCom.animalComs).concat([this.mainScriptCom.goBtnNode.getComponent('GoBtn')]));
    if (!bridgeCom.isEmpty()) {
      this.moveAnimalsAndLantern();
      //  改变箭头方向
      // this.node.rotation += 180;
      cc.tween(this.node).to(0.2, { rotation: this.node.rotation + 180 }).start();
    } else {
      _Utils.resumeMouseDownEvents.apply(undefined, _toConsumableArray(this.mainScriptCom.animalComs).concat([this.mainScriptCom.goBtnNode.getComponent('GoBtn')]));
    }
  },


  //  绑定按钮点击事件
  bindMouseDownEvent: function bindMouseDownEvent() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },


  //  显示此次过河需要的时间
  showTime: function showTime() {
    var bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    var timeDisplayer = this.mainScriptCom.crossTimeConsumingDisplayer;
    if (bridgeCom.getPassages().length > 0) {
      //  如果有乘客才显示过河需要花费的时间
      var timeConsuming = bridgeCom.getTimeConsuming();
      //  缓慢浮现时间
      timeDisplayer.string = '此次过河需要' + timeConsuming + '秒';
      var appearTween = cc.tween(timeDisplayer.node).to(0.3, { opacity: 255 });
      appearTween.start();
    }
  },


  //  取消过河时间的显示
  hideTime: function hideTime() {
    var timeDisplayer = this.mainScriptCom.crossTimeConsumingDisplayer;
    cc.tween(timeDisplayer.node).to(0.3, { opacity: 0 }).start();
  },


  //  更新总耗时的显示
  updateTimeConsuming: function updateTimeConsuming() {
    // console.log('update')
    var timer = this.mainScriptCom.timer;
    var bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    this.timeConsumingSum += bridgeCom.getTimeConsuming();
    timer.string = '总耗时: ' + this.timeConsumingSum + '秒';

    //  判断是否游戏结束
    if (this.ifGameOver()) {
      this.gameOver();
    }
  },


  //  判断游戏是否结束
  ifGameOver: function ifGameOver() {
    if (this.timeConsumingSum > 30) return true;
    return false;
  },


  //  游戏结束时进行的操作
  gameOver: function gameOver() {
    cc.director.loadScene('gameOver');
  },


  //  鼠标离开事件
  onMouseLeave: function onMouseLeave() {
    this.hideTime();
  },


  //  鼠标悬停事件
  onMouseEnter: function onMouseEnter() {
    this.showTime();
  },


  //  绑定鼠标悬停事件
  bindMouseEnterEvent: function bindMouseEnterEvent() {
    this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
  },


  //  绑定鼠标离开事件
  bindMouseLeaveEvent: function bindMouseLeaveEvent() {
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
  },


  //  移除鼠标点击事件
  removeMouseDownEvent: function removeMouseDownEvent() {
    this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },
  onLoad: function onLoad() {
    this.initTimeConsumingSum();
    this.bindMouseDownEvent();
    this.bindMouseEnterEvent();
    this.bindMouseLeaveEvent();
    (0, _Utils.bindCursorEvent)(this.node, this);
    (0, _Utils.bindScaleEvent)(this.node, this, 0.2);
    // this.updateTimeConsuming();
    // this.node.on(cc.Node.EventType.MOUSE_ENTER, () => {console.log('a')}, this);
    // this.node.on(cc.Node.EventType.MOUSE_ENTER, () => {console.log('b')}, this);
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
        //# sourceMappingURL=GoBtn.js.map
        