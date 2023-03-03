class Vehicle {
    constructor (location, height, width, maxSpeed) {
        this.location = location;
        this.width = width;
        this.height = height;
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.maxSpeed = maxSpeed;
    }


    addForce (force) {
        this.acceleration.add(force);
    }

    seek (target) {
        let desired = target.sub(this.location);
        desired.normalize();
        desired.mult(this.maxSpeed);

        let steer = desired.sub(this.velocity);
        this.addForce(steer);

    }

    update () {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        //Add some drag.
        this.velocity.mult(.99);
    }

    display() {
        stroke(0);
        fill(175);

        ellipse(this.location.x, this.location.y, this.height, this.width);
    }
}