function spring({n = 5, length = 100, diameter = 50, hook = 10, col = "#999"} = {}) {
    let p = (length - 2 * hook) / n;
    let r = diameter / 2;
    let c = color(col);

    push();
    stroke(red(c) * 0.75, green(c) * 0.75, blue(c) * 0.75);
    strokeCap(ROUND);

    line(0, hook, -r, 0.25 * p + hook);

    for (let i = 0; i < n - 1; i++ ) {
        line(r, i * p + 0.75 * p + hook, -r, (i + 0.5) * p + 0.75 * p + hook);
    }

    stroke(c);

    for (let i = 0; i < n; i++ ) {
        line(-r, i * p + 0.25 * p + hook, r, (i + 0.5) * p + 0.25 * p + hook);
    }

    line(0, length - hook, r, length - hook - 0.25 * p);

    line(0, 0, 0, hook);
    line(0, length, 0, length - hook);

    pop();
}

function damper({length = 120, pod = 60, diameter = 50, hook = 20} = {}) {
    let r = diameter / 2;

    push();
    stroke(153);
    strokeCap(ROUND);

    line(0, 0, 0, hook);
    line(-r, hook, r, hook);
    line(-r, hook, -r, pod + hook);
    line(r, hook, r, pod + hook);

    line(0, length, 0, length - hook - pod);
    line(-0.7 * r, length - hook - pod, 0.7 * r, length - hook - pod);


    //line(0, length, 0, length - hook);
    //line(-r, )
    pop();
}
