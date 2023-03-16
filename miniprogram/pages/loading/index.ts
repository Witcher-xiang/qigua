
Page({
    onLoad() {
        setTimeout(()=>{
            // 跳转到结果页面
            wx.navigateTo({
                url: '../result/index',
              })
        },3000)
    },
})