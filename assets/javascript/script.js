// Variable Declarations
var todaysDateContainer = document.querySelector("#currentDay");

// Set current Day, Month and ordinal Date in "currentDay" <p>
todaysDateContainer.textContent = moment().format("dddd, MMMM Do");

