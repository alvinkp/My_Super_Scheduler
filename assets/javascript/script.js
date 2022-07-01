// Variable Declarations
var todaysDateContainer = document.querySelector("#currentDay");
var timeBlockContainer = document.querySelector(".container");

// Set current Day, Month and ordinal Date in "currentDay" <p>
todaysDateContainer.textContent = moment().format("dddd, MMMM Do");

// Returns a bootstrap element that takes in text and has a button to save inputted text to 
function createMyTimeBlocks(time){
    var myBSElement = document.createElement("div");
    var myTimeElement = document.createElement("p");
    var myInputElement = document.createElement("input");
    var mySaveButton = document.createElement("button");

    //Assign relevant properties to the Div
    myBSElement.setAttribute("class", "input-group mb-3");

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

// createMySchedule Function - populates the timeBlockContainer with timeblocks
function createMyScheduleLayout(){
    for(var i = 0; i < 9; i++) {
        var MyTimeModifier = i+9;
        timeBlockContainer.appendChild(createMyTimeBlocks(moment({hour: MyTimeModifier}).format("h A")));
    }
}

createMyScheduleLayout();