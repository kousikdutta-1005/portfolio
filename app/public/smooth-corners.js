// Superellipse (squircle) paint worklet — iOS-style continuous corner curves
class SmoothCornersPainter {
  static get inputProperties() {
    return ['--smooth-corners', 'border-radius'];
  }

  superellipse(a, b, nX = 4, nY) {
    if (nY === undefined) nY = nX;
    if (nX > 100) nX = 100;
    if (nY > 100) nY = 100;
    if (nX < 0.00000000001) nX = 0.00000000001;
    if (nY < 0.00000000001) nY = 0.00000000001;
    const m = (4 * a * b) / (a + b);
    const n = Math.min(nX, nY);
    const points = [];
    const step = (2 * Math.PI) / 360;
    for (let theta = 0; theta <= 2 * Math.PI; theta += step) {
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const x = Math.abs(cosT) ** (2 / n) * a * Math.sign(cosT);
      const y = Math.abs(sinT) ** (2 / n) * b * Math.sign(sinT);
      points.push({ x, y });
    }
    return points;
  }

  paint(ctx, size, properties) {
    const smoothness = parseFloat(properties.get('--smooth-corners').toString()) || 4;
    const width = size.width;
    const height = size.height;
    const points = this.superellipse(width / 2, height / 2, smoothness, smoothness);

    ctx.fillStyle = '#000';
    ctx.setTransform(1, 0, 0, 1, width / 2, height / 2);
    ctx.beginPath();
    let first = true;
    for (const p of points) {
      if (first) {
        ctx.moveTo(p.x, p.y);
        first = false;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.closePath();
    ctx.fill();
  }
}

registerPaint('smooth-corners', SmoothCornersPainter);
