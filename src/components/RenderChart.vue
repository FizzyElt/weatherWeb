<template>
    <div class="ChartBox">
        <canvas :id="ChartId"></canvas>
    </div>
</template>

<script>
import chartjs from "chart.js"
import { type } from 'os';
export default {
    props:{
        CityName:{      //資料名稱列
            type:Array,
            default:null,
            required:true
        },              //資料數值列
        Data:{
            type:Array,
            default:null,
            required:true
        },
        title:{         //數值名稱
            type:String,
            default:null,
            required:true
        },
        MaxValue:{      //圖表最大值
            type:Number,
            default:null,
            required:true
        },
        MinValue:{      //圖表最小值
            type:Number,
            default:null,
            required:true
        },
        ChartId:{       //圖表id
            type:String,
            default:null,
            required:true
        },
        ChartColor:{
            type:String,
            dafault:null,
            required:true
        },
        ChartWidth:{
            type:Number,
            dafault:null,
            required:true
        }
    },
    data(){
        return{
            renderOK:false,
            chart:null
        }
    },
    methods:{
        isRenderOK(){
            if(this.chart===null){
                this.renderOK=false;
            }else{
                this.renderOK=true;
            }
        },
        render(title,value,list,MaxV,MinV,id,color,w){   //繪出圖表
            let ctx=document.getElementById(id);
            let l=list.length;
            ctx.height=25*l;
            ctx.width=w;
            let content={
                type:'horizontalBar',
                data:{
                    labels:list,
                    datasets:[{
                        borderWidth:1,
                        data:value,
                        backgroundColor:color,
                        label:title
                    }]
                },
                options:{
                    maintainAspectRatio:false,
                    responsive:false,
                    scales:{
                        xAxes:[{
                            ticks:{
                                min:MinV,
                                max:MaxV
                            },
                            maxBarThickness:100
                        }]
                    }
                }
            };
            this.chart=new chartjs(ctx,content);
            this.renderOK=true;
        },
        chartclear(){         //清除圖表
            this.chart.destroy();
        }
    },
    watch:{
        Data:{
            //immediate:true 包括初始改變的監聽
            deep:true,
            handler(val,oldval){
                this.chartclear();
                this.render(this.title,val,this.CityName,this.MaxValue,this.MinValue,this.ChartId,this.ChartColor,this.ChartWidth);
                
            }
        }
    },
    mounted(){
        this.render(this.title,this.Data,this.CityName,this.MaxValue,this.MinValue,this.ChartId,this.ChartColor,this.ChartWidth);

    }
}
</script>

<style lang="scss">
    .ChartBox{
        //height: 1200px;
        //position: relative;
        //height: 1500px;
        //width: 400px;
    }
</style>
