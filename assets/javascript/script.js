// Variable Declarations
var todaysDateContainer = document.querySelector("#currentDay");
var timeBlockContainer = document.querySelector(".container");

// Set current Day, Month and ordinal Date in "currentDay" <p>
todaysDateContainer.textContent = moment().format("dddd, MMMM Do");

//Event Delegate for timeBlockContainer
timeBlockContainer.onclick = function(event) {
    var saveButton = event.target;

        if (saveButton.classList.contains("saveBtn")) {
            var myParentElement = saveButton.parentElement;
            var myTime = myParentElement.childNodes[0].textContent;
            var myInput = myParentElement.childNodes[1].value;
            console.log(myTime);
            console.log(myInput);
            submitTimeBlockEntry(myTime, myInput);
    }
}

// Verify localstorage
function doesLocalStorageExist(){
    if(localStorage.getItem("mySchedule") !== null){
        return true;
    } else {
        return false;
    }
}

// Add TimeBlock to localStorage
function submitTimeBlockEntry(myTime, myText){
    var myTimeBlockObj = {
        timeSlot: myTime,
        scheduleNote: myText
    }
    var myTempTimeBlocks = [];
    console.log(doesLocalStorageExist());
    if(doesLocalStorageExist()){
        var existingSchedule = JSON.parse(localStorage.getItem("mySchedule"));

        for(var i = 0; i < existingSchedule.length; i++){
            myTempTimeBlocks.push(existingSchedule[i]);
        }
        
        myTempTimeBlocks.push(myTimeBlockObj);

        localStorage.setItem("mySchedule", JSON.stringify(myTempTimeBlocks));

    } else {

        myTempTimeBlocks.push(myTimeBlockObj);
        localStorage.setItem("mySchedule", JSON.stringify(myTempTimeBlocks));
    }
}

// Returns a bootstrap element that takes in text and has a button to save inputted text to 
function createMyTimeBlocks(time){
    var myBSElement = document.createElement("div");
    var myTimeElement = document.createElement("p");
    var myInputElement = document.createElement("input");
    var mySaveButton = document.createElement("button");

    //Assign relevant properties to the Div
    myBSElement.setAttribute("class", "input-group mb-3 time-block");

    //Assign time to paragraph tag
    myTimeElement.setAttribute("class", "hour");
    myTimeElement.textContent = time;
    myBSElement.appendChild(myTimeElement);

    //Assign relevant properties to the Input and append to div
    myInputElement.setAttribute("type", "text");
    myInputElement.setAttribute("class", "form-control row");
    myBSElement.appendChild(myInputElement);

    //Assign relevant properties to the Save Button and append to div
    mySaveButton.setAttribute("class", "btn btn-outline-secondary saveBtn");
    mySaveButton.setAttribute("type", "button");
    mySaveButton.setAttribute("id", "button-addon2");
    mySaveButton.appendChild(document.createElement("img"));
    mySaveButton.lastElementChild.setAttribute("src", "./assets/images/Save_icon.png");
    myBSElement.appendChild(mySaveButton);

    return myBSElement;
}

// Find my time slot
function returnMyTimeBlock(myTime){
    var myBlocks = document.querySelectorAll(".time-block");
    for(var i = 0; i < myBlocks.length; i++){
        if(myBlocks[i].childNodes[0].textContent === myTime){
            return myBlocks[i];
        }
    }
}


// Populate Schedule with existing entries
function populateTimeBlocks(){
    if(doesLocalStorageExist()){
        var existingSchedule = JSON.parse(localStorage.getItem("mySchedule"));
        for(var i = 0; i < existingSchedule.length; i++){
            var timeBlock = returnMyTimeBlock(existingSchedule[i].timeSlot);
            timeBlock.childNodes[1].value = existingSchedule[i].scheduleNote;
        }
    }
}

// Assign correct styling to time blocks
function updateTimeBlockColors(){
    var myTimeBlocks = document.querySelectorAll(".time-block");
    var myCurrentTime;
    for(var i = 0; i < myTimeBlocks.length; i++){
        if(myTimeBlocks[i].childNodes[0].textContent === moment().format("h A")){
            myCurrentTime = myTimeBlocks[i].childNodes[0].textContent;
            myTimeBlocks[i].childNodes[1].classList.add("present");
        } else if (moment(myCurrentTime).isAfter(moment().format("h"))){
            myTimeBlocks[i].childNodes[1].classList.add("past");
        } else {
            myTimeBlocks[i].childNodes[1].classList.add("future");
        }
    }
}

// createMySchedule Function - populates the timeBlockContainer with timeblocks
function createMyScheduleLayout(){
    for(var i = 0; i < 9; i++) {
        var MyTimeModifier = i+9;
        timeBlockContainer.appendChild(createMyTimeBlocks(moment({hour: MyTimeModifier}).format("h A")));
    }
    updateTimeBlockColors();
    populateTimeBlocks();
}

createMyScheduleLayout();