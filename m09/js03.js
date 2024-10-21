/*
	Tipton Turbines
     Program to display games results in a web table
     Author: leonard verhave
     Date: 10-17-24

     Filename: js03.js
 */

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

window.addEventListener("load", addWeekDays);
     
function addWeekDays() {
    let i = 0;
    let headingCells = document.getElementsByTagName("th");
     
    while (i < 7) {
        headingCells[i].innerHTML = weekDays[i]; 
        
        i++;
    }
}
window.addEventListener("load", showGames);

function showGames() {
    for (let i = 0; i < gameDates.length; i++) {
        let gameInfo = "";
        
    switch (gameResults[i]) {
        case "W":
            gameInfo += '<p class="win">';
            break;
        case "L":
            gameInfo += '<p class="lose">';
            break;
        case "S":
            gameInfo += '<p class="suspended">';
            break;
        case "P":
            gameInfo += '<p class="postponed">';
            break;
        }
     
    gameInfo += gameOpponents[i] + "<br>";
             
    if (gameLocations[i] === "h") {
        gameInfo += "vs. ";  
        } else if (gameLocations[i] === "a") {
                gameInfo += "@ ";  
            }
     
    gameInfo += gameResults[i] + ": (" + runsScored[i] + " - " + runsAllowed[i] + ")";
     
    if (gameInnings[i] < 5) {
            gameInfo += "[" + gameInnings[i] + "]***";  
        } else if (gameInnings[i] < 9) {
            gameInfo += " [" + gameInnings[i] + "]*";  
        } else if (gameInnings[i] > 9) {
            gameInfo += "[" + gameInnings[i] + "]";  
        }
     
gameInfo += "</p>";    

let tableCell = document.getElementById(gameDates[i]);
tableCell.insertAdjacentHTML("beforeEnd", gameInfo);
    }
}