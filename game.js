var level = 0;
var started = false;
var pressedColorByComputer = [];
var pressedColorByHuman = [];
var colors = ['red', 'blue', 'yellow', 'green'];



$(document).keypress(function() {
  if(!started){
    reset();
    nextLevel();
    setTimeout(function(){
      $("h1").text("Level "+level);
    },1000);

    started = true;
  }
});



$("div[type*='button']").click(function(){
  makeSound($(this).attr("id"));
  pressedColorByHuman.push($(this).attr("id"));
  var number = pressedColorByHuman.length - 1;
  if(started){
    if(pressedColorByHuman[number] === pressedColorByComputer[number]){
      if(pressedColorByHuman.length === pressedColorByComputer.length){
        nextLevel();
        setTimeout(function(){
          $("h1").text("Level "+level);
        },1000);
      }
    }else{
      gameOver();
    }
  }
})






function randomColor(){
  var randomNumber = Math.floor(Math.random() *4);
  return colors[randomNumber]
}


function makeSound(id) {
  $("#" + id).addClass("pressed");
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 100);
}

function reset(){
  level = 0;
  started = false;
  pressedColorByComputer = [];
  pressedColorByHuman = [];
}

function nextLevel(){
  pressedColorByHuman = [];
  level += 1;
  var color = randomColor();
  pressedColorByComputer.push(color);
  setTimeout(function(){
    makeSound(color);
  },1000);

}

function gameOver(){
  started = false;
  level = 0;
  $("body").addClass("game-over");
  $("h1").text("Press Any Key To Start Game Again");
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  setTimeout(function(){
    $("body").removeClass("game-over");
  },400);
}
