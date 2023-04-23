Page({
  data: {
    desc: "",
    name: "",
    status: "",
    showView: false,
    showShareView: false,
    formTopIndex: [""],
    formBottomIndex: [""],
    property:"",
    painting:{
      
    }
  },
  onImgOK(e:any) {
    // this.imagePath = e.detail.path;
    this.setData({
      image: e.detail.path,
    });
    // if (this.isSave) {
    //   this.saveImage(this.imagePath);
    // }
  },
  onReady:function(){
    // cloud://clouddev-1g0cvf6m39a42001.636c-clouddev-1g0cvf6m39a42001-1316562773/poster/img_cover (1).png	
    this.setData({
      painting:{
        width: '690rpx',
        height: '1040rpx',
     
        views:[
          {
            type: 'image',
            url: '../../img/result/img_poster.png',
            css: {
              top: '0rpx',
              borderRadius: '20rpx',
              // borderWidth: '5rpx',
              // borderColor: 'rgb(255,253,226)',
          
              width: '690rpx',
              height: '1040rpx',
            },
          },
          {
            id: 'text_id_2',
            type: 'text',
            text: '我是把width设置为400rpx后，我就换行了xx行了',
            css: [{
              top: `230rpx`,
              align: 'center',
              width: '400rpx',
      
              textAlign: 'center',
              padding: '10rpx',
       
            },  {left: `${23}rpx`,
            fontSize: '40rpx'}, { left: '300rpx' }],
          },
        ]
      }
    })
  },
  onShareTimeline: function () {
   
    return {
      title: '游移不定？困惑不决？解疑答惑，赶紧来测一卦！',
      imageUrl: '../../img/result/img_share.png',
    }
  },
  onShareAppMessage: function () {


    return {
      title: '游移不定？困惑不决？解疑答惑，赶紧来测一卦！',
      imageUrl: '../../img/result/img_share.png',
      path: '/pages/home/index',

    }
  },
  onLoad: function (options) {
    //获取云端数据库的数据
    const { index:formIndex,name,status,desc,property } = options;
    const formTopIndex =  formIndex?.split('').slice(0,3);
    const formBottomIndex =  formIndex?.split('').slice(3);
    console.log("详情页页面：：",formIndex)
    this.setData({formTopIndex, formBottomIndex,name,desc,status,property})
  },

  //显示分享Modal
  showShareModal: function () {
    this.setData({
      showShareView: true,
    });
  },
  //关闭分享Modal
  hideShareModal: function (e:any) {

    this.setData({
      showShareView: false,
    });
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
  // 点击分享
  handleShare: function(){
    this.hideModal();
  },
  // 保存海报图片
  handleSavePosters: function(){
    this.hideModal();
  },
  getChance: function(){
    this.hideModal();
    this.showShareModal();
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
