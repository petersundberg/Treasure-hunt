"use strict";
const points = 5;         //points for finding treasure
let totalScore = 0;       // total score
let totalScoreH2;         // h2-element that shows score of player
let randomChestNr;        // randomized chest; 1, 2 or 3
let chest1Div;            // div for chest1
let chest2Div;            // div for chest2
let chest3Div;            // div for chest3
let imgURL;               // URL to randomize pexels image
let pexelsImages;         // images from pexels.com

//load page and then call function 'init'
document.addEventListener("DOMContentLoaded", init);  

/*
* Function that initiates the whole Game application.
*/
function init(){
  initGameUI();
  getImageFromPexels();
}
/**
 * @Description: Call functions that creates the Game UI
 */
function initGameUI(){
  initChests();
  initScoreBoard();
  initChestEventListeners();
  initRefreshButton();
}
/**
 * @Description: creates divs for chest-images, sets id and class
 * (sets class to compare targetChestClass to randomized chestNr when chest is clicked)
 * sets images and append to document
 */
function initChests(){
  chest1Div = document.createElement('div');     //create div elements
  chest2Div = document.createElement('div');
  chest3Div = document.createElement('div');
  chest1Div.setAttribute('id', 'chest1Div');     //set element id
  chest2Div.setAttribute('id', 'chest2Div');
  chest3Div.setAttribute('id', 'chest3Div');
  chest1Div.setAttribute('class', '1');          //set element class
  chest2Div.setAttribute('class', '2');
  chest3Div.setAttribute('class', '3');
  chest2Div.style.marginLeft = '50px';
  chest3Div.style.marginLeft = '50px';
  chest1Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chest2Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chest3Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  document.getElementById('chests').appendChild(chest1Div);
  document.getElementById('chests').appendChild(chest2Div);
  document.getElementById('chests').appendChild(chest3Div);
}
/**
 * @Description: creates scoreboard, sets id, color, position, content and position
 */
function initScoreBoard(){
  totalScoreH2 = document.createElement('h2');
  totalScoreH2.setAttribute('id', 'totalScoreH2');
  totalScoreH2.setAttribute('style', 'color: white; text-align: center');
  totalScoreH2.innerHTML = 'Score: ' + totalScore;
  document.getElementById('refresh-button').after(totalScoreH2);
}
/**
 * @Description: sets function to run when each chest-Div is clicked, using eventListener
 */
function initChestEventListeners() {
  chest1Div.addEventListener('click', chestClicked);
  chest2Div.addEventListener('click', chestClicked);
  chest3Div.addEventListener('click', chestClicked);
}
/**
 * @Description: sets function to run when refresh-button is clicked
 */
function initRefreshButton(){
  let refreshBtn = document.getElementById('refresh-button');
  refreshBtn.addEventListener('click', refresh);
}
/**
 * @Description: when a chest is clicked, compare target-chest-class to randomized chestNr
 * if it's the same; show treasure and add points, if not; show open empty treasure-chest
 */
function chestClicked(event){
  var targetChestClass = event.target.parentElement.className;   //class of parent div to the chest clicked
  randomChestNr = Math.floor(Math.random() * 3) + 1;             //randomize chest-nr; 1, 2 or 3
  if(targetChestClass == randomChestNr){
    event.target.parentElement.innerHTML = imgURL;
    totalScore += points;
    totalScoreH2.innerHTML = 'Score: ' + totalScore;
  }
  else{
    event.target.parentElement.innerHTML = '<img src="images/chest-open.png" alt="open-chest">';
  }
  removeChestEvents();  //run function to block further clicking
  }
/**
 * @Description: request treasure images from Pexels API, and randomize one of them
 */  
function getImageFromPexels(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=treasure+query&curated?per_page=15&page=1', true)
  xhr.setRequestHeader('Authorization', '563492ad6f91700001000001e198a2b1e80e45998e49c4f2e36841c2');
  xhr.onload = function(){
    if(this.status == 200){
      let parsedResponse = JSON.parse(this.responseText);
      pexelsImages = parsedResponse;
      randomizeImage();               //call function to get random image
    }
  }
  xhr.send();
}
/**
 * @Description: randomizes one of Pexels images
 */  
function randomizeImage(){
  var i = Math.floor((Math.random() * 14) + 1);
  imgURL = '<img src= "' + pexelsImages.photos[i].src.medium +'" alt="treasure-chest" width="300px" height="200">'
}
/**
 * @Description: resets images in chest-divs when refreshing
 * randomizes a new image for next try
 */
function refresh(){
  initChestEventListeners()
  chest1Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chest2Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chest3Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  randomizeImage();
}
/**
 * @Description: removes ability to click chests more than once without refreshing first
 */
function removeChestEvents(){
  chest1Div.removeEventListener('click', chestClicked);
  chest2Div.removeEventListener('click', chestClicked);
  chest3Div.removeEventListener('click', chestClicked);
}
