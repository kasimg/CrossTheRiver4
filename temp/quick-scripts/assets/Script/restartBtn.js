(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/restartBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '420dasRAZdMz731sl3N0x4V', 'restartBtn', __filename);
// Script/restartBtn.js

'use strict';

var _Utils = require('./Utils');

//  主界面重新开始按钮
cc.Class({
  extends: cc.Component,

  properties: {},

  //  重新加载场景
  reloadScene: function reloadScene() {
    cc.director.loadScene('mainStage');
  },


  //  鼠标点击事件
  onMouseDown: function onMouseDown() {
    this.reloadScene();
  },


  //  绑定鼠标点击事件
  bindMouseDownEvent: function bindMouseDownEvent() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
  },
  onLoad: function onLoad() {
    this.bindMouseDownEvent();
    (0, _Utils.bindCursorEvent)(this.node, this);
    (0, _Utils.bindScaleEvent)(this.node, this, 0.3);
    // Editor.Dialog.messageBox();
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
        //# sourceMappingURL=restartBtn.js.map
        