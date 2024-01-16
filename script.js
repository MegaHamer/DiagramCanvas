var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 768;
const sizes = {
    width: canvas.width,
    height: canvas.height
};
window.addEventListener("resize", event => {
    sizes.width = canvas.width;
    sizes.height = canvas.height;
    console.log(sizes)
})
ctx.lineWidth = 10;
ctx.strokeRect(0, 0, sizes.width, sizes.height - 2);

const dataInputs = {
    score: 2,
    count: 0
}
const updInput = () => {
    dataInputs.score = document.getElementById("score").value;
    dataInputs.count = document.getElementById("count").value;
}
class diagram {
    #ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.#ctx = canvas.getContext("2d");
        this.data = {};
    }
    #empty() {
        let result = true;
        for (const element in this.data) {
            if (this.data[element] != 0) result = false;
        }
        return result
    }
    draw() {
        this.#ctx.font = "5rem serif";
        this.#ctx.fillText("Успеваемость студентов", sizes.width / 2 - 250, 16*5, 500);
        if (this.#empty()) {
            this.#ctx.beginPath();
            this.#ctx.arc(sizes.width / 2, sizes.height / 2, Math.min(sizes.width, sizes.height) / 3, 2 * Math.PI, 0);
            this.#ctx.stroke();
            console.log("draw")
        }
    }
    clear() {
        this.#ctx.clearRect(0, 0, sizes.width, sizes.height);
        ctx.strokeRect(0, 0, sizes.width, sizes.height);
    }
}
const diag = new diagram(canvas);

const add = () => {
    updInput();
    if (diag.data[dataInputs.score] == null) {
        diag.data[dataInputs.score] = Number(dataInputs.count)
    }
    else {
        diag.data[dataInputs.score] += Number(dataInputs.count)
    }
    console.log(diag);
}
const remove = () => {
    updInput();
    if (diag.data[dataInputs.score] != null) {
        diag.data[dataInputs.score] -= Number(dataInputs.count);
    }
    if (diag.data[dataInputs.score] < 0) {
        diag.data[dataInputs.score] = 0;
    }
    console.log(diag);
}
const clearDiag = () => {
    for (const element in diag.data) {
        diag.data[element] = 0;
    }
    console.log(diag);
}