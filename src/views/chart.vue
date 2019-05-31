<template>
    <div class="chartcontent">
        <canvas id="fc"></canvas>
    </div>
</template>
<script>
import chartjs from "chart.js"
export default {
    props:{
        
    },
    data(){
        return{

        };
    },
    methods:{
        renderchart(id,data){
            let ctx=id;
            let draw=new chartjs(ctx,{
                type:'bar',
                data:{
                    labels:['1','2','3'],
                    datasets:[{
                        borderWidth:1,
                        data:['5','6','9'],
                    }]
                },
                options:{
                    maintainAspectRatio:false
                }
            });
            return draw;
        }
    },
    mounted(){
        this.renderchart('fc','gtr');
    },
    created(){
        
    }
}
</script>
<style lang="scss">
.chartcontent{
    margin: 10px;
    width: auto;
    #fc{
        

    }
}
</style>
