var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];   //Randomly selected by Math.random
var userClickedPattern = [];  //On clicking the button by user

var level = 0;
var started = 0;  //track of game started or not

$(document).keypress(function () {
if(started ===0 ){
    nextSequence();
    started=1;
}
});

$('.btn').on("click", function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(this);

    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    level++;
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $('.title').html("Level " + level);
}

function playSound(name) {
    var soundFile = "sounds/" + name + ".mp3";
    var audio = new Audio(soundFile);
    audio.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass('pressed');
    setTimeout(function () {
        $(currentColor).removeClass('pressed');
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=0;
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
else{
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over');
    },200);
    $('.title').html("Game over, Press any key to Restart");
    startOver();
}
}


