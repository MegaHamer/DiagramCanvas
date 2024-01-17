var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 768;
const sizes = {
    width: Number(canvas.width),
    height: Number(canvas.height)
};
// window.addEventListener("resize", event => {
//     sizes.width = canvas.width;
//     sizes.height = canvas.height;
//     console.log(sizes)
// })
ctx.lineWidth = 4;
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

    constructor(canvas, x, y, radius) {
        this.canvas = canvas;
        this.#ctx = canvas.getContext("2d");
        this.data = { 5: 0, 4: 0, 3: 0, 2: 0 };
        this.center = {
            x: x,
            y: y
        };
        this.radius = radius;
    }
    #empty() {
        let result = true;
        for (const element in this.data) {
            if (this.data[element] != 0) result = false;
        }
        return result
    }
    #drawLegend(colors) {
        const ContextDiagram = {
            width: 150,
            height: 50,
            count: Object.keys(this.data).length
        }
        if (ContextDiagram.count < 1) ContextDiagram.count = 1;
        ContextDiagram.startPosX = sizes.width - ContextDiagram.width * 1.4;
        ContextDiagram.startPosY = sizes.height - (ContextDiagram.count + 1.5 + (ContextDiagram.count - 1) * 0.2) * ContextDiagram.height;

        console.log(ContextDiagram);
        for (let i = 0; i < ContextDiagram.count; i++) {
            this.#ctx.strokeRect(
                ContextDiagram.startPosX + ContextDiagram.width * 0.1,
                ContextDiagram.startPosY + (ContextDiagram.height * 0.5 + i * ContextDiagram.height + i * ContextDiagram.height * 0.2),
                ContextDiagram.width * 0.66,
                ContextDiagram.height
            )
            this.#ctx.strokeRect(
                ContextDiagram.startPosX,
                ContextDiagram.startPosY,
                ContextDiagram.width * 1.2,
                (ContextDiagram.count + 1 + (ContextDiagram.count - 1) * 0.2) * ContextDiagram.height)
            this.#ctx.fillStyle = colors[i + 2];
            this.#ctx.fillRect(
                ContextDiagram.startPosX + ContextDiagram.width * 0.1,
                ContextDiagram.startPosY + (ContextDiagram.height * 0.5 + i * ContextDiagram.height + i * ContextDiagram.height * 0.2),
                ContextDiagram.width * 0.66,
                ContextDiagram.height
            )
        }
        let g = 1;
        for (const element in this.data) {
            this.#ctx.fillStyle = "black";
            this.#ctx.fillText(
                element,
                ContextDiagram.startPosX + ContextDiagram.width * 0.1 + ContextDiagram.width * 0.76,
                ContextDiagram.startPosY + (ContextDiagram.height * 0.2 + g * ContextDiagram.height + g * ContextDiagram.height * 0.2)
            );
            g++;
        }
    }
    #drawAngle(startAngle, endAngle) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.center.x, this.center.y);
        this.#ctx.arc(this.center.x, this.center.y, this.radius, startAngle, endAngle, false);
        this.#ctx.lineTo(this.center.x, this.center.y);
        this.#ctx.stroke();
    }
    draw() {
        this.#ctx.font = "4rem serif";
        this.#ctx.fillText("Успеваемость студентов", sizes.width / 2 - 300, 16 * 5);

        const colors = { 2: "purple", 3: "green", 4: "blue", 5: "yellow" };
        this.#drawLegend(colors);

        if (this.#empty()) {
            this.#ctx.beginPath();
            this.#ctx.arc(this.center.x, this.center.y, this.radius, 2 * Math.PI, 0);
            this.#ctx.stroke();
        }
        else {
            let sum = 0;
            let single = true;
            for (const element in this.data) {
                sum += this.data[element];
                if (this.data[element] != sum && this.data[element] != 0) single = false;
            };
            console.log(single)
            if (single) {
                for (const element in this.data) {
                    if (this.data[element] == sum) this.#ctx.fillStyle = colors[element];
                }
                this.#ctx.beginPath();
                this.#ctx.arc(this.center.x, this.center.y, this.radius, 2 * Math.PI, 0);
                this.#ctx.stroke();
                this.#ctx.fill();
                this.#ctx.fillStyle = "black";
            }
            else {
                let start = 0;
                for (const element in this.data) {
                    const angle =  this.data[element] / sum * 2 * Math.PI;
                    console.log(element,this.data[element],angle,start)
                    this.#drawAngle(start,start + angle);
                    this.#ctx.fillStyle = colors[element];
                    this.#ctx.fill();
                    this.#ctx.fillStyle = "black";
                    start+=angle;
                    // window.alert();
                };
            }


            console.log(sum)
        }
    }
    clear() {
        this.#ctx.clearRect(0, 0, sizes.width, sizes.height);
        ctx.strokeRect(0, 0, sizes.width, sizes.height);
    }
}
const diag = new diagram(canvas, sizes.width / 2, sizes.height / 2, Math.min(sizes.width, sizes.height) / 3);
diag.draw();

const add = () => {
    updInput();
    if (diag.data[dataInputs.score] == null) {
        diag.data[dataInputs.score] = Number(dataInputs.count)
    }
    else {
        diag.data[dataInputs.score] += Number(dataInputs.count)
    }
    diag.clear();
    diag.draw();
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
    diag.clear();
    diag.draw();
    console.log(diag);
}
const clearDiag = () => {
    for (const element in diag.data) {
        diag.data[element] = 0;
    }
    diag.clear();
    diag.draw();
    console.log(diag);
}