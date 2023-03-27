Page({
  canvas: null as any, //画布实例
  ctx: null as any, //画笔实例
  sX: 0, //初始X值
  sY: 0, //初始Y值
  eX: 0, //结束时X值
  eY: 0, //结束时Y值
  pic: [], //保存用户的操作
  data: {
    selected: "pen", //选中控制台的类型
    showView: false,
    context: null as any,
    canvasWidth: 0,
    canvasHeight: 0,
    width: 0, // canvas的width
    height: 0, // canvas的height
    widthP: 0.5, //设备宽对比375 比例
    imgInfo: {}, //图片信息
    isPainting: false,
    picIndex: -1, //当前的pic操作下标
    picLength: 0, //当前记录画布数组的长度
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

  isClearAllDraw() {
    this.setData({
      showView: !this.data.showView,
    });
  },

  /* 获取canvas节点 */
  getCanvsDom() {
    wx.createSelectorQuery()
      .in(this)
      .select("#myCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const context = canvas.getContext("2d");
        const width = res[0].width;
        const height = res[0].height;

        canvas.width = "320";
        canvas.height = "470";
        this.canvas = canvas;
        this.ctx = context;
        this.copyCanvas();
      });
  },

  /* 复制画布  */
  copyCanvas() {
    let arr = (this.pic || []) as any;
    /* 用户撤销后对画布进行了操作，要移除数组 */
    if (this.data.picIndex < arr.length - 1) {
      arr.splice(this.data.picIndex + 1);
    }
    /* 给数组添加当前画布 */
    arr.push(
      this.ctx.getImageData(
        0,
        0,
        this.canvas.width as any,
        this.canvas.height as any
      )
    );

    /* 赋值全局 */
    this.pic = arr;
    /* 操作下标累加 */
    this.data.picIndex++;
    /* 修改视图层按钮 */
    this.setData({
      picIndex: this.data.picIndex,
      picLength: arr.length,
    });
  },

  /* 撤销点击事件 */
  handleBack() {
    console.log("this.pic.length ", this.pic.length);
    if (this.pic.length < 2) return;
    this.data.picIndex--;
    this.setData({ picIndex: this.data.picIndex });
    this.pasteCopy(); //粘贴上一步操作
  },
  /* 恢复点击事件 */
  handleGo() {
    if (this.data.picLength - 1 <= this.data.picIndex) return;
    this.data.picIndex++;
    this.setData({ picIndex: this.data.picIndex });
    this.pasteCopy(); //粘贴上一步操作
  },
  /* 橡皮点击事件 */
  handleRubber() {
    if (this.ctx.strokeStyle === "#FFFFFF") return;
    this.ctx.strokeStyle = "#FFFFFF";
    // this.data.console[1].content.forEach((v) => (v.show = false));
    this.setData({ selected: "rubber" });
  },

  handlePen(){
    this.setData({ selected: "pen" });
  },

  /* 清空点击事件 */
  handleRemove() {
    this.pic.splice(1);
    this.setData({ picIndex: 0, picLength: 1 });
    this.pasteCopy(); //清空后粘贴操作
  },
  /* 粘贴复制的某个画布 */
  pasteCopy() {
    let i = this.data.picIndex;
    console.log("这里的", i, this.pic);
    this.ctx.putImageData(this.pic[i], 0, 0);
  },

  onReady() {
    this.getCanvsDom();
    this.initPencil();
  },
  lineDraw(data: any) {
    this.ctx.lineTo(data.x, data.y);
    this.ctx.stroke();
  },
  initPencil() {
    /* 设置线宽 */
    // this.ctx.setLineDash([0]);
    // this.lineType = this.data.console[0].content[i].type;
    // this.ctx.strokeStyle = this.data.console[1].content[i].color;
  },

  /* 手指触摸画布开始 */
  drawTouStart(event: any) {
    this.setData({
      isPainting: true,
    })
    let change = event.changedTouches[0];

    this.ctx.beginPath(); //创建一条路径
    this.sX = change.x;
    this.sY = change.y;
    // context.setStrokeStyle('#000000')
    // context.setLineWidth(5)
  },

  drawTouMove(event: any) {
    let change = event.changedTouches[0];

    this.lineDraw(change);
  },
  /* 手指触摸画布结束 */
  drawTouEnd(e: any) {
    let data = e.changedTouches[0];
    this.lineDraw(data);
    this.ctx.closePath(); //当鼠标移抬起时,创建从当前点回到起始点的路径
    this.copyCanvas(); //每次结束都复制本次画布结果
  },
  // 点击提交
  handleSubmit() {
    console.log("111");
    wx.navigateTo({
      url: "../loading/index",
    });
  },

  clear() {},
});
