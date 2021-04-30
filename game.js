var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];
var started = false;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
  return randomChosenColor;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(document).ready(function () {
  for (var i = 0; i < buttonColors.length; i++) {
    $("#" + buttonColors[i]).click(function () {
      var userChosenColor = this.id;
      playSound(userChosenColor);
      animatePress(userChosenColor);
      userClickedPattern.push(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
      //console.log(userClickedPattern);
    });
  }
  $(document).keypress(function () {
    if (!started) {
      nextSequence();
      started = true;
    }
  });
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  //alert("current level" + currentLevel);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //console.log("sucess");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 500);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
