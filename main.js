const timerEl = document.getElementById("timer")
const inputHrs = document.getElementById("hour")
const inputMins = document.getElementById("min")
const setButton = document.getElementById("set")
const startButton = document.getElementById("start")
const stopButton = document.getElementById("stop")
const resetButton = document.getElementById("reset")

let startingMinutes = 0;
let startingHours = 0;
let time = 0;
let total = 0;
let firstSt = 0;
let setclick = 0;
let resetClick = 0;

let stopTime = 0;
let process = 0;

setButton.addEventListener("click",(e)=>{
    e.preventDefault();
    if(setclick == 0){
        setTime();
        setclick = 1;
        flickerFunction();
    }

})

function setTime() {
    startingMinutes = Number(inputMins.value);
    startingHours = Number(inputHrs.value);
    let strtMin = startingMinutes < 10 ? "0"+startingMinutes : startingMinutes;
    let strtHrs = startingHours < 10 ? '0'+startingHours : startingHours;
    timerEl.innerHTML = `${strtHrs}:${strtMin}:00`;
    time = startingHours == 0 ? startingMinutes*60 : ((startingHours*60)+startingMinutes)*60 ;
    total = time;
}

stopButton.addEventListener("click",(e)=>{
    e.preventDefault();
    if (firstSt && setclick){
        btnCont = stopButton.innerHTML;
        stopButton.innerHTML =  btnCont[0] == "S"? `Resume<i style="right: -23px;" class="fa-lg fa-solid fa-play"></i>`:`Stop <i class="fa-lg fa-solid fa-stop"></i>`;
        if (btnCont[0] == "S"){
            stopTime = time;
            time = "stop";
        }
        else{
            time = stopTime;
            interval = setInterval(timer,1000);
        }
    }
    else{
        alert("Timer Not Started Yet !")
    }
})
var interval = null;

startButton.addEventListener("click",(e)=>{
    e.preventDefault();
    if (setclick){
        firstSt = 1;
        process = "started";

    }
    clearInterval(interval);
    if ((timerEl.innerHTML == "00:00:00") || (timerEl.innerHTML == "TIME UP!")){
        alert("To Begin Timer, First Set the Time Limit !");
    }
    
    else{
        interval = setInterval(timer,1000);
    }
    
})

resetButton.addEventListener("click",(e)=>{
    resetClick = 1;
    process=0;
    time = total;
    clearInterval(interval);
    if(stopButton.innerHTML[0] = "R"){
        stopButton.innerHTML = `Stop <i class="fa-lg fa-solid fa-stop"></i>`;
    }
    setTime();
    flickerFunction()
    if(timerEl.classList.length){
        timerEl.classList.remove("blink")
    }
})

const timer = ()=>{
    if(time=="stop"){
        clearInterval(interval);
        process = 0;
    }

    else if(time>0){
        time--;
        hours = Math.floor(time/3600);
        minutes = Math.floor((time/60)-hours*60);
        seconds = time - ((hours*3600) + (minutes*60));

        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;
        timerEl.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
    else{
        timerEl.innerHTML = "TIME UP!"
        timerEl.classList.add("blink")
    }
} 

var startFlicker =null;

function flickerFunction(){
    if (setclick | resetClick){
        if (process == 0){
            startButton.classList.add("flick")
            startFlicker = setInterval(addeff,450);
        }
        
    }
}


const addeff = ()=>{
    if (process){
        startButton.classList.remove("flick");
        clearInterval(startFlicker);
    }
    else{
        stList = startButton.classList;;
        stList = stList[2]=="flick"? stList.remove("flick"):stList.add("flick");
    }
    
}

