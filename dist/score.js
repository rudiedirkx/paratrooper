import Canvas from "./canvas.js";
export default class Score {
    constructor(canvas) {
        this.canvas = canvas;
        this.add = (amount) => {
            this.score = this.score + amount;
        };
        this.subtract = (amount) => {
            this.score = this.score - amount;
            if (this.score < 0) {
                this.score = 0;
            }
        };
        this.run = () => {
            let score = this.score;
            this.canvas.ctx.fillStyle = Canvas.WHITE;
            this.canvas.ctx.font = "48px Courier";
            this.canvas.ctx.textAlign = "left";
            this.canvas.ctx.textBaseline = "top";
            this.canvas.ctx.fillText(`SCORE:${score}`, 20, this.canvas.height - 60);
        };
        this.score = 0;
    }
}
