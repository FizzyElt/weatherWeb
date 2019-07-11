<template>
    <div id="ChartView">
        <div class="ChartSelectList">
            <ul>
                <li>
                    <button @click="ListToggle()" class="RenderBtn">天氣圖表<font-awesome-icon class="Icon" :icon="ShowTimeList===true?'angle-up':'angle-down'"/></button>
                    <ul v-show="ShowTimeList">
                        <li v-for="item in SelectList">
                            <button @click="timechange(item.dataindex)" class="RenderChildBtn">{{item.time}}</button>
                        </li>
                    </ul>
                </li>
                <li>
                    <button class="RenderBtn" @click="AQIChartOpen()">AQI圖表</button>
                </li>
            </ul>
        </div>
        <div class="weatherChartContent" v-show="weatherdataok&&!AQIView">
            <RenderChart :ChartColor="TitleList.MaxT.Color" :CityName="WeatherCityList" :Data="wetherData[TimeRange].MaxT" :title="TitleList.MaxT.name" :MaxValue="TitleList.MaxT.MaxV" :MinValue="TitleList.MaxT.MinV" :ChartId="TitleList.MaxT.id" :ChartWidth="300"></RenderChart>

            <RenderChart :ChartColor="TitleList.MinT.Color" :CityName="WeatherCityList" :Data="wetherData[TimeRange].MinT" :title="TitleList.MinT.name" :MaxValue="TitleList.MinT.MaxV" :MinValue="TitleList.MinT.MinV" :ChartId="TitleList.MinT.id" :ChartWidth="300"></RenderChart>

            <RenderChart :ChartColor="TitleList.PoP.Color" :CityName="WeatherCityList" :Data="wetherData[TimeRange].PoP" :title="TitleList.PoP.name" :MaxValue="TitleList.PoP.MaxV" :MinValue="TitleList.PoP.MinV" :ChartId="TitleList.PoP.id" :ChartWidth="300"></RenderChart>
        
        </div>
        <div class="AQIChartContent" v-show="AQIView&&aqidataok">
            <RenderChart :ChartColor="TitleList.AQI.Color" :CityName="AQIData.CityName" :Data="AQIData.AQIValue" :title="TitleList.AQI.name" :MaxValue="TitleList.AQI.MaxV" :MinValue="TitleList.AQI.MinV" :ChartId="TitleList.AQI.id" :ChartWidth="1000"></RenderChart>
        </div>
    </div>
