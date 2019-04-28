//  桥类，控制动物的上下桥，以及点击后行走的动画
cc.Class({
  extends: cc.Component,

  properties: {
    passageComs: [cc.Component],  //  存放站在桥上的人
    standPoints: [],  //  桥上的站位信息，一共2个(左右合起来算一个)，其中存放站点的位置以及有没有被占据
    data: {
      default: null,
      type: cc.JsonAsset,
    }
  },

  //  初始化站点
  initStandPoints() {
    // console.log(this.data.json.leftAssemblePoint[0]);
    for (let i = 0; i < this.data.json.leftAssemblePoint.length; i++) {
      const point = {};
      point.passage = null;
      point.leftPos = this.data.json.leftAssemblePoint[i];
      point.rightPos = this.data.json.rightAssemblePoint[i];
      this.standPoints.push(point);
    }
    // console.log(this.standPoints);
  },

  //  判断桥上是否有人
  isEmpty() {
    if (this.standPoints.filter((point) => {
      return !point.passage;
    }).length === 2) return true;
    return false;
  },

  //  在桥上寻找一个位置，如果还有位置，返回位置索引，若没有，返回-1
  searchStandPoint() {
    for (let i = 0; i < this.standPoints.length; i++) {
      if (!this.standPoints[i].passage) return i;
    }
    return -1;
  },

  /**
   * 获取桥上站着的所有动物
   * @return passages 桥上站着的所有动物
   */
  getPassages() {
    const points = this.standPoints.filter((point) => {
      return point.passage;
    });
    const passages = [];
    points.forEach((point) => {
      passages.push(point.passage);
    });
    return passages;
  },

  //  获取此时的移动时间（按照最慢的速度计算）
  getTimeConsuming() {
    let maxTime = 0;
    this.getPassages().forEach((passage) => {
      if (passage.timeConsuming > maxTime) maxTime = passage.timeConsuming;
    });

    return maxTime;
  },

  /**
   * 动物上桥
   * @param {cc.Component} passageCom 要上桥的对象
   */
  getOn(passageCom, index) {
    // const index = this.searchStandPoint();
    // if (index !== -1) {
      // console.log(passageCom);
      passageCom.standPointIndex = index;
      this.standPoints[index].passage = passageCom;
      // console.log(this.standPoints[index]);
    // }
  },

  /**
   * 动物下桥
   * @param {cc.Component} passageCom 要下桥的乘客
   */
  getOff(passageCom) {
    this.standPoints[passageCom.standPointIndex].passage = null;
    passageCom.standPointIndex = -1;
  },

  onLoad () {
    this.initStandPoints();
    console.log(this.getPassages());
  },

  start() {

  },

  // update (dt) {},
});
