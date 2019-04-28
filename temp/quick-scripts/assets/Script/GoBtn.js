(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GoBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9d833jSFk1My4nt5AAmnGgi', 'GoBtn', __filename);
// Script/GoBtn.js

'use strict';

var _Utils = require('./Utils');

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
      passage.setTimeConsuming(timeConsuming);
      passage.node.runAction(cc.sequence(passage.crossRiver(), cc.callFunc(function () {
        passage.toggleBridgePosInfo();
        // this.updateTimeConsuming();
      })));
    });

    //  灯笼移动
    lanternCom.setTimeConsuming(timeConsuming);
    lanternCom.node.runAction(cc.sequence(lanternCom.move(), cc.callFunc(function () {
      lanternCom.toggleBridgePosInfo();
      _this.updateTimeConsuming();
    })));
    // lanternCom.move();
  },


  //  按钮点击事件
  onMouseDown: function onMouseDown() {
    var bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    if (!bridgeCom.isEmpty()) {
      this.moveAnimalsAndLantern();
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
    console.log('update');
    var timer = this.mainScriptCom.timer;
    var bridgeCom = this.mainScriptCom.bridgeNode.getComponent('Bridge');
    this.timeConsumingSum += bridgeCom.getTimeConsuming();
    timer.string = '总耗时: ' + this.timeConsumingSum + '秒';
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
  onLoad: function onLoad() {
    this.initTimeConsumingSum();
    this.bindMouseDownEvent();
    this.bindMouseEnterEvent();
    this.bindMouseLeaveEvent();
    (0, _Utils.bindCursorEvent)(this.node, this);
    (0, _Utils.bindScaleEvent)(this.node, this, 0.21, 0.19);
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
        