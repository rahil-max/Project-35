class Food{
   constructor(){
       this.foodstock;
       this.image = loadImage("Milk.png");
   }

  
updatestock(food){
  this.foodstock = food;
     }


    display(){
      var x=650,y=0;
      
      imageMode(CENTER);
      //image(this.image,720,220,70,70);
      
      if(this.foodstock!=0){
        for(var i=0;i<this.foodstock;i++){
          if(i%5==0){
            x=650;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
}