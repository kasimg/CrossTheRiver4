(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MainScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7ba1dEqxGlOBL8fDv89sKsC', 'MainScript', __filename);
// Script/MainScript.js

'use strict';

cc.Class({
  extends: cc.Component,

  properties: {
    data: {
      default: null,
      type: cc.JsonAsset
    },
    animalPrefabNode: {
      default: null,
      type: cc.Prefab
    },
    animalComs: [cc.Component], //  存放所有动物实例
    lanternNode: { //  存放灯节点
      default: null,
      type: cc.Node
    },
    bridgeNode: {
      default: null,
      type: cc.Node
    },
    goBtnNode: {
      default: null,
      type: cc.Node
    },
    AnimalTimeConsumingDisplayer: {
      default: null,
      type: cc.Label
    },
    crossTimeConsumingDisplayer: {
      default: null,
      type: cc.Label
    },
    timer: { //  显示一共消耗的时间
      default: null,
      type: cc.Label
    }
  },

  //  创建动物节点
  createAnimalNodes: function createAnimalNodes() {
    var _this = this;

    this.data.json.animals.forEach(function (animal) {
      var animalNode = cc.instantiate(_this.animalPrefabNode);
      var animalCom = animalNode.getComponent('Animal');
      Object.keys(animal).forEach(function (pro) {
        // console.log(index);
        animalCom[pro] = animal[pro];
      });

      //  加载图像资源
      cc.loader.loadRes(animalCom.name, cc.SpriteFrame, function (err, spriteFrame) {
        // console.log(err, spriteFrame);
        animalNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });

      animalCom.mainScriptCom = _this;
      animalNode.setPosition(animalCom.leftPos.x, animalCom.leftPos.y);
      _this.animalComs.push(animalCom);
      _this.node.addChild(animalNode);
      // console.log(animalCom); 
    });
  },


  //  初始化灯笼节点
  initLanternNode: function initLanternNode() {
    this.lanternNode.setPosition(this.data.json.lantern.leftPos.x, this.data.json.lantern.leftPos.y);
  },


  //  初始化GO按钮节点
  initGoBtnNode: function initGoBtnNode() {
    this.goBtnNode.getComponent('GoBtn').mainScriptCom = this;
  },
  onLoad: function onLoad() {
    // console.log(this.data);
    this.createAnimalNodes();
    this.initLanternNode();
    this.initGoBtnNode();
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
        //# sourceMappingURL=MainScript.js.map
        