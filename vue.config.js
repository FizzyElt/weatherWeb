module.exports={
    publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
    devServer:{
        proxy:{
            '/aqi':{
                target:'https://opendata.epa.gov.tw',
                changeOrigin:true,
                ws:true,
                pathRewrite:{
                    '^/aqi':''
                }
            }
        }
    }
}