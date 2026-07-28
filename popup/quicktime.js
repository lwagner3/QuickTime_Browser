const canvas = document.getElementById("gameCanvas");
const gameDiv = document.getElementById("game");
const ctx = canvas.getContext("2d");

let time;
let game;
let mouseX;
let mouseY;

//timedstop vars
let pos=25;
let speed=1.725;

//pemdas vars
let mathInfo;
let answ;
let shuffled;

requestAnimationFrame(update);

function update(){
    requestAnimationFrame(update);

    ctx.clearRect(0,0,300,700)
    ctx.fillStyle = "#1c1b22";
    ctx.fillRect(0,0,300,700);

    //define local versions
    browser.storage.local.get(["timer","game"], (tim) => {
        time=tim.timer;
        game = tim.game;
    })

    //draw timedstop minigame
    if(game==="timedstop"){
        browser.storage.local.get(["timer","game"], (tim) => {
            if(time>=30){ //3 second timer
                let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
            }
        })

        ctx.fillStyle = "#b91414";
        if(pos<25 || pos>272){
            speed*=-1;
        }
        pos+=speed;

        ctx.fillStyle = "white";
        ctx.fillRect(25, 115, 250, 5);
        ctx.fillStyle = "#b91414";
        ctx.fillRect(137.5, 107.5, 25, 20);
        ctx.fillStyle = "#b91414";
        ctx.fillRect(pos,70,3,20);
        ctx.font = "50px Arial";
        ctx.fillText(3-(Math.floor(time/10))%3,10,80);
    }
    if(game==="pemdas"){
        browser.storage.local.get(["timer","game"], (tim) => {
            if(time>=50){ //5 second timer
                // let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
            }
        })
        
        if(mathInfo===undefined){
            mathInfo=generateMath();
        
            console.log(mathInfo);
            
            let answers=mathInfo.slice(1,5)
            answ=answers[0];

            shuffled=fisherYatesShuffle(answers);

        }
        


        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(mathInfo[0],10,80);
        ctx.fillStyle = "#b91414";

        ctx.fillRect(50, 120, 100, 80);
        ctx.fillRect(175, 120, 100, 80);
        ctx.fillRect(50, 220, 100, 80);
        ctx.fillRect(175, 220, 100, 80);

        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText(shuffled[0],70,175);
        ctx.fillText(shuffled[1],195,175);
        ctx.fillText(shuffled[2],70,275);
        ctx.fillText(shuffled[3],195,275);
    }
}

//function for timed stop minigame, end condition check
function timedStopper(){
    if(game==="timedstop"){
        browser.storage.local.get(["timer","game"], (tim) => {


            if((137.5<=pos&&162.5>=pos)){
                browser.storage.local.set({
                    game: "",
                    timer: 0,
                });
            } else {
                let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
            }
        })
    }

}
document.getElementById("game").addEventListener("mousedown",timedStopper);

function generateMath(){

    //there is 100% a better way to do this, however all the alternatives i tried dont like to work properly so :)

    let questionFormats=["x(y-z)","x+y-z•a","(x+y)(x-z)","(z-y)(x-z)","x•y•z"];
    let format=Math.floor(Math.random() * questionFormats.length);
    let formula=questionFormats[format];

    let x=Math.floor(Math.random() * 10);
    let y=Math.floor(Math.random() * 10);
    let z=Math.floor(Math.random() * 10);
    let a=Math.floor(Math.random() * 10);

    formula=formula.replace('x',x);
    formula=formula.replace('y',y);
    formula=formula.replace('z',z);
    formula=formula.replace('a',a);

    //redundant, but questionFormats[2/3] dont switch the x/z the first time for some reason
    formula=formula.replace('x',x);
    formula=formula.replace('z',z);

    let answ=0;

    switch(format){
        case 0:
            answ=x*(y-z);
            break;
        case 1:
            answ=x+y-z*a;
            break;
        case 2:
            answ=(x+y)*(x-z);
            break;
        case 3:
            answ=(z-y)*(x-z);
            break;
        case 4:
            answ=x*y*z;
            break;
    }

    last=Math.floor(Math.random()*99)+1;
    if(last===answ){
        last=answ-1;
    }

    //[formula,answer,wrong,wrong,wrong]
    return [formula,answ,answ+(Math.floor(Math.random() * 9)+1),answ-(Math.floor(Math.random() * 8)+1),last];
}

function fisherYatesShuffle(arr) {
  	for (let i = arr.length - 1; i > 0; i--) {
    	const j = Math.floor(Math.random() * (i + 1));
    	[arr[i], arr[j]] = [arr[j], arr[i]];
  	}
  	return arr;
}

document.getElementById("game").addEventListener("mousedown",checkAnswer);

function checkAnswer(){
    getClick();
    if(game==="pemdas"){
        browser.storage.local.get(["timer","game"], (tim) => {

            console.log(mouseX,mouseY)
            if(mouseX>50&&mouseX<150 && mouseY>180&&mouseY<260){
                if(shuffled[0]===answ){
                    browser.storage.local.set({
                            game: "",
                            timer: 0,
                        });
                } else {
                    let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
                }
            } else if(mouseX>175&&mouseX<275 && mouseY>180&&mouseY<260){
                if(shuffled[1]===answ){
                    browser.storage.local.set({
                            game: "",
                            timer: 0,
                        });
                } else {
                    let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
                }
            } else if(mouseX>50&&mouseX<150 && mouseY>280&&mouseY<360){
                if(shuffled[2]===answ){
                    browser.storage.local.set({
                            game: "",
                            timer: 0,
                        });
                } else {
                    let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
                }
            } else if(mouseX>175&&mouseX<275 && mouseY>280&&mouseY<360){
                if(shuffled[3]===answ){
                    browser.storage.local.set({
                            game: "",
                            timer: 0,
                        });
                } else {
                    let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
                }
            } else {
                let removing = browser.windows.remove(browser.windows.WINDOW_ID_CURRENT);
            }
        })
    }

}

function getClick(){
    mouseX=event.clientX;
    mouseY=event.clientY;
}