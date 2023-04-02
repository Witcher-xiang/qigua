Page({
  onLoad: function (options) {
    const { px, timing } = options;

    wx.cloud
      .callContainer({
        config: {
          env: "prod-4gr001kp2a1d0278",
        },
        path: `/run?nums=${px ?? 1},${timing ?? 2}`,
        header: {
          "X-WX-SERVICE": "flask-yx3w",
        },
        method: "GET",
      })
      .then((res) => {
        // 转二进制，不满6位前面增加0
        console.log(res);
        const { data } = res;
        const status = data["开始"]["状态"];
        const { desc, name,property_name:property, value: index } = data["开始"]["主卦"];
        let formIndex = index.toString(2);
        console.log("formIndex",formIndex);
        wx.navigateTo({
          url: `../result/index?name=${name}&desc=${desc}&status=${status}&property=${property}&index=${this.handleIndex(
            formIndex
          )}`,
        });
      });
  },
  handleIndex: function(formIndex: string): any {
    if (formIndex.length < 6) {
      formIndex = "0" + formIndex;
    } else {
        return formIndex;
    }
    return this.handleIndex(formIndex);
    
  },
});
