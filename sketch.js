function setup() {
  createCanvas(windowWidth, windowHeight);

  this.vehicle = new Vehicle(createVector(200, 200), 16, 16, 1);
}

function draw() {
  background(220);

  this.vehicle.seek(createVector(mouseX, mouseY));
  this.vehicle.update();
  this.vehicle.display();
  
}