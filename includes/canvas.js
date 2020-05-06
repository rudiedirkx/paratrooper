export default class Canvas {

  BASE_WIDTH_HEIGHT = 200;
  WHITE = "#ffffff";
  PINK = '#fe52fc';
  BLACK = '#000000';
  BLUE = '#56faf7';


  constructor() {
    // Select the elements on the page - canvas, reset button.
    const canvas = document.querySelector('#paratrooper');

    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    document.querySelector('#instructions').addEventListener('click', () => { alert('Use arrow keys (left, right and up).') });
  }
  
  // Clear the canvas.
  clear = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // Background color canvas.
  setup = () => {
    this.ctx.fillStyle = this.BLACK;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  

}