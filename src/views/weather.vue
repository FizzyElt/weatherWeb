<template>
  <div>
    <div class="wetherloading" v-if="!weatherdataok">
      <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label=" Large Loading..."></b-spinner>
    </div>
    <div class="home" v-if="weatherdataok">
      <div class="navbtn">
        <!-- <router-link :to="routerpath.time1" class="timebtn" :class="{'timebtnactive':btnactive1}">
      {{timerange[0].startTime}}~<br>{{timerange[0].endTime}}
      </router-link>
      <router-link :to="routerpath.time2" class="timebtn" :class="{'timebtnactive':btnactive2}">
      {{timerange[1].startTime}}~<br>{{timerange[1].endTime}}
      </router-link>
      <router-link :to="routerpath.time3" class="timebtn" :class="{'timebtnactive':btnactive3}">
      {{timerange[2].startTime}}~<br>{{timerange[2].endTime}}
        </router-link>-->
        <router-link
          v-for="(item,index) in timerange"
          :to="item.routerpath"
          class="timebtn"
          :class="[btnactive==item.routerpath?'timebtnactive':'']"
        >時段{{index+1}}</router-link>
      </div>
      <div class="getErrorView" v-if="weatherGetError">
        <h2>請求失敗!!!</h2>
      </div>
      <router-view :weatherdata="getrouter()" :timerange="timeactive()"></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      timerange: [],
      time1data: [],
      time2data: [],
      time3data: [],
      weatherdataok: false,
      weatherGetError: false
    };
  },
  computed: {
    btnactive() {
      return this.$route.path;
    }
  },
  methods: {
    getWeatherData() {
      this.axios
        .get(
          "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-7119ECA8-257C-4ECF-ADF1-86E97EAE5463&elementName=MaxT&elementName=MinT&elementName=PoP&elementName=Wx"
        )
        .then(result => {
          this.datafilter(result.data.records);
        })
        .catch(err => {
          this.weatherGetError=true
        });
    },
    datafilter(res) {
      let data = res.location;
      data[0].weatherElement[0].time.forEach((res, index) => {
        this.timerange.push({
          routerpath: "/weather/time" + (index + 1),
          startTime: res.startTime,
          endTime: res.endTime
        });
      });
      data.forEach(value => {
        this.time1data.push(this.datapush(value, 0));
        this.time2data.push(this.datapush(value, 1));
        this.time3data.push(this.datapush(value, 2));
      });
      this.weatherdataok = true;
    },
    datapush(data, i) {
      let weather = data.weatherElement;
      return {
        location: data.locationName,
        MinT: weather[2].time[i].parameter.parameterName,
        MaxT: weather[3].time[i].parameter.parameterName,
        Wx: weather[0].time[i].parameter.parameterName,
        PoP: weather[1].time[i].parameter.parameterName
      };
    },
    getrouter() {
      if (this.$route.path == "/weather/time1") {
        return this.time1data;
      } else if (this.$route.path == "/weather/time2") {
        return this.time2data;
      } else if (this.$route.path == "/weather/time3") {
        return this.time3data;
      }
    },
    timeactive() {
      let i = parseInt(this.$route.path.substr(13, 1)) - 1;
      return this.timerange[i];
    }
  },
  mounted() {
    this.getWeatherData();
  }
};
</script>
<style lang="scss">
.wetherloading {
  margin: 50px;
}
.navbtn {
  display: flex;
  .timebtn {
    padding: 4px;
    line-height: 22px;
    flex-grow: 1;
    flex-shrink: 1;
    font-size: 22px;
    background-color: #303030;
    color: white;
    text-decoration: none;
  }
  .timebtn:hover {
    background-color: #5e5e5e;
  }
  .timebtnactive {
    background-color: #5e5e5e;
  }
}
</style>
