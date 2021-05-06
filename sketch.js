var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed,lastfed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  feed=createButton("feed");
  feed.position(900,60);
  feed.mousePressed(feed);
 

}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedTime =database.ref("feedtime").on("value",function(data){
    lastfed=data.val()
  })
  //write code to read fedtime value from the database 
  if(lastfed>=12){
    text ("lastfeed:"+lastfed%12+"pm",900,80)
  }
 else if(lastfed==0){
   text("lastfeed:12am",980,40)
 }
  //write code to display text lastFed time here
 else{
   text ("lastfeed:"+lastfed+"am",850,70)
 }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

   foodObj.updateFoodStock(foodObj.getFoodStock()-1)
   database.ref("/").update({
     food:foodObj.getFoodStock(),
     feedtime:hour()
   })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
