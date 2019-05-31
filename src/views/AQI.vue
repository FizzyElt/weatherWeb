<template>
  <div>
    <div v-if="!aqidataok&&!aqiGetError" class="loadingstyle">
      <h4>
        行政院環境資源資料開放平臺
        <br>提供的API會失靈請見諒
      </h4>
      <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label=" Large Loading..."></b-spinner>
    </div>
    <div class="getErrorView" v-if="aqiGetError&&!aqidataok">
      <h2>請求失敗!!!</h2>
    </div>
    <h3 v-if="aqidataok">最大值設為300如果真的超過我會先離開這鬼島</h3>

    <div class="aqinavlist">
      <div v-if="aqidataok" class="inputbox">
        <p>搜尋縣市名稱</p>
        <input type="text" v-model="searchbox">
        <b-button v-on:click="aqisort()">AQI排序</b-button>
      </div>
    </div>

    <ul class="aqitemplate" v-if="aqidataok" :style="{'width':aqilistwidth}">
      <li class="aqiitem" v-for="item in searchlist" v-on:click="sendDetail(item)">
        <div class="aqidatabox">
          <div class="aqibox1">
            <h2>{{item.County}}</h2>
            <h5>測站名稱：{{item.SiteName}}</h5>
            <b-progress :max="max" class="mb-2" height="10px">
              <b-progress-bar
                :value="item.AQI===''? 0:parseInt(item.AQI)"
                :style="{'background-color':barcolor(parseInt(item.AQI))}"
              ></b-progress-bar>
            </b-progress>
          </div>

          <div class="aqibox2">
            <h5>{{item.Status}}</h5>
            <h4>{{item.AQI}}</h4>
          </div>
        </div>
        <p>資料建置日期:{{item.PublishTime}}</p>
      </li>
    </ul>
    <AQIdetail :detailData="AQIDetailData" v-if="detailview" @turnoff="AQIDetailView()"></AQIdetail>
  </div>
</template>
<script>
import AQIdetail from "../components/AQIdetail.vue";
export default {
  data() {
    return {
      max: 300,
      AQIdata: [],
      aqilistwidth: Math.floor(document.body.clientWidth / 280) * 280 + "px",
      aqidataok: false,
      aqiGetError: false,
      sortmode: false,
      searchbox: "",
      clicknum: "",
      detailview: false,
      AQIDetailData:{}
    };
  },
  components: {
    AQIdetail
  },
  computed: {
    searchlist() {
      return this.AQIdata.filter(item => {
        return item.County.indexOf(this.searchbox) !== -1;
      });
    },
  },
  methods: {
    AQIDetailView() {
      this.detailview = !this.detailview;
    },
    sendDetail(data) {
      this.AQIDetailData=data;
      this.AQIDetailView();
    },
    getAQIdata() {
      let aqiurl = `https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json`;
      this.$jsonp(aqiurl, null)
        .then(res => {
          this.aqiDataSort(res, "County");
        })
        .catch(err => {
          this.aqiGetError = true;
        });
    },
    aqiDataSort(data, sortName) {
      this.AQIdata = data.sort((a, b) => {
        return a[sortName] < b[sortName] ? 1 : -1;
      });
      this.aqidataok = true;
    },
    aqisort() {
      let x = 0;
      let y = 0;
      if (this.sortmode) {
        this.AQIdata = this.AQIdata.sort((a, b) => {
          x = isNaN(a.AQI) || a.AQI === "" ? 0 : parseInt(a.AQI);
          y = isNaN(b.AQI) || b.AQI === "" ? 0 : parseInt(b.AQI);
          return x > y ? 1 : -1;
        });
      } else {
        this.AQIdata = this.AQIdata.sort((a, b) => {
          x = isNaN(a.AQI) || a.AQI === "" ? 0 : parseInt(a.AQI);
          y = isNaN(b.AQI) || b.AQI === "" ? 0 : parseInt(b.AQI);
          return x < y ? 1 : -1;
        });
      }
      this.sortmode = !this.sortmode;
    },
    barcolor(value) {
      if (value >= 0 && value <= 50) {
        return "limegreen";
      } else if (value > 50 && value <= 100) {
        return "yellow";
      } else if (value > 100 && value <= 150) {
        return "orangered";
      } else if (value > 150 && value <= 200) {
        return "red";
      } else {
        return "purple";
      }
    },
    aqiwidthchange() {
      this.aqilistwidth =
        Math.floor(document.body.clientWidth / 280) * 280 + "px";
    }
  },
  mounted() {
    this.getAQIdata();
  },
  created() {
    window.addEventListener("resize", this.aqiwidthchange);
    //this.widthchange();
  },
  destroyed() {
    window.releaseEvents("resize", this.aqiwidthchange);
  }
};
</script>
<style lang="scss">
.loadingstyle {
  width: 320px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 50px;
}
.inputbox {
  display: flex;
  margin: 15px;
  height: 45px;
  align-items: center;
  flex-wrap: wrap;
  > p {
    font-size: 26px;
    margin: 0;
    margin-right: 6px;
  }
  > input {
    width: 150px;
    font-size: 26px;
    height: 40px;
    margin-right: 30px;
  }
}
.getErrorView {
  margin-top: 80px;
  margin-bottom: 200px;
}
.aqitemplate {
  margin: 10px;
  margin: auto;
  margin-bottom: 400px;
  display: flex;
  flex-wrap: wrap;
  .aqiitem {
    list-style: none;
    margin: 10px;
    width: 260px;
    border-radius: 8px;
    background-color: rgba(62, 178, 255, 0.5);
    cursor: pointer;
    transition: 0.2s;
    .aqidatabox {
      display: flex;
      .aqibox1 {
        margin: 5px;
        height: 120px;
        width: 160px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        > h5 {
          color: rgb(0, 97, 161);
        }
      }
      .aqibox2 {
        width: 90px;
        height: 100px;
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        > h5 {
          padding: 3px;
          margin-top: 5px;
          margin-right: 4px;
          line-height: 24px;
          border-radius: 8px;
          background-color: rgb(175, 252, 169);
        }
        > h4 {
          text-align: left;
          line-height: 23px;
          margin-left: 5px;
          margin-bottom: 4px;
        }
      }
      > p {
        margin-top: 3px;
      }
      .barprogress {
        display: flex;
        background-color: limegreen;
      }
      .barfontsize {
        font-size: 21px;
        background-color: red;
      }
    }
  }
  .aqiitem:hover {
    transform: scale(1.05);
  }
  .aqiitem:active {
    transform: scale(1.08);
  }
}
</style>
