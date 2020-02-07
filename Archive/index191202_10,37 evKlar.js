"use strict";
let totalScore = 0;       // total score
let totalScoreDiv;       // shows score of player
var randomChestNr;        // randomized chest; 1, 2 or 3
let chest1Div;            // div for chest1
let chest2Div;            // div for chest2
let chest3Div;            // div for chest3
let imgURL;               // URL to randomized pexels image
let pexelsImages;         // images from pexels

//load page and then start game, through function 'init'
document.addEventListener("DOMContentLoaded", init);  

/*
* Function that initiates the whole Game application.
*/
function init(){
  initGameUI();
  getImageFromPexels() /////////////////////////////////////////////////
}

function initGameUI(){
  // Call functions that creates the Game UI
  initChests();
  randomChestNr = randomizeChest();  ///////////////////////////////////////////
  initScoreBoard();
  initChestEventListeners();
 // placera ut den slumpade skatten här?

  initRefreshButton();
}

function initChests(){
  chest1Div = document.createElement('div');
  chest2Div = document.createElement('div');
  chest3Div = document.createElement('div');

  chest1Div.setAttribute('id', 'chest1Div');
  chest1Div.setAttribute('class', '1');          ///////////////////////////////////
  chest2Div.setAttribute('id', 'chest2Div');
  chest2Div.setAttribute('class', '2');          ///////////////////////////////////
  chest3Div.setAttribute('id', 'chest3Div');
  chest3Div.setAttribute('class', '3');          ///////////////////////////////////

  chest2Div.style.marginLeft = '50px';
  chest3Div.style.marginLeft = '50px';
  chest1Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chest2Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chest3Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'

  document.getElementById('chests').appendChild(chest1Div);
  document.getElementById('chests').appendChild(chest2Div);
  document.getElementById('chests').appendChild(chest3Div);

 
}

function initScoreBoard(){
totalScoreDiv = document.createElement('h2');
totalScoreDiv.setAttribute('id', 'totalScoreDiv');
totalScoreDiv.setAttribute('style', 'color: white; text-align: center');
totalScoreDiv.innerHTML = 'Score: ' + totalScore;
document.getElementById('refresh-button').after(totalScoreDiv);
}



function initChestEventListeners() {
  chest1Div.addEventListener('click', chestClicked);
  chest2Div.addEventListener('click', chestClicked);
  chest3Div.addEventListener('click', chestClicked);

}





function initRefreshButton(){
  let refreshBtn = document.getElementById('refresh-button');
  refreshBtn.addEventListener('click', refresh);
}



function placeTreasure(){
}

function chestClicked(event){
  var targetChestClass = event.target.parentElement.className;   //class of chest clicked

  console.log('Class: ' + targetChestClass);  /////////////////////////////
  console.log('Chest nr: ' + randomChestNr);  /////////////////////////////

  if(targetChestClass == randomChestNr){
    event.target.parentElement.innerHTML = imgURL;
    totalScore += 5;
    totalScoreDiv.innerHTML = 'Score: ' + totalScore;

  }
  else{
    event.target.parentElement.innerHTML = '<img src="images/chest-open.png" alt="open-chest">';
  }
  removeChestEvents();  //block further clicking
  }
  
function getImageFromPexels(){
  // make a request towards pexels API and get 1 Diamond image
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=treasure+query&curated?per_page=15&page=1', true)
  xhr.setRequestHeader('Authorization', '563492ad6f91700001000001e198a2b1e80e45998e49c4f2e36841c2');
  xhr.onload = function(){
    if(this.status == 200){
      let parsedResponse = JSON.parse(this.responseText)
      console.log(parsedResponse)
      pexelsImages = parsedResponse;
    }
  }
  xhr.send();
}
function randomizeImage(){
  var i = Math.floor((Math.random() * 14) + 1);   //Math.floor(Math.random() * 14) + 0;
  imgURL = '<img src="'+ pexelsImages.photos[i].src.small +'" alt="treasure-chest" width="300px" height="200">'
}

function randomizeChest(){
  var randomChestNr = Math.floor(Math.random() * 3) + 1;   //choose a random chest; 1, 2 or 3
  return randomChestNr;
}

function refresh(){
  initChestEventListeners()
  chest1Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chest2Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chest3Div.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  getImageFromPexels();
  randomizeImage()
  randomizeChest();
}

function removeChestEvents(){
  chest1Div.removeEventListener('click', chestClicked);
  chest2Div.removeEventListener('click', chestClicked);
  chest3Div.removeEventListener('click', chestClicked);
}


