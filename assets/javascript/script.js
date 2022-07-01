// Variable Declarations
var todaysDateContainer = document.querySelector("#currentDay");
var dayStart = 9;
var dayEnd = 5;

// Set current Day, Month and ordinal Date in "currentDay" <p>
todaysDateContainer.textContent = moment().format("dddd, MMMM Do");

function returnNextHour(currentHour){
    if(currentHour >= 12){
        currentHour = 1;   
    } else {
        currentHour += 1;
    }
    return currentHour;
}

function returnTotalWorkHours(start, end){
    var myHours = Math.abs(24 - (start + end));
    return myHours;
}

function createMyScheduleLayout(myStartTime){
    for(var i = 0; i < returnTotalWorkHours(); i++) {
        
    }
}