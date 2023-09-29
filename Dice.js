class Dice {
    faces = [];

    constructor() {
        this.#createFaces();
    }

    roll() {
        // return [0, 6)
        return Math.floor(Math.random() * 6);
    }

    #createFaces() {
        // create elements
        let faces = [];
        for (let i = 0; i < 6; i++) {
            let face = [];
            for (let j = 0; j < 9; j++) {
                // maybe replace period with font awesome circle
                // -- would take some refactoring to do but might look nicer
                let point = document.createElement("div");
                point.setAttribute("class", "die-point off");
                point.textContent = ".";
                face.push(point);
            }
            faces.push(face);
        }

        // set elements
        let pointIndex = [
            [4],                // 1 
            [2, 6],             // 2
            [2, 4, 6],          // 3
            [0, 2, 6, 8],       // 4
            [0, 2, 4, 6, 8],    // 5
            [0, 2, 3, 5, 6, 8]  // 6
        ]
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 9; j++) {
                if (pointIndex[i].includes(j)) {
                    if (faces[i][j].classList.contains("off")) faces[i][j].classList.remove("off");
                    faces[i][j].classList.add("on");
                }
            }
        }
        
        this.faces = [...faces];
    }

}