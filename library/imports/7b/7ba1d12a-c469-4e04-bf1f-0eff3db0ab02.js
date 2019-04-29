"use strict";
cc._RF.push(module, '7ba1dEqxGlOBL8fDv89sKsC', 'MainScript');
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
    },
    tipBtn: {
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


  //  判断是否所有动物都在右岸
  ifSucceed: function ifSucceed() {
    var _this2 = this;

    if (this.animalComs.filter(function (animal) {
      // this.data.json.posInfo.RIGHT_RIVER_BANK
      return animal.posInfo === _this2.data.json.posInfo.RIGHT_RIVER_BANK;
    }).length === this.animalComs.length) return true;
    return false;
  },


  //  游戏胜利的回调函数
  succeed: function succeed() {
    cc.director.loadScene('succeed');
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