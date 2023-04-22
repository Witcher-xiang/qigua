Page({
  data: {
    formIndex: "",
    desc: "",
    name: "",
    status: "",
    property: '',
    formIndexBottom: [""],
    formIndexTop: [""]
  },
  onLoad: function (options) {
    
    const { index: formIndex, desc, name, status, property } = 
    options;
    console.log("详情页：",formIndex)
    this.setData({
      formIndex: formIndex,
      formIndexTop: formIndex?.split('').slice(0, 3),
      formIndexBottom: formIndex?.split('').slice(3),
      desc,
      name,
      status,
      property
    });
  },
  handleSubmit() {
    const { desc, formIndex, status, name, property } = this.data;
    wx.navigateTo({
      url: `../result-detail/index?index=${formIndex}&desc=${desc}&status=${status}&name=${name}&property=${property}`,
    });
  },
});
