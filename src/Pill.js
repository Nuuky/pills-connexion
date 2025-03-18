import { randomNumber, map } from "./utils";

export default class Pill {
  constructor(width, height, min, max) {
    this.pos = {
      x: randomNumber(0, width),
      y: randomNumber(0, height),
    };
    this.vel = {
      x: this.constructor.getRandomVel(min, max),
      y: this.constructor.getRandomVel(min, max),
    };
    this.r =
      Math.abs(max - (Math.abs(this.vel.x) + Math.abs(this.vel.y)) / 2) / min;
    this.distance = 150;
    this.collided = false;
    this.connexions = [];
  }

  update(delta, pills, ctx, id) {
    this.checkCollision(ctx);
    // if (id === 0) console.log(this.vel);
    this.pos.x += (this.vel.x / 1000) * delta;
    this.pos.y += (this.vel.y / 1000) * delta;
    this.checkNearPills(pills, ctx, id);
  }

  checkCollision(ctx) {
    if (this.pos.x - this.r <= -50 && this.vel.x < 0) this.vel.x = -this.vel.x;
    else if (this.pos.x + this.r >= ctx.canvas.width + 50 && this.vel.x > 0)
      this.vel.x = -this.vel.x;
    if (this.pos.y - this.r <= -50 && this.vel.y < 0) this.vel.y = -this.vel.y;
    else if (this.pos.y + this.r >= ctx.canvas.height + 50 && this.vel.y > 0)
      this.vel.y = -this.vel.y;
  }

  checkNearPills(pills, ctx, id) {
    // if (i === 0) console.log("in");
    // for (let i = 0; i < pills.length; i++) {
    //   const pill = pills[i];
    //   if (pill === this) continue;

    // const a = this.pos.x - pill[].pos.x;
    // const b = this.pos.y - pill.pos.y;
    // const d = Math.sqrt(a * a + b * b);
    // const alpha = 0.9 - map(d, 0, this.distance, 0, 0.9, true);
    //   if (d <= this.r + pill.r) {
    //     this.collided = true;
    //     return;
    //   }
    // }

    for (let j = id + 1; j < pills.length; j++) {
      const a = pills[id].pos.x - pills[j].pos.x;
      const b = pills[id].pos.y - pills[j].pos.y;
      const d = Math.sqrt(a * a + b * b);
      // if (j === 1) console.log(d <= this.r)
      if (d <= this.distance) {
        this.connexions.push([pills[j], d]);
        // this.collided = true;
      }
    }
  }

  display(ctx) {
    this.connexions.forEach(([pill, d]) => {
      const alpha = 0.9 - map(d, 0, this.distance, 0, 0.9, true);
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(pill.pos.x, pill.pos.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.stroke();
      ctx.closePath();
    });
    this.connexions = [];
    ctx.fillStyle = this.collided ? "red" : "white";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.collided = false;
  }

  static getRandomVel(min, max) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    return dir * randomNumber(min, max);
  }
}
