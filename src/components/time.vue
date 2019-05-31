<template>
<div>
    <div id="timerangestyle" :style="{'font-size':fontsize}">{{timerange.startTime}}~{{timerange.endTime}}</div>
    <ul class="weatherlist" :style="{'max-width':windowWidth}">
        <li v-for="item in weatherdata">
            <div class="wbox1">
                <h2>{{item.location}}</h2>
                <h3>{{item.MinT}}ºC~{{item.MaxT}}ºC</h3>
            </div>
            <div class="wbox2">
                <h5>{{item.Wx}}</h5>
                <div>
                    <h5>降雨機率</h5>
                    <h3>{{item.PoP}}%</h3>
                </div>
                
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props:['weatherdata','timerange'],
    data(){
        return{
            windowWidth:Math.floor(document.body.clientWidth/280)*280+'px',
            fontsize:Math.floor(document.body.clientWidth/280)*3+10+'px'
        }
    },
    methods:{
        widthchange(){
            this.windowWidth=Math.floor(document.body.clientWidth/280)*280+'px'
            this.fontsize=Math.floor(document.body.clientWidth/280)*3+10+'px'
        }
    },
    created(){
        window.addEventListener('resize',this.widthchange);
        //this.widthchange();
    },
    destroyed(){
        window.releaseEvents('resize',this.widthchange);
    }
}
</script>

<style lang="scss">
    #timerangestyle{
        padding: 3px;
        margin: 8px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.2);
        color: rgb(35, 105, 138);
    }
    .weatherlist{    
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        margin: auto;
        margin-bottom: 50px;
        li{
            width: 270px;
            height: 125px;
            padding: 3px;
            display: flex;
            align-items: stretch;
            margin: 5px;
            border-radius: 8px;
            background-color: rgba(122, 214, 241,0.5);
            cursor: pointer;
            transition: 0.2s;
            .wbox1{
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                >h3{
                    color: rgb(0, 82, 71)
                }
            }
            .wbox2{
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                >h5{
                        font-size: 18px;
                        color: #666666;
                }
                div{
                    color: #336699;
                }
            }
        }
        >li:hover{
            transform: scale(1.05);
        }
    }
</style>
