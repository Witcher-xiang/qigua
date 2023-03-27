Page({
  onLoad() {
    //获取云端数据库的数据
  },
  data: {
    showView: false,
  },
  //显示Modal
  showModal: function () {
    console.log("showModal");
    this.setData({
      showView: true,
    });
  },
  //关闭Modal
  hideModal: function () {
    this.setData({
      showView: false,
    });
  },
  isClearAllDraw() {
    this.setData({
      showView: !this.data.showView,
    });
  },
});
