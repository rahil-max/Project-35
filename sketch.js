//Create variables here
var database;
var dog,dogimg,doghappy;
var dataref;
var foodstock;
var fedTime,lastFed;
var feed,add;
var food;

function preload()
{
  //load images here
  dogimg = loadImage("Dog.png");
  doghappy = loadImage("happydog.png");
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database();

  dataref = database.ref("food");

  dataref.on("value",function(data){
    foodstock= data.val();
    food.updatestock(foodstock);
  });

  fedTime = database.ref("LastFed");

  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  food = new Food();
  
  dog = createSprite(400,350,50,50);
  dog.addImage(dogimg);

  feed = createButton("Feed Dog");
   feed.position(350,50);
   

   add = createButton("add food");
   add.position(480,50);
  
  
  
}


function draw() {  
  background(46,139,87);

  getFeedTime();

  if(foodstock!==0){
    dog.addImage(doghappy);
    textSize(20);
    fill("black");
    stroke(70);
    text("Looks Tasty !",50,200);
    //function getFeedTime();
  }

  else{
    dog.addImage(dogimg);
    textSize(20);
    fill("black");
    stroke(70);
    text("I am Hungry",50,200);
  }

  if(foodstock<=0){
    foodstock= 0;
    database.ref("/").update({
      food:foodstock
    })
    food.updatestock(foodstock);
  }

  feed.mousePressed(feedDog);

  add.mousePressed(addfoodstock);

  food.display();

  
  
  //textSize(30);
 // fill("red");
  //text("food: "+food,660,100);

  drawSprites();
  //add styles here
  textSize(30);
  fill("yellow");
  stroke(40);
  text("Last Fed: "+lastFed+":00",320,650)

}


/* function getfoodstock(){
  dataref = database.ref("food");

  dataref.on("value",function(data){
    this.foodstock = data.val()
  });


 } */

 function getFeedTime(){
  if(feedDog){
    lastFed=hour();
  }
  database.ref("/").update({
    LastFed:lastFed
  })
  
}


function feedDog(){

  if(foodstock!==0){
    foodstock--;
    database.ref("/").update({
      food:foodstock
    })

    textSize(20);
    fill("black");
    stroke(70);
  
    text("hmm Yummy!",50,250);

    

  food.updatestock(foodstock);

  
}
}

function addfoodstock(){
 foodstock++;
  database.ref("/").update({
    food:foodstock
  })
  food.updatestock(foodstock);
}