</template>
<script>
import RenderChart from "../components/RenderChart.vue"
export default {
    components:{
        RenderChart
    },
    data(){
        return{
            weatherdataok:false,
            aqidataok:false,
            AQIView:false,
            TimeRange:0,    //取得時段
            ShowTimeList:false,
            WeatherCityList:[],
            SelectList:[
                {
                    time:'時段一',
                    dataindex:0
                },
                {
                    time:'時段二',
                    dataindex:1
                },
                {
                    time:'時段三',
                    dataindex:2
                }
            ],
            TitleList:{
                MaxT:{
                    id:'ChartMaxT',
                    name:'最高溫度',
                    MaxV:40,
                    MinV:0,
                    Color:'rgba(239, 67, 40,0.8)'
                },
                MinT:{
                    id:'ChartMinT',
                    name:'最低溫度',
                    MaxV:40,
                    MinV:0,
                    Color:'rgba(255, 197, 10,0.8)'
                },
                PoP:{
                    id:'ChartPoP',
                    name:'降雨機率',
                    MaxV:100,
                    MinV:0,
                    Color:'rgba(71, 141, 255,0.7)'
                },
                AQI:{
                    id:'ChartAQI',
                    name:'AQI',
                    MaxV:300,
                    MinV:0,
                    Color:'rgba(67, 183, 0,0.8)'
                }
            },
            wetherData:[
                {
                    MaxT:[],
                    MinT:[],
                    PoP:[]
                },
                {
                    MaxT:[],
                    MinT:[],
                    PoP:[]
                },
                {
                    MaxT:[],
                    MinT:[],
                    PoP:[]
                },
            ],
            AQIData:{
                CityName:[],
                AQIValue:[]
            }
        };
    },
    computed:{
    },
    methods:{
        getWeatherData(){
            this.axios.get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-7119ECA8-257C-4ECF-ADF1-86E97EAE5463&elementName=MaxT&elementName=MinT&elementName=PoP&elementName=Wx").then(result=>{
                //console.log(result.data.records.location);
                let data=result.data.records.location;
                this.WeatherData=data;
                this.WeatherDatafilter(data);
            }).catch(err=>{
                //console.log('geterror');
            })

            
        },
        getAQIData(){
            let aqiurl=`https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json`;
            this.$jsonp(aqiurl, null)
            .then(res => {
                //console.log(res);
                this.AQIDatafilter(res);
            })
            .catch(err => {
            });
        },
        WeatherDatafilter(data){
            this.WeatherCityList=data.map(function(item){
                return item.locationName;
            });
            for(let i=0;i<3;i++){
                this.wetherData[i].MaxT=data.map(function(item){
                    let ValueCheck=item.weatherElement.find(function(item){
                        return item.elementName==='MaxT'
                    });
                   return ValueCheck.time[i].parameter.parameterName;
                });
                this.wetherData[i].MinT=data.map(function(item){
                     let ValueCheck=item.weatherElement.find(function(item){
                        return item.elementName==='MinT'
                    });
                   return ValueCheck.time[i].parameter.parameterName;
                });
                this.wetherData[i].PoP=data.map(function(item){
                    let ValueCheck=item.weatherElement.find(function(item){
                        return item.elementName==='PoP'
                    });
                   return ValueCheck.time[i].parameter.parameterName;
                });
            }
            this.weatherdataok=true;
        },
        AQIDatafilter(data){
            this.AQIData.CityName=data.map(function(item){
                return item.County+' '+item.SiteName;
            });
            this.AQIData.AQIValue=data.map(function(item){
                return item.AQI===''?'0':item.AQI;
            })
            this.aqidataok=true;
        },
        timechange(index){
            this.TimeRange=index;
            this.AQIView=false;
        },
        ListToggle(){
            this.ShowTimeList=!this.ShowTimeList;
        },
        AQIChartOpen(){
            
            this.AQIView=true;
        }
    },
    mounted(){
        this.getWeatherData();
        this.getAQIData();
    },
    created(){
        
    }
}
</script>
<style lang="scss">
#ChartView{
    display: flex;
    justify-content: space-between;
}
.ChartSelectList{
    border-right: 3px solid rgb(153, 153, 153);
    ul{
        list-style: none;
    }
    li{
        width: 300px;
        
    }
    button{
        width: 300px;
        font-size: 21px;
        border:none;
        border-bottom: 2px solid rgb(158, 158, 158);
    }
    .RenderBtn{
        height: 50px;
        //background-color: rgb(253, 253, 253);
        background-image: linear-gradient(rgb(255,255,255),rgb(224, 224, 224));
        .Icon{
            margin-left: 8px;
        }
    }
    .RenderBtn:active{
         background-image: linear-gradient(rgb(243, 243, 243),rgb(202, 202, 202));
    }
    .RenderChildBtn{
        height: 35px;
        background-color: rgb(245, 245, 245);
        transition: 0.1s;
    }
    .RenderChildBtn:hover{
        background-color:rgb(82, 82, 82);
        color: rgb(255, 255, 255);
    }
}
.weatherChartContent{
    position: relative;
    margin: auto;
    margin-bottom: 200px;
    display: flex;
    flex-wrap: wrap;
}
.AQIChartContent{
   position: relative;
   margin: auto;
   margin-bottom: 200px;
   display: flex;
}
</style>
