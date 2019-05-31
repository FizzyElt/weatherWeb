<template>
  <div id="screenbox">
    <div id="databox">
      <div>
        <h2>{{detailData.County}}</h2>
      </div>
      <div>
        <h4>測站名稱:{{detailData.SiteName}}</h4>
      </div>
      <div class="valuebox">
        <div class="datastyle">
          <h4>空氣品質標(AQI)</h4>
          <div class="valuebar">
            <b-progress :max="300" height="13px" class="barwidth">
              <b-progress-bar class="barcolor" :value="datacheck(detailData.AQI)"></b-progress-bar>
            </b-progress>
            <h5>{{detailData.AQI}}</h5>
          </div>
        </div>
        <div class="datastyle">
          <h4 v-b-popover.hover.left="Description.PM10.content" :title="Description.PM10.title">懸浮微粒(pm10)</h4>
          <div class="valuebar">
            <b-progress :max="400" height="13px" class="barwidth">
              <b-progress-bar class="barcolor" :value="datacheck(detailData.PM10)"></b-progress-bar>
            </b-progress>
            <h5>{{detailData.PM10}}</h5>
            <p>(ug/m3)</p>
          </div>
        </div>
        <div class="datastyle">
          <h4 v-b-popover.hover.left="Description.PM25.content" :title="Description.PM25.title">細懸浮微粒(pm2.5)</h4>
          <div class="valuebar">
            <b-progress :max="250" height="13px" class="barwidth">
              <b-progress-bar class="barcolor" :value="datacheck(detailData['PM2.5'])"></b-progress-bar>
            </b-progress>
            <h5>{{detailData['PM2.5']}}</h5>
            <p>(ug/m3)</p>
          </div>
        </div>
        <div class="datastyle">
          <h4 v-b-popover.hover.left="Description.SO2.content" :title="Description.SO2.title">二氧化硫(SO2)</h4>
          <div class="valuebar">
            <b-progress :max="20" height="13px" class="barwidth">
              <b-progress-bar class="barcolor" :value="datacheck(detailData.SO2)"></b-progress-bar>
            </b-progress>
            <h5>{{detailData.SO2}}</h5>
            <p>ppb</p>
          </div>
        </div>
        <div class="datastyle" >
          <h4 v-b-popover.hover.left="Description.CO.content" :title="Description.CO.title">一氧化碳(CO)</h4>
          <div class="valuebar">
            <b-progress :max="1" height="13px" class="barwidth">
              <b-progress-bar class="barcolor" :value="datacheck(detailData.CO)"></b-progress-bar>
            </b-progress>
            <h5>{{detailData.CO}}</h5>
            <p>ppm</p>
          </div>
        </div>
        <div class="datastyle">
          <h4 v-b-popover.hover.left="Description.O3.content" :title="Description.O3.title">臭氧(O3)</h4>
          <div class="valuebar">
            <b-progress :max="200" height="13px" class="barwidth">
              <b-progress-bar class="barcolor" :value="datacheck(detailData.O3)"></b-progress-bar>
            </b-progress>
            <h5>{{detailData.O3}}</h5>
            <p>ppb</p>
          </div>
        </div>
        <div class="datastyle" >
          <h4 v-b-popover.hover.left="Description.NO2.content" :title="Description.NO2.title">二氧化氮(NO2)</h4>
          <div class="valuebar">
            <b-progress :max="300" height="13px" class="barwidth">
              <b-progress-bar class="barcolor" :value="datacheck(detailData.NO2)"></b-progress-bar>
            </b-progress>
            <h5>{{detailData.NO2}}</h5>
            <p>ppb</p>
          </div>
        </div>
      </div>
      <button @click="$emit('turnoff')">關閉</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["detailData"],
  data(){
    return{
      Description:{
        PM25:{
          title:'PM2.5 細懸浮微粒',
          content:'PM2.5係指微粒氣動粒徑小於2.5微米，單位以微克／立方公尺表示之，由於PM2.5較PM10更容易深入人體肺部，對健康影響更大，若細微粒又附著其他污染物，將更加深呼吸系統之危害。'
        },
        PM10:{
          title:'PM10 懸浮微粒',
          content:'係指粒徑在10微米以下之粒子，又稱浮游塵。主要來源包括道路揚塵、車輛排放廢氣、露天燃燒、營建施工及農地耕作等，或由原生性空氣污染物轉化成之二次污染物，由於粒徑小於10微米以下，能深入人體肺部深處，如該粒子附著其他污染物，則將加深對呼吸系統之危害。'
        },
        SO2:{
          title:'SO2 二氧化硫',
          content:'除自然界產生外，一般為燃料中硫份燃燒與空氣中之氧結合者，為一具刺激臭味之無色氣體，易溶於水，與水反應為亞硫酸；於空氣中可氧化成亞硫酸，為引起酸雨的主要物質之一。'
        },
        CO:{
          title:'CO 一氧化碳',
          content:'除森林火災、甲烷氧化及生物活動等自然現象產生外，主要來自石化等燃料之不完全燃燒產生，無色無味，比空氣輕，由於一氧化碳對血紅素的親和力比氧氣大得多，因此，可能造成人體及動物血液和組織中氧氣過低，而產生中毒現象。'
        },
        O3:{
          title:'O3 臭氧',
          content:'係一種由氮氧化物、反應性碳氫化合物及日光照射後產生之二次汙染物。具強氧化力，對呼吸系統具刺激性，能引起咳嗽、氣喘、頭痛、疲倦及肺部之傷害，特別是對小孩、老人、病人或戶外運動者有較大影響，同時對於植物，包括農作物有不良影響，對於人造材料，諸如橡膠（輪胎等）及油漆等，均能造成危害。'
        },
        NO2:{
          title:'NO2 二氧化氮',
          content:'氮氧化物主要包括一氧化氮（NO）及二氧化氮（NO2），其生成原因係來自燃燒過程中，空氣中氮或燃料中氮化物氧化而成，一氧化氮為無色無味氣體，稍溶於水，燃燒過程生成之氮氧化物以一氧化氮為主要成份，光化學反應中可反應成二氧化氮。'
        }
      }
    }
  },
  methods: {
    datacheck(data) {
      if (isNaN(data) || data === "") {
        return 0;
      } else {
        return parseFloat(data);
      }
    }
  }
};
</script>
<style lang="scss">
#screenbox {
  position: fixed;
  top: 0;
  //padding: 150px;
  z-index: 15;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  #databox {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 8px;
    margin: auto;
    background-color: rgba(0, 131, 192, 0.8);
    color: white;
    margin-top: 50px;
    .datastyle {
      > h4 {
        margin-bottom: 0px;
        text-align: left;
        cursor: pointer;
      }
      .valuebar {
        display: flex;
        margin-bottom: 20px;
        height: 20px;
        align-items: baseline;
        > h5 {
          margin: 0 6px 0 10px;
          font-size: 23px;
        }
        .barwidth {
          width: 350px;
          box-shadow: 0 0px 8px rgb(0, 0, 0);
          .barcolor {
            //box-shadow: 0 0 8px  rgb(0, 0, 0);
            background-color: rgb(253, 190, 17);
          }
        }
      }
    }
    >button{
      width: 80px;
      height: 40px;
      align-self: flex-end;
      margin-right: 10px;
      margin-bottom: 6px;
      border-radius: 8px;
      border: none;
      background-color: rgb(253, 53, 53);
      color: white;
      outline: none;
      transition: 0.2s;
    }
    >button:hover{
      transform: scale(1.1);
    }
    >button:active{
      transform: scale(0.95);
    }
  }
}
</style>

