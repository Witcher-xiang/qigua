Page({
  data: {
    desc: "",
    name: "",
    status: "",
    showView: false,
    showShareView: false,
    formTopIndex: [""],
    formBottomIndex: [""],
    property: "",
    image: null,
    painting: {},
  },
  onImgOK(e: any) {
    this.setData({
      image: e.detail.path,
    });
  },
  saveImage() {
    if (this.data.image && typeof this.data.image === "string") {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.image!,
      })
        .then(() => {
          wx.showToast({
            title: '保存成功',
          })
        })
        .catch(() => {
          wx.showToast({
            icon: 'error',
            title: '保存失败',
          })
        })
    }
    this.hideModal();
  },
  onReady: function () {
    const commonCss = {
      color: "#7C4A28",
      height: "3px",
    };

    const getShortLine = ({
      id = "line_01",
      direction = "left",
      top = "245rpx",
    }: {
      id: string;
      direction?: "left" | "right";
      top: string;
    }) => ({
      id,
      type: "rect",
      css: {
        ...commonCss,
        width: "12px",

        left: direction === "left" ? "calc(50%-16px)" : "calc(50%-16px+30rpx)",
        top,
      },
    });
 
    const getLongLine = ({
      id = "line_01",
      left =  'calc(50%-16px)',
      top = "265rpx",
    }: {
      id: string;
      left?: string;
      top: string;
    }) => ({
      id,
      type: "rect",
      css: {
        ...commonCss,
        width: "28px",
        left,
        top,
      },
    });

    const renderList = [
      // line_01
      {
        short: [
          getShortLine({
            id: "line_01",
            top: "250rpx",
          }),
          getShortLine({
            id: "line_01",
            direction: "right",
            top: "250rpx",
          }),
        ],
        long: [
          getLongLine({
            id: "line_01",
            top: "250rpx",
          }),
        ],
      },
      // line_02
      {
        short: [
          getShortLine({
            id: "line_02",
            top: "calc(line_01.top+10rpx)",
          }),
          getShortLine({
            direction: "right",
            id: "line_02",
            top: "calc(line_01.top+10rpx)",
          }),
        ],
        long: [
          getLongLine({
            id: "line_02",
            top: "calc(line_01.top+10rpx)",
          }),
        ],
      },
      // line_03
      {
        short: [
          getShortLine({
            id: "line_03",
            top: "calc(line_01.top+20rpx)",
          }),
          getShortLine({
            id: "line_03",
            direction: "right",
            top: "calc(line_01.top+20rpx)",
          }),
        ],
        long: [
          getLongLine({
            id: "line_03",
            top: "calc(line_01.top+20rpx)",
          }),
        ],
      },
      // line_04
      {
        short: [
          getShortLine({
            id: "line_04",
            top: "calc(line_01.top+32rpx)",
          }),
          getShortLine({
            id: "line_04",
            direction: "right",
            top: "calc(line_01.top+32rpx)",
          }),
        ],
        long: [
          getLongLine({
            id: "line_04",
            top: "calc(line_01.top+32rpx)",
          }),
        ],
      },
      // line_05
      {
        short: [
          getShortLine({
            id: "line_05",
            top: "calc(line_01.top+42rpx)",
          }),
          getShortLine({
            id: "line_05",
            direction: "right",
            top: "calc(line_01.top+42rpx)",
          }),
        ],
        long: [
          getLongLine({
            id: "line_05",
            top: "calc(line_01.top+42rpx)",
          }),
        ],
      },
      // line_06
      {
        short: [
          getShortLine({
            id: "line_06",
            top: "calc(line_01.top+52rpx)",
          }),
          getShortLine({
            id: "line_06",
            direction: "right",
            top: "calc(line_01.top+52rpx)",
          }),
        ],
        long: [
          getLongLine({
            id: "line_06",
            top: "calc(line_01.top+52rpx)",
          }),
        ],
      },
    ];

    const formIndex = [...this.data.formTopIndex, ...this.data.formBottomIndex];
    const filterList = renderList.map((item, index) => {
      if (formIndex[index] === "1") return item.long;
      else return item.short;
    });
    console.log("filterList", filterList);
    const paintingArr: any = [];
    filterList.forEach((item) => {
      paintingArr.push(...item);
    });

    this.setData({
      painting: {
        width: "690rpx",
        height: "980rpx",

        views: [
          {
            type: "image",
            url: "../../img/result/img_poster.png",
            css: {
             
              borderRadius: "20rpx",
              width: "650rpx",
              height: "980rpx",
              left:"2%"
            },
          },
          ...paintingArr,
          {
            id: 'text_id_2',
            type: 'text',
            text: '大吉',
            css: [
              {
                top: `400rpx`,
                width: '40rpx',
                color: "#7C4A28",
                textAlign: 'center',
                padding: '10rpx',
              }, {
                fontSize: '50rpx'
              }, { left: 'calc(50%-30rpx)' }],
          },

        ],
      },
    });
  },
  onShareTimeline: function () {
    return {
      title: "游移不定？困惑不决？解疑答惑，赶紧来测一卦！",
      imageUrl: "../../img/result/img_share.png",
    };
  },
  onShareAppMessage: function () {
    return {
      title: "游移不定？困惑不决？解疑答惑，赶紧来测一卦！",
      imageUrl: "../../img/result/img_share.png",
      path: "/pages/home/index",
    };
  },
  onLoad: function (options) {
    //获取云端数据库的数据
    const { index: formIndex, name, status, desc, property } = options;
    const formTopIndex = formIndex?.split("").slice(0, 3);
    const formBottomIndex = formIndex?.split("").slice(3);
    console.log("详情页页面：：", formIndex);
    this.setData({
      formTopIndex,
      formBottomIndex,
      name,
      desc,
      status,
      property,
    });
  },

  //显示分享Modal
  showShareModal: function () {
    this.setData({
      showShareView: true,
    });
  },
  //关闭分享Modal
  hideShareModal: function (e: any) {
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
  handleShare: function () {
    this.hideModal();
  },
  // 保存海报图片
  handleSavePosters: function () {
    this.hideModal();
  },
  getChance: function () {
    this.hideModal();
    this.showShareModal();
  },
  handleSubmit() {
    this.setData({
      showView: !this.data.showView,
    });
  },
  handleSubmitGoback() {
    wx.navigateBack();
  },
  isClearAllDraw() {
    this.setData({
      showView: !this.data.showView,
    });
  },
});
