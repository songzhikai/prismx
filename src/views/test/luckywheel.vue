<template>
    <div class="container">
        <div class="lucky-wheel">
            <div class="lucky-title"></div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <div class="wheel-pointer" @click="startRotate()" :style="{transform:rotateAnglePointer,transition:rotateTransitionPointer}"></div>
                </div>
                <div class="wheel-bg" :style="{transform: rotateAngle, transition: rotateTransition}">
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prizeList" :key="index">
                            <div class="prize-pic">
                                <img :src="item.icon">
                            </div>
                            <div class="prize-count" v-if="item.count">
                                {{item.count}}
                            </div>
                            <div class="prize-type">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="main-bg"></div>
            <div class="bg-p"></div>
            <div class="content">
                <div class="lottery_ticket">今日免费抽奖次数： {{ clickNum}}</div>
            </div>
            <div class="tip">
                <div class="tip-title">活动规则</div>
                <div class="tip-content">
                    <p> 1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。</p>
                    <p> 2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
                    <p> 3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
                </div>
            </div>
        </div>
        <div class="toast" v-show="isShowResult">
            <div class="toast-container">
                <img :src="toastPictrue" class="toast-picture">
                <div class="close" @click="closeToast()"></div>
                <div class="toast-title">
                  {{
                    this.hasPrize == 1 ? "恭喜您，获得" +this.prizeList[this.randomIndex].count + ' ' + this.prizeList[this.randomIndex].name : "未中奖"
                  }}
                </div>
                <div class="toast-btn">
                    <div class="toast-cancel"  @click="closeToast">关闭</div>
                </div>
            </div>
        </div>
    -    <!--<div class="toast-mask" v-show="isShowResult"></div>-->
    </div>
