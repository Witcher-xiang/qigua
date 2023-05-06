Page({
  px: "1",
  timing: "2",
  data:{
    hasServerError: false,
  },

  onLoad: function (options) {
    const { px, timing } = options;
    this.px = px ?? "1";
    this.timing = timing ?? "2";
    this.fetchResult();
  },
  // 将二进制转换为6位
  fillSixBit: function (formIndex: string): any {
    if (formIndex.length < 6) {
      formIndex = "0" + formIndex;
    } else {
      return formIndex;
    }
    return this.fillSixBit(formIndex);
  },
  fetchResult: function () {
    wx.cloud
      .callContainer({
        config: {
          env: "prod-4gr001kp2a1d0278",
        },
        path: `/run?nums=${this.px},${this.timing}`,
        header: {
          "X-WX-SERVICE": "flask-yx3w",
        },
        method: "GET",
      })
      .then((res) => {
        // 转二进制，不满6位前面增加0
        console.log("请求数据结果:", res);
        const { data } = res;
        const status = data["开始"]["状态"];
        const {
          desc,
          name,
          property_name: property,
          value: index,
        } = data["开始"]["主卦"];
        let formIndex = index.toString(2);
        this.data.hasServerError = false;
        wx.navigateTo({
          url: `../result/index?name=${name}&desc=${desc}&status=${status}&property=${property}&index=${this.fillSixBit(
            formIndex
          )}`,
        });
      })
      .catch((err)=>{
        this.data.hasServerError = true;
        wx.showModal({
          title: '提示',
          content: '服务出了些小问题，请点击重试',
        })
      })
      
  },
});
