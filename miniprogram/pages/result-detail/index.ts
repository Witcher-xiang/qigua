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
    painting: {

    }
  },
  onImgOK(e: any) {

    this.setData({
      image: e.detail.path,
    });

  },
  saveImage() {
    if (this.data.image && typeof this.data.image === 'string') {

      wx.saveImageToPhotosAlbum({
        filePath: this.data.image!,
      });
    }
    this.hideModal();
  },
  onReady: function () {
    // cloud://clouddev-1g0cvf6m39a42001.636c-clouddev-1g0cvf6m39a42001-1316562773/poster/img_cover (1).png	
    const commonCss = {
      color: '#7C4A28', height: '3px',
    }
    const longLine = {
      type: 'rect',
      css: {
        ...commonCss,
        width: '28px',
        left: '344rpx',
        align: 'center',
        top: '140px',
      },
    }
    const shortLineRight = {
      type: 'rect',
      css: {
        ...commonCss,
        width: '13px',
        left: '345rpx',
        top: '145px',
      }

    }
    const shortLineLeft = {
      type: 'rect',
      css: {
        ...commonCss,
        width: '13px',
        left: '315rpx',
        top: '145px',
      }
    }

    const renderList = [
      {

        short: [
          {
            id: "line_01",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: '315rpx',
              top: '265rpx',
            }
          },
          {
            id: "line_01",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: '345rpx',
              top: '265rpx',
            }

          }
        ],
        long: [
          {
            id: "line_01",
            type: 'rect',
            css: {
              ...commonCss,
              width: '28px',
              left: '344rpx',
              align: 'center',
              top: '265rpx',
            },
          }
        ]
      },
      {
        short: [
          {
            id: "line_02",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left)',
              top: 'calc(line_01.top+10rpx)',
            }
          },
          {
            id: "line_02",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left + 25rpx)',
              top: 'calc(line_01.top+10rpx)',
            }

          }
        ],
        long: [
          {
            id: "line_02",
            type: 'rect',
            css: {
              ...commonCss,
              width: '28px',
              left: '344rpx',
              align: 'center',
              top: 'calc(line_01.top+10rpx)',
            },
          }
        ]
      },
      {
        short: [
          {
            id: "line_03",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              // left: '315rpx',
              left: 'calc(line_02.left)',
              top: 'calc(line_01.top+20rpx)',
            }
          },
          {
            id: "line_03",
            type: 'rect',
            css: {

              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left)',
              // left: '345rpx',
              top: 'calc(line_01.top+20rpx)',
            }

          }
        ],
        long: [
          {
            id: "line_03",
            type: 'rect',
            css: {
              ...commonCss,
              width: '28px',
              left: '344rpx',
              align: 'center',
              top: 'calc(line_01.top+20rpx)',
            },
          }
        ]
      },
      {
        short: [
          {
            id: "line_04",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left)',
              top: 'calc(line_01.top+32rpx)',
            }
          },
          {
            id: "line_04",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left + 25rpx)',
              top: 'calc(line_01.top+32rpx)',
            }

          }
        ],
        long: [
          {
            id: "line_04",
            type: 'rect',
            css: {
              ...commonCss,
              width: '28px',
              left: '344rpx',
              align: 'center',
              top: 'calc(line_01.top+32rpx)',
            },
          }
        ]
      },
      {
        short: [
          {
            id: "line_05",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left)',
              top: 'calc(line_01.top+42rpx)',
            }
          },
          {
            id: "line_05",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left + 25rpx)',
              top: 'calc(line_01.top+42rpx)',
            }

          }
        ],
        long: [
          {
            id: "line_05",
            type: 'rect',
            css: {
              ...commonCss,
              width: '28px',
              left: '344rpx',
              align: 'center',
              top: 'calc(line_01.top+42rpx)',
            },
          }
        ]
      },
      {
        short: [
          {
            id: "line_06",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left)',
              top: 'calc(line_01.top+52rpx)',
            }
          },
          {
            id: "line_06",
            type: 'rect',
            css: {
              ...commonCss,
              width: '13px',
              left: 'calc(line_01.left + 25rpx)',
              top: 'calc(line_01.top+52rpx)',
            }

          }
        ],
        long: [
          {
            id: "line_06",
            type: 'rect',
            css: {
              ...commonCss,
              width: '28px',
              left: '344rpx',
              align: 'center',
              top: 'calc(line_01.top+52rpx)',
            },
          }
        ]
      },
    ];

    const formIndex = [...this.data.formTopIndex, ...this.data.formBottomIndex]
    const filterList = renderList.map((item, index) => {
      if (formIndex[index] === "1") return item.long
      else return item.short;

    })
    console.log("filterList", filterList);
    const paintingArr: any = [];
    filterList.forEach(item => {
      paintingArr.push(...item);
    });

    const doubleContent = [shortLineLeft, shortLineRight]
    this.setData({
      painting: {
        width: '690rpx',
        height: '1040rpx',

        views: [
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
          ...paintingArr,
          // longLine,
          // ...doubleContent,
          // {
          //   id: 'text_id_2',
          //   type: 'text',
          //   text: '大吉',
          //   css: [
          //     {
          //     top: `400rpx`,
          //     align: 'center',
          //     width: '40rpx',

          //     textAlign: 'center',
          //     padding: '10rpx',

          //   },  {left: `${23}rpx`,
          //   fontSize: '40rpx'}, { left: '340rpx'}],
          // },
          // {
          //   type: 'rect',
          //   css: {
          //     width: '20rpx',
          //     height: '20rpx',
          //     color: '#7C4A28',
          //     left: '200rpx',
          //     top: 'calc(text_id_2.bottom + 20rpx)',
          //   },
          // },
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
    const { index: formIndex, name, status, desc, property } = options;
    const formTopIndex = formIndex?.split('').slice(0, 3);
    const formBottomIndex = formIndex?.split('').slice(3);
    console.log("详情页页面：：", formIndex)
    this.setData({ formTopIndex, formBottomIndex, name, desc, status, property })
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
