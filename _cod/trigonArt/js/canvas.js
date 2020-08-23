class Canvas {
	constructor(width, height) {
		this.node = document.createElement("canvas");
		this.node.width = width;
		this.node.height = height;
		this.ctx = this.node.getContext("2d");	// getContext() 方法返回一个用于在画布上绘图的环境
		this._imageData = null;
	}

	static empty(cfg) {
			return new this(cfg.width, cfg.height).fill(cfg.fill);
	}

	static original(url, cfg) {
		return new Promise(resolve => {
			let img = new Image();
			img.src = url;
			img.onload = e => {
				let w = img.naturalWidth;
				let h = img.naturalHeight;

				let computeScale = getScale(w, h, cfg.computeSize);
				cfg.width = w / computeScale;
				cfg.height = h / computeScale;

				let viewScale = getScale(w, h, cfg.viewSize);
				cfg.scale = computeScale / viewScale;

				let canvas = this.empty(cfg);
				canvas.ctx.drawImage(img, 0, 0, cfg.width, cfg.height);

				if (cfg.fill == "auto") { cfg.fill = getFill(canvas); }

				resolve(canvas);
			};
		});
	}

	clone() {
		let otherCanvas = new this.constructor(this.node.width, this.node.height);
		otherCanvas.ctx.drawImage(this.node, 0, 0);
		return otherCanvas;
	}

	// 填充特定颜色
	fill(color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.node.width, this.node.height);
		return this;
	}


	getImageData() {
		if (!this._imageData) {	// 提高速度
			this._imageData = this.ctx.getImageData(0, 0, this.node.width, this.node.height);
		}
		return this._imageData;
	}

	difference(otherCanvas) {
		let data = this.getImageData();
		let dataOther = otherCanvas.getImageData();

		return difference(data, dataOther);
	}

	// 计算两个canvas的距离
	distance(otherCanvas) {
		let difference$$1 = this.difference(otherCanvas);
		return differenceToDistance(difference$$1, this.node.width*this.node.height);
	}

  // 获取颜色透明度
	drawStep(step) {
		this.ctx.globalAlpha = step.alpha;
		this.ctx.fillStyle = step.color;
		step.shape.render(this.ctx);
		return this;
	}
}
