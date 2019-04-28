cc.Class({
  extends: cc.Component,

  properties: {
    data: {
      default: null,
      type: cc.JsonAsset,
    },
    animalPrefabNode: {
      default: null,
      type: cc.Prefab,
    },
    animalComs: [cc.Component],  //  存放所有动物实例
    lanternNode: {  //  存放灯节点
      default: null,
      type: cc.Node,
    },
    bridgeNode: {
      default: null,
      type: cc.Node,
    },
    goBtnNode: {
      default: null,
      type: cc.Node,
    },
    AnimalTimeConsumingDisplayer: {
      default: null,
      type: cc.Label,
    },
    crossTimeConsumingDisplayer: {
      default: null,
      type: cc.Label,
    },
    timer: {  //  显示一共消耗的时间
      default: null,
      type: cc.Label,
    },
  },

  //  创建动物节点
  createAnimalNodes() {
    this.data.json.animals.forEach((animal) => {
      const animalNode = cc.instantiate(this.animalPrefabNode);
      const animalCom = animalNode.getComponent('Animal');
      Object.keys(animal).forEach((pro) => {
        // console.log(index);
        animalCom[pro] = animal[pro];
      });

      //  加载图像资源
      cc.loader.loadRes(animalCom.name, cc.SpriteFrame, (err, spriteFrame) => {
        // console.log(err, spriteFrame);
        animalNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });

      animalCom.mainScriptCom = this;
      animalNode.setPosition(animalCom.leftPos.x, animalCom.leftPos.y);
      this.animalComs.push(animalCom);
      this.node.addChild(animalNode);
      // console.log(animalCom); 
    });
  },

  //  初始化灯笼节点
  initLanternNode() {
    this.lanternNode.setPosition(this.data.json.lantern.leftPos.x, this.data.json.lantern.leftPos.y);
  },

  //  初始化GO按钮节点
  initGoBtnNode() {
    this.goBtnNode.getComponent('GoBtn').mainScriptCom = this;
  },

  onLoad () {
    // console.log(this.data);
    this.createAnimalNodes();
    this.initLanternNode();
    this.initGoBtnNode();
  },

  start() {

  },

  // update (dt) {},
});
