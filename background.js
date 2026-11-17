//rand(30-300) * 10
let tillNext = 10*(Math.floor(Math.random()*270)+3);

// let tillNext = 10;
let gameNum = 0;
let lose = new Audio('../sfx/lose.mp3');
lose.volume = .35;

//array of possible games
const games = ["timedstop", "pemdas", "aimlabs", "stratagem", "search", "charger"];

//define timer and game variables in storage
browser.storage.local.get(["timer", "game", "start"], (tim) => {
    browser.storage.local.set({
        timer: 0,
        game: "start",
    })

    start = tim.start;
})


browser.alarms.create("gameTimer", {
    periodInMinutes: 1 / 600
})

//timer ticker
browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "gameTimer") {
        browser.storage.local.get(["timer", "game"], (tim) => {
            let timer;

            //if timer is at next game
            if (tim.timer === tillNext) {

                // console.log("EQUAL");

                //play sound on loss by time
                if (tim.game != "") {
                    let lose = new Audio('../sfx/lose.mp3');
                    lose.volume = .5;
                    // lose.play();
                }

                //if sidebar is not open, send notification to open it on click.
                browser.sidebarAction.isOpen({}).then((result) => {
                    if (!result) {
                        browser.notifications.create({
                            type: "basic",
                            iconUrl: browser.runtime.getURL("icons/icon.png"),
                            title: "NEW TASK",
                            message: "Open Quick-Time Browser sidebar."
                        });
                    }
                });

                playRandom();
                lose.play();
                timer = 0;

                tillNext = 10*(Math.floor(Math.random()*270)+30);
                // tillNext = 30;
            } else {
                timer = tim.timer + 1;
            }
            browser.storage.local.set({
                timer,
                start
            })

            console.log(tim.timer + " -> " + tillNext);
            
        })
    }
})

//pick random game
function playRandom() {
    timer = 0;

    gameNum=Math.floor(Math.random()*6);

    browser.storage.local.get(["timer", "game", "reset"], (tim) => {
        browser.storage.local.set({
            timer: 0,
            game: games[gameNum],
            // game:'stratagem'
            reset: true
        })
    })
}