Page({
  data: {
    desc: "",
    name: "",
    status: "",
    showView: false,
    formTopIndex: [""],
    formBottomIndex: [""],
    property:""
  },
  onLoad: function (options) {
    //获取云端数据库的数据
    const { index:formIndex,name,status,desc,property } = options;
    const formTopIndex =  formIndex?.split('').slice(0,3);
    const formBottomIndex =  formIndex?.split('').slice(3);
    console.log("详情页页面：：",formIndex)
    this.setData({formTopIndex, formBottomIndex,name,desc,status,property})
  },
  //显示Modal
  showModal: function () {
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
  handleSubmit(){
    this.setData({
      showView: !this.data.showView,
    });
  },
  handleSubmitGoback(){
 wx.navigateBack();
  },
  isClearAllDraw() {
    this.setData({
      showView: !this.data.showView,
    });
  },
});
