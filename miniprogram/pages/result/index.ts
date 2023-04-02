Page({
  data: {
    formIndex: "",
    desc: "",
    name: "",
    status: "",
    property:''
  },
  onLoad: function (options) {
    console.log(options);
    const { formIndex, desc, name, status,property } = options;
    this.setData({
      formIndex,
      desc,
      name,
      status,
      property
    });
  },
  handleSubmit() {
    wx.navigateTo({
      url: "../result-detail/index",
    });
  },
});
