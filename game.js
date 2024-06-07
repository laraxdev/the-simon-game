var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStatus = false;
var gameLevel = 0;

//add start game button
$("button#startGame").click(function () {
  if (gameStatus === false) {
    $("button#startGame").hide();
    nextSequence();
    gameStatus = true;
  }
});

//generate next sequence
function nextSequence() {
  userClickedPattern = [];

  gameLevel++;
  $("h1").text("Level " + gameLevel);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //add animation
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //add sound
  playSound(randomChosenColour);
}

//user click function
$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
});

//sound functions
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//animation function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//check answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    $("h1").text("Game Over, Press 'Start Game' button to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//to start over
function startOver() {
  gameLevel = 0;
  gamePattern = [];
  gameStatus = false;
  $("button#startGame").show();
}
