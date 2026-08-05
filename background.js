//rand(30-300) * 10
// let tillNext = 10*(Math.floor(Math.random()*270)+3);
let tillNext = 10
//array of possible games
const games=["timedstop","pemdas","aimlabs"];

//define timer and game variables in storage
browser.storage.local.get(["timer","game"], (tim) => {
    browser.storage.local.set({
        timer:0,
        game:""
    })
})

browser.alarms.create("gameTimer", {
    periodInMinutes: 1/600
})


//timer ticker
browser.alarms.onAlarm.addListener((alarm)=> {
    if(alarm.name === "gameTimer"){
        browser.storage.local.get(["timer"], (tim) => {
            let timer;

            //if timer is at next game
            if(tim.timer===tillNext){
                console.log("EQUAL");

                //if sidebar is not open, send notification to open it on click.
                browser.sidebarAction.isOpen({}).then((result) => {
                    if(!result){
                        browser.notifications.create({
                            type: "basic",
                            iconUrl: browser.runtime.getURL("icons/icon.png"),
                            title: "NEW TASK",
                            message: "Open Quick-Time Browser sidebar."
                            });
                        }
                });

                playRandom();
                timer=0;


                tillNext = 10*(Math.floor(Math.random()*270)+30);
            } else {
                timer=tim.timer+1;
            }
            browser.storage.local.set({
                timer,
            })

            console.log(tim.timer+" -> "+tillNext);
        })
    }
})

//pick random game
function playRandom(){
    timer=0;

    let game=games[Math.floor(Math.random() * games.length)];

    browser.storage.local.get(["timer", "game"], (tim) => {
        browser.storage.local.set({
            timer:0,
            game:game
        })
    })
}