</template>
<script>
export default {
  data() {
    return {
      easejoy_bean: 0, //金豆
      prizeList: [], //奖品列表
      prizeIndexPools: [], //奖池 奖品索引 按权重比例放
      isShowResult: false, //抽奖结果弹出框控制器
      hasPrize: false, //是否中奖
      startRotatingDegree: 0, //初始旋转角度
      rotateAngle: 0, //将要旋转的角度
      startRotatingDegreePointer: 0, //指针初始旋转角度
      rotateAnglePointer: 0, //指针将要旋转的度数
      rotateTransition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotateTransitionPointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      isPermClick: true, //是否可以旋转抽奖
      randomIndex: 0, //转盘随机索引 0 - 7
      addOnCircles: 5, //附加多转几圈，3-5
      clickNum: 1, //点击次数
    };
  },
  created() {
    this.initPrizeList();
  },
  computed: {
    toastPictrue() {
      return this.hasPrize
        ? require("../../assets/img/congratulation.png")
        : require("../../assets/img/sorry.png");
    }
  },
  methods: {
    //此方法为处理奖品数据
    initPrizeList(list) {
      this.prizeList = [
        {
          icon: require("../../assets/img/bean_500.png"), // 奖品图片
          count: 10, // 奖品数量
          name: "易趣豆", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon: require("../../assets/img/bean_five.png"),
          count: 10,
          name: "豆",
          isPrize: 1
        },
        {
          icon: require("../../assets/img/bean_one.png"),
          count: 5,
          name: "豆",
          isPrize: 1
        },
        {
          icon: require("../../assets/img/point_five.png"),
          count: 5,
          name: "积分",
          isPrize: 1
        },
        {
          icon: require("../../assets/img/point_ten.png"),
          count: 10,
          name: "积分",
          isPrize: 1
        },
        {
          icon: require("../../assets/img/bean_500.png"),
          count: 15,
          name: "易趣豆",
          isPrize: 1
        },
        {
          icon: require("../../assets/img/give_up.png"),
          count: 0,
          name: "未中奖",
          isPrize: 0
        },
        {
          icon: require("../../assets/img/bean_500.png"),
          count: 20,
          name: "易趣豆",
          isPrize: 1
        }
      ]
      this.luckyWheelRule();
    },
    /**
     *幸运转盘规则 ：
       规则是 count   0 - 9%
       1 - 9%
       2 - 12%
       3 - 12%
       4 - 12%
       5 - 4%
       6 - 40%
       7 - 2%
     */
    luckyWheelRule(){
      let prizeList = this.prizeList
      this.prizeIndexPools = Object.create([])
      this.prizeList.forEach((item, index) => {
        if(index == 0){
          for(let i=0;i<9;i++){
            this.prizeIndexPools.push(0)
          }
        }else if(index == 1){
          for(let i=0;i<9;i++){
            this.prizeIndexPools.push(1)
          }
        }else if(index == 2){
          for(let i=0;i<12;i++){
            this.prizeIndexPools.push(2)
          }
        }else if(index == 3){
          for(let i=0;i<12;i++){
            this.prizeIndexPools.push(3)
          }
        }else if(index == 4){
          for(let i=0;i<12;i++){
            this.prizeIndexPools.push(4)
          }
        }else if(index == 5){
          for(let i=0;i<4;i++){
            this.prizeIndexPools.push(5)
          }
        }else if(index == 6){
          for(let i=0;i<40;i++){
            this.prizeIndexPools.push(6)
          }
        }else if(index == 7){
          for(let i=0;i<2;i++){
            this.prizeIndexPools.push(7)
          }
        }
      })
    },
    startRotate() {
      let _this = this
      if(this.clickNum > 3){
        alert('抱歉，你已经抽奖3次，请明天再来！！！')
        return;
      }
      if (!this.isPermClick) return;
      let type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      let duringTime = 5; // 默认为1s
      console.log(Math.floor( Math.random() * (this.prizeIndexPools.length - 1) ));
      let random = this.prizeIndexPools[Math.floor( Math.random() * (this.prizeIndexPools.length - 1) )]
      this.randomIndex = random
      let resWheelCenterAngle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
      this.isPermClick = false; // 旋转结束前，不允许再次触发
      if (type == 0) {
        // 转动盘子
        this.clickNum++
        this.startRotatingDegree = this.clickNum * this.addOnCircles * 360 + resWheelCenterAngle[this.randomIndex]
        this.rotateAngle = "rotate(" + this.startRotatingDegree + "deg)";
        // // //转动指针
        // this.rotateAnglePointer = "rotate("+this.startRotatingDegreePointer + 360*addOnCircles+"deg)";
        // this.startRotatingDegreePointer =360*addOnCircles;
        // 旋转结束后，允许再次触发
        setTimeout(function() {
          _this.isPermClick = true;
          _this.gameOver();
        }, duringTime * 1000 + 1500); // 延时，保证转盘转完
      } else {
        //
      }
    },
    gameOver() {
      this.isShowResult = true;
      this.hasPrize = this.prizeList[this.randomIndex].isPrize
    },
    //关闭弹窗
    closeToast() {
      this.isShowResult = false;
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
}
.lucky-wheel {
  width: 100%;
  height: 31.5625rem;
  background: rgb(252, 207, 133) url("../../assets/img/color_pillar.png") no-repeat
    center bottom;
  background-size: 100%;
  padding-top: 1.5625rem;
}
.lucky-title {
  width: 100%;
  height: 8.125rem;
  background: url("../../assets/img/lucky_title.png") no-repeat center top;
  background-size: 100%;
}
.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.wheel-bg {
  width: 18.4375rem;
  height: 18.4375rem;
  background: url("../../assets/img/draw_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -60%);
  width: 5.3125rem;
  height: 5.3125rem;
}
.wheel-pointer {
  width: 5.3125rem;
  height: 5.3125rem;
  background: url("../../assets/img/draw_btn.png") no-repeat center top;
  background-size: 100%;
  transform-origin: center 60%;
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.prize-list .prize-item:first-child {
  top: 0;
  left: 8.3125rem;
  transform: rotate(20deg);
}
.prize-list .prize-item:nth-child(2) {
  top: 2.8rem;
  left: 10.8rem;
  transform: rotate(67deg);
}
.prize-list .prize-item:nth-child(3) {
  top: 6.4rem;
  left: 10.6rem;
  transform: rotate(-250deg);
}
.prize-list .prize-item:nth-child(4) {
  top: 9rem;
  left: 8.2125rem;
  transform: rotate(-210deg);
}
.prize-list .prize-item:nth-child(5) {
  top: 9.2125rem;
  left: 4.4rem;
  transform: rotate(-160deg);
}
.prize-list .prize-item:nth-child(6) {
  top: 6.3875rem;
  left: 1.9rem;
  transform: rotate(-111deg);
}
.prize-list .prize-item:nth-child(7) {
  top: 2.8rem;
  left: 1.8125rem;
  transform: rotate(-69deg);
}
.prize-list .prize-item:nth-child(8) {
  top: 0;
  left: 4.5rem;
  transform: rotate(-20deg);
}
.prize-item {
  width: 5.875rem;
  height: 9rem;
}

.prize-pic img {
  width: 4.0625rem;
  height: 2.5rem;
  margin-top: 1.5625rem;
}
.prize-count {
  font-size: 0.875rem;
}
.prize-type {
  font-size: 0.75rem;
}
.main {
  position: relative;
  width: 100%;
  min-height: 14.25rem;
  background: rgb(243, 109, 86);
  padding-bottom: 1.6875rem;
}
.main-bg {
  width: 100%;
  height: 6.5625rem;
  position: absolute;
  top: -3.4375rem;
  left: 0;
  background: url("../../assets/img/luck_bg.png") no-repeat center top;
  background-size: 100%;
}
.bg-p {
  width: 100%;
  height: 2.95rem;
  background: rgb(252, 207, 133);
}
.content {
  position: absolute;
  top: 0.175rem;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 5.1875rem;
  font-size: 1.125rem;
  color: #ffeb39;
  padding-left: 6.75rem;
}
.content div {
  text-align: left;
}
.tip {
  position: relative;
  margin: 2.5rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 1.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #fff8c5;
  line-height: 1.5;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 15.4375rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: rgb(252, 244, 224);
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -6.5rem;
  left: -1.5rem;
  width: 18.75rem;
  height: 8.5625rem;
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: 2.8125rem 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9375rem;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 4.6875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  color: #fff;
}
.close {
  position: absolute;
  top: -0.9375rem;
  right: -0.9375rem;
  width: 2rem;
  height: 2rem;
  background: url("../../assets/img/close_store.png") no-repeat center top;
  background-size: 100%;
}
</style>

