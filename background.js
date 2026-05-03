let tillNext = Math.floor(Math.random()*300)+30-1;
console.log("Next game: tillNext");

browser.notifications.create({
  type: "basic",
  iconUrl: browser.runtime.getURL("icon.png"),
  title: "NEW TASK",
  message: "Open Quick-Time Browser Sidebar."
});


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

                //if sidebar is not open, send notification to open it on click.
                browser.sidebarAction.isOpen({}).then((result) => {
                    if(!result){
                        console.log("notify");
                        
                    }
                });


                playRandom();

                //next wait
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


function playRandom(){
    let games=["timedstop"];
}