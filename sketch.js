function setup() {
  createCanvas(windowWidth, windowHeight);

  this.wanderers = []

  const WANDERER_COUNT = 200
  for(let i = 0; i <= WANDERER_COUNT; i++){
    this.wanderers.push(new Vehicle(createVector(random(windowWidth), random(windowHeight)), 8, 8, 1, 1))
  }
}

function draw() {
  background(220);

  for(let i = 0; i < this.wanderers.length; i++){
    this.wanderers[i].wander()
    this.wanderers[i].update()
    this.wanderers[i].display()
  }

}