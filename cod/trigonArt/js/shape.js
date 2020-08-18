class Shape {
	static randomPoint(width, height) {
		return [~~(Math.random()*width), ~~(Math.random()*height)];	// 取整
	}

	static create(cfg) {
		let ctors = cfg.shapeTypes;
		let index = ~~(Math.random() * ctors.length);	// 0
		let ctor = ctors[index];
		return new ctor(cfg.width, cfg.height);
	}

	constructor(w, h) {
		this.bbox = {};
	}

	mutate(cfg) { return this; }


	/* get a new smaller canvas with this shape */
	rasterize(alpha) {
		let canvas = new Canvas(this.bbox.width, this.bbox.height);
		let ctx = canvas.ctx;
		ctx.fillStyle = "#000";
		ctx.globalAlpha = alpha;
		ctx.translate(-this.bbox.left, -this.bbox.top);
		this.render(ctx);
		return canvas;
	}

	render(ctx) {}
}

class Polygon extends Shape {
	constructor(w, h, count) {
		super(w, h);

		this.points = this._createPoints(w, h, count);
		this.computeBbox();
	}

	render(ctx) {
		ctx.beginPath();
		this.points.forEach(([x, y], index) => {
			if (index) {
				ctx.lineTo(x, y);
			} else {
				ctx.moveTo(x, y);
			}
		});
		ctx.closePath();
		ctx.fill();
	}


	mutate(cfg) {
		let clone = new this.constructor(0, 0);
		clone.points = this.points.map(point => point.slice());

		let index = Math.floor(Math.random() * this.points.length);
		let point = clone.points[index];

		let angle = Math.random() * 2 * Math.PI;
		let radius = Math.random() * 20;
		point[0] += ~~(radius * Math.cos(angle));
		point[1] += ~~(radius * Math.sin(angle));

		return clone.computeBbox();
	}

	computeBbox() {
		let min = [
			this.points.reduce((v, p) => Math.min(v, p[0]), Infinity),
			this.points.reduce((v, p) => Math.min(v, p[1]), Infinity)
		];
		let max = [
			this.points.reduce((v, p) => Math.max(v, p[0]), -Infinity),
			this.points.reduce((v, p) => Math.max(v, p[1]), -Infinity)
		];

		this.bbox = {
			left: min[0],
			top: min[1],
			width: (max[0]-min[0]) || 1, /* fallback for deformed shapes */
			height: (max[1]-min[1]) || 1
		};

		return this;
	}

	_createPoints(w, h, count) {
		let first = Shape.randomPoint(w, h);
		let points = [first];

		for (let i=1;i<count;i++) {
			let angle = Math.random() * 2 * Math.PI;
			let radius = Math.random() * 20;
			points.push([
				first[0] + ~~(radius * Math.cos(angle)),
				first[1] + ~~(radius * Math.sin(angle))
			]);
		}
		return points;
	}
}

class Triangle extends Polygon {
	constructor(w, h) {
		super(w, h, 3);
	}
}
