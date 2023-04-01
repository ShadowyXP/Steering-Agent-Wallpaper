class FlowField {

    constructor() {
        this.resolution = 10;
        this.cols = width/resolution
        this.rows = height/resolution
        this.field = []

        for(let row = 0; row < this.rows; row++){
            let column = []
            for(let col = 0; col < this.cols; col++){
                column.push(p5.Vector.random2D())
            }
            this.field.push(column)
        }
    }

    lookup(lookup) {
        let column = int(constrain(lookup.x/this.resolution, 0, this.cols - 1));
        let row = int(constrain(lookup.y/this.resolution, 0, this.rows-1))

        return field[row][column].get()
    }

}