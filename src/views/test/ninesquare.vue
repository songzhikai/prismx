<template>
  <div>
    <ul>
      <li id="0" class="lottery"><img :src="prizes[0].img"><div class="mask"></div></li>
      <li id="1" class="lottery"><img :src="prizes[1].img"><div class="mask"></div></li>
      <li id="2" class="lottery"><img :src="prizes[2].img"><div class="mask"></div></li>
      <li id="7" class="lottery"><img :src="prizes[3].img"><div class="mask"></div></li>
      <a href="javascript:void(0);" @click="startLottery" :style="'background-image:url('+startLotteryImg+')'"></a>
      <li id="3" class="lottery"><img :src="prizes[4].img"><div class="mask"></div></li>
      <li id="6" class="lottery"><img :src="prizes[5].img"><div class="mask"></div></li>
      <li id="5" class="lottery"><img :src="prizes[6].img"><div class="mask"></div></li>
      <li id="4" class="lottery"><img :src="prizes[7].img"><div class="mask"></div></li>
    </ul>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      @open="openLotteryResult"
      :before-close="handleClose">
      <span>恭喜您中奖！！！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>
<script>
export default {
  data() {
    return {
      prizes: [
        {img: require('../../assets/lottery/0.jpg'), weight: 1, id: '0'},
        {img: require('../../assets/lottery/1.jpg'), weight: 1, id: '1'},
        {img: require('../../assets/lottery/2.jpg'), weight: 20, id: '2'},
        {img: require('../../assets/lottery/7.jpg'), weight: 2, id: '7'},
        {img: require('../../assets/lottery/3.jpg'), weight: 2, id: '3'},
        {img: require('../../assets/lottery/6.jpg'), weight: 70, id: '6'},
        {img: require('../../assets/lottery/5.jpg'), weight: 50, id: '5'},
        {img: require('../../assets/lottery/4.jpg'), weight: 280, id: '4'}
      ],
      startLotteryImg: require('../../assets/lottery/lottery.jpg'),
      rollStepTimes: 0, //走的格子次数
      circleNum: 8, //每圈个数
      isPermStart: true, //开始抽奖标记
      timer: '', //定时器
      rollSpeed: 50, // 50毫秒走一个格子
      rollIndex: -1, //当前走到的格子 下标
      addOnCircles: 4, //空走4圈
      addOnCircles2: 6, //空走6圈
      prizeId: '', //中奖id
      dialogVisible: false,

    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    generateLotteryResult(){
      let prizePool = []
      let prizes = this.prizes
      let totalWeight = 0
      prizes.forEach(item =>{
        for(let i=0;i<item.weight;i++){
          prizePool.push(item.id)
        }
      })
      // console.log('prizePool[Math.floor(Math.random()*(prizePool.length-1))]', prizePool[Math.floor(Math.random()*(prizePool.length-1))])
      return prizePool[Math.floor(Math.random()*(prizePool.length-1))]
    },
    //开始抽奖
    startLottery(){
      this.prizeId = this.generateLotteryResult();
      if(this.isPermStart == true){
        this.isPermStart = false
        this.timer = window.setTimeout(this.rollCircle, this.rollSpeed)
      }
    },
    /**
     * 转圈
     * @param lis
     */
    rollCircle(){
      this.rollIndex++
      this.rollStepTimes++
      if(this.rollIndex == 8){
        this.rollIndex = 0
      }
      for(let index=0;index<this.circleNum;index++){
        document.getElementsByClassName('lottery')[index].className = 'lottery'
      }
      for(let index=0;index<this.circleNum;index++){
        let idVal = document.getElementsByClassName('lottery')[index].id;
        if(parseInt(idVal) == this.rollIndex){
          // console.log(this.rollIndex);
          document.getElementsByClassName('lottery')[index].className = 'lottery active'
        }
      }
      //根据圈数改变速度
      if(this.rollStepTimes > this.addOnCircles*8){
        // console.log(this.rollSpeed);
        this.rollSpeed = 200
      }
      if(this.rollStepTimes > this.addOnCircles2*8){
        this.rollSpeed = 500
      }

      //停止控制 prizeId
      if(this.rollStepTimes == (6*8+parseInt(this.prizeId)+1)){
        this.initLottery();
        return;
      }
      this.timer = window.setTimeout(this.rollCircle, this.rollSpeed)
    },
    initLottery(){
      this.rollSpeed = 50
      this.isPermStart = true
      this.rollStepTimes = 0
      this.rollIndex = -1
      window.clearTimeout(this.timer)
      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible = false
    },
    openLotteryResult(){
      this.dialogVisible = true;
    }
  },
  mounted(){
  }
};
</script>
<style scoped>
  ul,li{padding:0px; margin:0px;list-style-type: none;}
  ul{border:4px solid #ba1809;width:570px;height:510px;margin:100px 400px;}
  li{position:relative;width:190px;height:170px;text-align:center;color:#333;font-index:-999;float:left}
  li img{display:block;width:190px;height:170px;}
  a{width:190px;height:170px;display:block;float:left;text-decoration:none;background:url(../../assets/lottery/mask.jpg) no-repeat;}
  li.active .mask{display:block;}
  .mask{
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    background-color: #adc092;
    background:url(../../assets/lottery/mask.jpg) no-repeat;
    display:none;
  }
</style>

