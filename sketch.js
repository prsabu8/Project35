var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feed,addFood;
var fedTime, lastFed;
var foodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  foodStock=database.ref('FeedTime');
  foodStock.on("value",function(data){
    lastFed=data.val();
  });
  textSize(20);

  createCanvas(900,500);
  
  foodObj = new Food();

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  dog=createSprite(720,250,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

 
}

// function to display UI
function draw() {
  background(46,139,87);
 
 

  drawSprites();
  fill(255,255,254);
  textSize(13);
  if(lastFed>=12){
    text("Last Feed: " + lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM", 350,30);
  }else{
    text("Last Feed: " + lastFed + " AM", 350,30);
  }
}



function feedDog(){
  dog.addImage(dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  foodObj.display();
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}