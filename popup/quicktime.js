const canvas = document.getElementById("gameCanvas");
const gameDiv = document.getElementById("game");
const ctx = canvas.getContext("2d");

//master vars
let time;
let game;
let mouseX;
let mouseY;

//timedstop vars
let pos = 87;
let speed = 3.75;

//pemdas vars
let mathInfo;
let answ;
let shuffled;


requestAnimationFrame(update);
function update() {
    requestAnimationFrame(update);

    ctx.clearRect(0, 0, 300, 700)
    ctx.fillStyle = "#1c1b22";
    ctx.fillRect(0, 0, 300, 700);

    //define local versions of global vars
    browser.storage.local.get(["timer", "game"], (tim) => {
        time = tim.timer;
        game = tim.game;
    })

    //draw timedstop minigame when active
    if (game === "timedstop") {
        browser.storage.local.get(["timer", "game"], (tim) => {
            if (time >= 30) { // time/10 second minigame timer
                let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
            }
        })

        if (pos < 87 || pos > 612) {
            speed *= -1;
        }
        pos += speed;

        //track line
        ctx.fillStyle = "white";
        ctx.fillRect(250, 87, 7, 525);
        //area marker
        ctx.fillStyle = "#b91414";
        ctx.fillRect(238, 350, 32, 30);
        //moving marker
        ctx.fillStyle = "#b91414";
        ctx.fillRect(200, pos, 25, 5);
        //timer
        ctx.font = "50px Arial";
        ctx.fillText(3 - (Math.floor(time / 10)) % 3, 140, 60);
    }


    //draw pemdas minigame when active
    if (game === "pemdas") {
        browser.storage.local.get(["timer", "game"], (tim) => {
            if (time >= 100) { // time/10 second minigame timer
                let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
            }
        })

        //create equation and answers
        if (mathInfo === undefined) {
            mathInfo = generateMath();
            let answers = mathInfo.slice(1, 5)
            answ = answers[0];
            shuffled = fisherYatesShuffle(answers);
        }

        //equation
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(mathInfo[0], 50, 120);
        //answer boxes
        ctx.fillStyle = "#b91414";
        ctx.fillRect(50, 160, 100, 80);
        ctx.fillRect(175, 160, 100, 80);
        ctx.fillRect(50, 260, 100, 80);
        ctx.fillRect(175, 260, 100, 80);
        //answer text
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText(shuffled[0], 70, 215);
        ctx.fillText(shuffled[1], 195, 215);
        ctx.fillText(shuffled[2], 70, 315);
        ctx.fillText(shuffled[3], 195, 315);
        //timer
        ctx.font = "50px Arial";
        ctx.fillStyle = "#b91414";
        ctx.fillText(7 - (Math.floor(time / 10)) % 7, 140, 60);
    }
}

//redundant, checks game again in functions
document.getElementById("game").addEventListener("mousedown", timedStopper);
document.getElementById("game").addEventListener("mousedown", checkAnswer);

//function for timed stop minigame, end condition check
function timedStopper() {
    if (game === "timedstop") {
            if ((335 <= pos && 390 >= pos)) {
                reset();
            } else {
                let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
            }
    }
}

//function for pemdas minigame, end condition check
function checkAnswer() {
    updateClick();
    if (game === "pemdas") {
        
            if (mouseX > 50 && mouseX < 150 && mouseY > 220 && mouseY < 300) {
                if (shuffled[0] === answ) {
                    reset();
                } else {
                    let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
                }
                console.log("ONE");
            }
            
            else if (mouseX > 175 && mouseX < 275 && mouseY > 220 && mouseY < 300) {
                if (shuffled[1] === answ) {
                    reset();
                } else {
                    let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
                }
                console.log("TWO");
            }
            
            else if (mouseX > 50 && mouseX < 150 && mouseY > 320 && mouseY < 400) {
                if (shuffled[2] === answ) {
                    reset();
                } else {
                    let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
                }
                console.log("THREE");
            }
            
            else if (mouseX > 175 && mouseX < 275 && mouseY > 320 && mouseY < 400) {
                if (shuffled[3] === answ) {
                    reset();
                } else {
                    let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);

                }
                console.log("FOUR");
            }
    }
}

//generate random math equation for pemdas, returns array with equation and 4 answer choices
function generateMath() {

    //there is 100% a better way to do this, however all the alternatives i tried dont like to work properly so :)

    let questionFormats = ["x(y-z)", "x+y-z•a", "(x+y)(x-z)", "(z-y)(x-z)", "x•y•z"];
    let format = Math.floor(Math.random() * questionFormats.length);
    let formula = questionFormats[format];

    //generate numbers
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let z = Math.floor(Math.random() * 10);
    let a = Math.floor(Math.random() * 10);

    //swap vars for numbers
    formula = formula.replace('x', x);
    formula = formula.replace('y', y);
    formula = formula.replace('z', z);
    formula = formula.replace('a', a);

    //mostly redundant, but questionFormats[2/3] dont switch the x/z the first time for some reason
    formula = formula.replace('x', x);
    formula = formula.replace('z', z);

    let answ = 0;
    switch (format) {
        case 0:
            answ = x * (y - z);
            break;
        case 1:
            answ = x + y - z * a;
            break;
        case 2:
            answ = (x + y) * (x - z);
            break;
        case 3:
            answ = (z - y) * (x - z);
            break;
        case 4:
            answ = x * y * z;
            break;
    }

    last = Math.floor(Math.random() * 99) + 1;
    if (last === answ) {
        last = answ - 1;
    }

    //[formula,answer,wrong,wrong,wrong]
    return [formula, answ, answ + (Math.floor(Math.random() * 9) + 1), answ - (Math.floor(Math.random() * 8) + 1), last];
}

//shuffle array
function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

//update mouseX and mouseY
function updateClick() {
    mouseX = event.clientX;
    mouseY = event.clientY;
    console.log(mouseX, mouseY)
}

// reset game and restart countdown
function reset(){
    browser.storage.local.get(["timer", "game"], (tim) => {
        browser.storage.local.set({
            game: "",
            timer: 0,
        });
    })
}