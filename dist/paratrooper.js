import Canvas from "./canvas.js";
import Barrel from "./barrel.js";
import Turret from "./turret.js";
import FlightController from "./flight-controller.js";
import FPS from "./fps.js";
export default class Paratrooper {
    constructor() {
        this.MAX_FPS = 60;
        // Draw all the things.
        // TODO: later on, we will probably just loop through all our objects 
        // and call the draw() function.
        this.drawLoop = () => {
            let now = performance.now();
            let elapsed = now - this.lastUpdate;
            // We want to set a max FPS otherwise the game will run faster on 
            // superfast computers. It still will run (a bit) slower on machines 
            // which can't handle the desired FPS.
            if (elapsed > this.fpsInterval) {
                this.canvas.clear();
                this.canvas.setup();
                this.barrel.draw();
                this.turret.draw();
                this.flightController.run();
                this.fps.showFPS();
                this.lastUpdate = now - (elapsed % this.fpsInterval);
            }
            window.requestAnimationFrame(this.drawLoop);
        };
        this.canvas = new Canvas;
        // Simple dependency injection will do for now.
        // Might do proper DI later with a container.
        // Example: https://dev.to/azure/dependency-injection-in-javascript-101-2b1e
        this.turret = new Turret(this.canvas);
        this.flightController = new FlightController(this.canvas);
        this.barrel = new Barrel(this.canvas, this.turret, this.flightController);
        // This shows the FPS on screen.
        this.fps = new FPS(this.canvas);
        this.lastUpdate = performance.now();
        this.fpsInterval = Math.round(1000 / this.MAX_FPS);
        window.requestAnimationFrame(this.drawLoop);
    }
}
new Paratrooper;
