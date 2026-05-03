let tillNext = Math.floor(Math.random()*300)+30-1;
console.log(tillNext);

browser.alarms.create("gameTimer", {
    periodInMinutes:1/1000
})

//timer ticker
browser.alarms.onAlarm.addListener((alarm)=> {
    if(alarm.name === "gameTimer"){
        browser.storage.local.get(["timer"], (tim) => {
            let timer;
            //if timer is at next game
            if(tim.timer===tillNext){
                timer=0;

                tillNext = Math.floor(Math.random()*300)+30-1;
            } else {
                timer=tim.timer+1;

            }

            console.log(tim.timer + " "+ tillNext);
                browser.storage.local.set({
                    timer, 
                })


        })
    }
})

//start timer at 0
browser.storage.local.get(["timer"], (tim) => {
    browser.storage.local.set({
        timer:0
    })
})