class Vehicle {
    constructor (location, height, width, maxSpeed, maxForce) {
        this.location = location;
        this.width = width;
        this.height = height;
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce
        this.theta = 0
    }


    addForce (force) {
        this.acceleration.add(force);
    }

    flee (target) {
        let desired = target.sub(this.location);
        desired.normalize();
        desired.mult(-1)
        desired.mult(this.maxSpeed);

        let steer = desired.sub(this.velocity);
        steer.limit(this.maxForce)
        this.addForce(steer);
    }

    seek (target) {
        let desired = target.sub(this.location);
        desired.normalize();
        desired.mult(this.maxSpeed);

        let steer = desired.sub(this.velocity);
        steer.limit(this.maxForce)
        this.addForce(steer);
    }

    wander () {
        const CIRCLE_DIST = 50
        const STEP_SIZE = 0.1
        const RADIUS = 100

        let x = RADIUS * cos(this.theta)
        let y = RADIUS * sin(this.theta)

        let desired = p5.Vector.add(this.location, p5.Vector.mult(p5.Vector.normalize(this.velocity), CIRCLE_DIST))
        
        desired.add(createVector(x,y))

        desired.sub(this.location)
        desired.normalize()
        desired.mult(this.maxSpeed)

        let steer = desired.sub(this.velocity)
        steer.limit(this.maxForce)
        this.addForce(steer)

        this.theta += random(-1, 1) * STEP_SIZE
        
    }

    //in this case target must be another vehicle.
    pursuit (target) {
        let aheadTarget = p5.Vector.add(target.location, p5.Vector.mult(target.velocity, this.maxSpeed * 20))
        let desired =  aheadTarget.sub(this.location)

        desired.normalize()
        desired.mult(this.maxSpeed)

        let steer = desired.sub(this.velocity)
        steer.limit(this.maxForce)
        this.addForce(steer)
    }

    arrive (target) {
        let desired = p5.Vector.sub(target, this.location);

        let d = desired.mag()
        desired.normalize()

        if(d < 100) {
            let m = map(d, 0, 100, 0, this.maxSpeed)
            desired.mult(m)
        } else {
            desired.mult(this.maxSpeed)
        }

        let steer = p5.Vector.sub(desired, this.velocity)
        steer.limit(this.maxForce)
        this.addForce(steer)
    }
    
    update () {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        //Add some drag.
        this.velocity.mult(.99);
    }

    display() {

        if(this.location.x > windowWidth){
            this.location.x = 0
        } else if(this.location.x < 0){
            this.location.x = windowWidth
        }
        if(this.location.y > windowHeight){
            this.location.y = 0
        } else if(this.location.y < 0){
            this.location.y = windowHeight
        }

        let theta = this.velocity.heading() + PI/2;
        fill(175);
        stroke(0);
        push();
        translate(this.location.x,this.location.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.height*2);
        vertex(-this.height, this.height*2);
        vertex(this.height, this.height*2);
        endShape(CLOSE);
        pop();
        stroke(0);
        fill(175);
    }
}