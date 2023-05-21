enum ConsoleType {
  Pencil = 'pencil',
  rubber = 'rubber',
}

Page({
  canvas: null as any, //画布实例
  ctx: null as any, //画笔实例
  sX: 0, //初始X值
  sY: 0, //初始Y值
  eX: 0, //结束时X值
  eY: 0, //结束时Y值
  pic: [], //保存用户的操作
  timing: 0,
  curveArr: [] as any,
  beginPotin: {} as any,
  points: [] as any,
  data: {
    selected: ConsoleType.Pencil, //选中控制台的类型
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
  onShow: function () {
    wx.hideHomeButton();
  },
  onLoad() {
    setInterval(() => {
      this.timing++;
    })
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
  isClearAllDrawConfirm() {
    this.isClearAllDraw();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  getPxFromCanvas() {
    const res = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    console.log(res, this.canvas.width, this.canvas.height)
    const { data } = res;
    const targetColor = [124, 74, 40, 255]; // 目标颜色
    let count = 0; // 计数器，记录目标颜色的像素数量
    for (let i = 0; i < data.length; i += 4) { // 遍历每个像素点
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (r === targetColor[0] && g === targetColor[1] && b === targetColor[2] && a === targetColor[3]) {
        // 如果当前像素点的颜色值与目标颜色相同，计数器加一
        count++;
      }
    }
    console.log('目标颜色的像素数量：', count);
    return count;

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
    this.setData({ selected: ConsoleType.rubber });
  },

  handlePen() {
    this.setData({ selected: ConsoleType.Pencil });
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
    this.ctx.putImageData(this.pic[i], 0, 0);
  },

  onReady() {
    this.getCanvsDom();
  },
  setMoveTo() {
    this.ctx.moveTo(this.sX, this.sY); //起点
    this.ctx.lineCap = "round"; //设置线条的结束端点样式
    this.ctx.lineJoin = "round"; //设置两条线相交时，所创建的拐角类型
  },

  /* 手指触摸画布开始 */
  drawTouStart(event: any) {
    const pencilColor = this.data.selected === ConsoleType.Pencil ? 'rgba(124, 74, 40,1)' : '#FFFEF7';
    const pencilLineWidth = this.data.selected === ConsoleType.Pencil ? 4 : 20;
    this.setData({
      isPainting: true,
    })
    let change = event.changedTouches[0];
    // this.ctx.beginPath(); //创建一条路径


    // 添加画笔颜色
    this.ctx.strokeStyle = pencilColor;
    this.ctx.lineWidth = pencilLineWidth;
    this.sX = change.x;
    this.sY = change.y;
    this.points.push({ x: change.x, y: change.y })
    // this.setMoveTo();
  },

  drawTouMove(event: any) {
    let change = event.changedTouches[0];
    if (!this.curveArr) this.curveArr = [];// 由于可能未定义 做一个判断
    this.points.push({ x: change.x, y: change.y })

    if (this.points.length > 3) {
      const lastTwoPoints = this.points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = {
        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
      }
      this.drawLine({ x: this.sX, y: this.sY }, controlPoint, endPoint);
      this.sX = endPoint.x;
      this.sY = endPoint.y;
      // beginPoint = endPoint;
    }

  },
  drawLine(beginPoint: any, controlPoint: any, endPoint: any) {
    this.ctx.beginPath();
    this.ctx.moveTo(beginPoint.x, beginPoint.y);
    this.ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
    this.ctx.stroke();
    this.ctx.closePath();
  },
  /* 手指触摸画布结束 */
  drawTouEnd(e: any) {
    let change = e.changedTouches[0];
    const { x, y } = change;
    this.points.push({ x, y });
    if (this.points.length > 3) {
      const lastTwoPoints = this.points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = lastTwoPoints[1];
      this.drawLine({ x: this.sX, y: this.sY }, controlPoint, endPoint);
      this.points = [];
      this.sX = 0;
      this.sY = 0;
    }

  },
  /* 贝塞尔曲线   */
  lineTo2(data: any) {
    let arr = this.curveArr as any;// 重新声明一个变量存储 
    let conNum = arr.length % 2 ? (arr.length + 1) / 2 : arr.length / 2;
    conNum = conNum - 1;
    /* 获取中间那个的数组 */
    this.ctx.lineCap = "round"; //设置线条的结束端点样式
    this.ctx.moveTo(this.sX, this.sY); //起点
    /* 假设 x1，y1 = 起始点； x4，y4 = 用户绘制中间点 ；
       x3，y3 = 结束点； x2，y2 = 贝塞尔实际操作点
       x4 = 2 * x2 - (x1 + x3) / 2
       y4 = 2 * y2 - (y1 + y3) / 2
    */
    let x2 = 2 * arr[conNum].x - (this.sX + data.x) / 2;
    let y2 = 2 * arr[conNum].y - (this.sY + data.y) / 2;
    this.ctx.quadraticCurveTo(x2, y2, data.x, data.y);
    this.ctx.stroke();
    this.curveArr = []; //每次结束都清空之前存坐标
  },
  // 点击提交
  handleSubmit() {
    console.log("画布已提交", this.ctx.strokeStyle);
    // 像素数量
    const px = this.getPxFromCanvas();
    wx.navigateTo({
      url: `../loading/index?px=${px}&timing=${this.timing}`,
    });
  },

  clear() { },
});
