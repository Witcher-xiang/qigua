Page({
  data: {
    context: null as any,
    canvasWidth: 0,
    canvasHeight: 0,
    isPainting: false,
    lastX: 0,
    lastY: 0,
    undoList: [] as any
  },

  onReady() {


    wx.createSelectorQuery()
      .select("#myCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const context = canvas.getContext("2d");
        const width = res[0].width;
        const height = res[0].height;

        console.log("context",context)
        this.setData({
          context,
          canvasWidth: width,
          canvasHeight: height
        });
      });
  },

  onTouchStart(event: any) {

    const { x, y } = event.touches[0];
    console.log("onTouchStart",x,y)
    const context = this.data.context!;
    // context.setStrokeStyle('#000000')
    // context.setLineWidth(5)
    // context.setLineCap('round')
    context.moveTo(event.touches[0].x, event.touches[0].y)
    // this.setData({
    //   isPainting: true,
    //   lastX: x,
    //   lastY: y
    // });
  },

  onTouchMove(event: any) {
    // if (!this.data.isPainting) return;

    const { x, y } = event.touches[0];
    console.log("onTouchMove",x,y,event)
    const lastX = this.data.lastX;
    const lastY = this.data.lastY;
    const context = this.data.context!;

    console.log("lastX",lastX)
    console.log("lastY",lastY)
    console.log(context.draw)
    // console.log("context",context)
    context.beginPath();
 

    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();

    this.setData({
      lastX: x,
      lastY: y
    });
  },

  onTouchEnd() {
    if (this.data.isPainting) {
      this.setData({
        isPainting: false,
        undoList: [...this.data.undoList, this.data.context!.getImageData(0, 0, this.data.canvasWidth, this.data.canvasHeight)]
      });
    }
  },

  undo() {
    const context = this.data.context!;
    const undoList = this.data.undoList;
    if (undoList.length === 0) return;

    context.putImageData(undoList[undoList.length - 1], 0, 0);
    undoList.pop();
    this.setData({
      undoList
    });
  },

  clear() {
    const context = this.data.context!;
    context.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
    this.setData({
      undoList: []
    });
  }
});
