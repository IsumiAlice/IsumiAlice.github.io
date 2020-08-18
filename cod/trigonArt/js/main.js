function getConfig() {
	let cfg = {};
	cfg["computeSize"] = 256;		// 计算时将原图缩放
	cfg["viewSize"] = 1024;			// 输出的尺寸
	cfg["steps"] = 1500;					// 主循环次数
	cfg["shapes"] = 1000;				// 每次循环随机生成的多边形数目
	cfg["alpha"] = 0.5;					// 透明度
	cfg["mutations"] = 30;			// 变异次数
	cfg["mutateAlpha"] = true;	// 透明度变异
	cfg.shapeTypes = [Triangle];// to be continued
	cfg.fill = "auto";
	return cfg;
}

class State {
	constructor(target, canvas, distance = Infinity) {
		this.target = target;
		this.canvas = canvas;
		this.distance = (distance == Infinity ? target.distance(canvas) : distance);
	}
}

class Step {
	constructor(shape, cfg) {
		this.shape = shape;
		this.cfg = cfg;
		this.alpha = cfg.alpha;

		this.color = "#e4f0f9";	// 初始化什么都行
		this.distance = Infinity;
	}


	// 应用 this step 返回一个新的 state
	apply(state) {
		let newCanvas = state.canvas.clone().drawStep(this);
		return new State(state.target, newCanvas, this.distance);
	}

	// 计算 this step 的颜色和距离
	compute(state) {
		let pixels = state.canvas.node.width * state.canvas.node.height;
		let offset = this.shape.bbox;

		let imageData = {
			shape: this.shape.rasterize(this.alpha).getImageData(),
			current: state.canvas.getImageData(),
			target: state.target.getImageData()
		};

		let {color, differenceChange} = computeColorAndDifferenceChange(offset, imageData, this.alpha);
		this.color = color;
		let currentDifference = distanceToDifference(state.distance, pixels);
		if (-differenceChange > currentDifference) debugger;
		this.distance = differenceToDistance(currentDifference + differenceChange, pixels);

		return Promise.resolve(this);
	}

	// 变异
	mutate() {
		let newShape = this.shape.mutate(this.cfg);	// 形状变异
		let mutated = new this.constructor(newShape, this.cfg);
		if (this.cfg.mutateAlpha) {
			mutated.alpha = clamp(this.alpha + (Math.random()-0.5) * 0.08, 0.1, 1);	// 改变透明度
		}
		return mutated;
	}
}

class Optimizer {
	constructor(original, cfg) {
		this.cfg = cfg;
		this.state = new State(original, Canvas.empty(cfg));
		this._steps = 0;	// 当前循环次数
		this.onStep = () => {};
	}

// 主循环
	start() {
		this._addShape();
	}

	_addShape() {
		// 随机生成图形，选择best的，进行微小的变异
		this._findBestStep().then(step => this._optimizeStep(step)).then(step => {
			this._steps++;
			if (step.distance < this.state.distance) { // better than current state
				this.state = step.apply(this.state);
				this.onStep(step);
			} else {
				this.onStep(null);
			}
			this._continue();
		});
	}

	_continue() {
		if (this._steps < this.cfg.steps) {
			// this._addShape();
			setTimeout(() => this._addShape(), 10);	// 实时显示
		} else {	// 结束
			console.log("finished")
		}
	}

	_findBestStep() {
		const LIMIT = this.cfg.shapes;	// 限制每次生成的多边形数

		let bestStep = null;
		let promises = [];

		for (let i=0;i<LIMIT;i++) {
			let shape = Shape.create(this.cfg);

			let promise = new Step(shape, this.cfg).compute(this.state).then(step => {
				if (!bestStep || step.distance < bestStep.distance) {
					bestStep = step;
				}
			});
			promises.push(promise);
		}

		return Promise.all(promises).then(() => bestStep);
	}

	_optimizeStep(step) {
		const LIMIT = this.cfg.mutations;	// 突变尝试

		let totalAttempts = 0;
		let successAttempts = 0;
		let failedAttempts = 0;
		let resolve = null;
		let bestStep = step;
		let promise = new Promise(r => resolve = r);

		let tryMutation = () => {
			if (failedAttempts >= LIMIT) {
				return resolve(bestStep);
			}

			totalAttempts++;
			bestStep.mutate().compute(this.state).then(mutatedStep => {
				if (mutatedStep.distance < bestStep.distance) {	//突变成功
					successAttempts++;
					failedAttempts = 0;
					bestStep = mutatedStep;
				} else {
					failedAttempts++;
				}

				tryMutation();
			});
		};

		tryMutation();
		return promise;
	}
}

const nodes = {
	output: document.querySelector("#output"),
	original: document.querySelector("#original"),
	raster: document.querySelector("#raster"),
};


function go(original, cfg) {
	nodes.original.appendChild(original.node);	// 显示原图

	let optimizer = new Optimizer(original, cfg);

	let cfg1 = Object.assign({}, cfg, {width:cfg.scale*cfg.width, height:cfg.scale*cfg.height});	// 合并
	let result = Canvas.empty(cfg1);
	result.ctx.scale(cfg.scale, cfg.scale);
	nodes.raster.appendChild(result.node);

	// 主循环
	optimizer.onStep = (step) => {
		if (step) {
			result.drawStep(step);
		}
	};

	optimizer.start();
}

function onSubmit(e) {
	e.preventDefault();	// 阻止继续提交

	let url = URL.createObjectURL(document.querySelector("input[type=file]").files[0]);		// 读取文件
	let cfg = getConfig();	// 获取自定义配置

	Canvas.original(url, cfg).then(original => go(original, cfg));	// 创建初始画布，开始主循环程序
}

function main() {
	document.querySelector("form").addEventListener("submit", onSubmit);	// 监听事件
}

main();
