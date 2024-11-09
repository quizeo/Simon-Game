buttonColours=["red","blue","green","yellow"];
gamePattern = [];
var userClickedPattern = [];
var isStarted = false;
var level = 0;

$("#level-title").on("click",function(){
if(!isStarted){

    $("#level-title")
    .css("border", "none")

    $("#level-title")
    .on('mouseenter', function() {
        $(this).css("background", "none");
    });


    nextSequence();
    isStarted = true;
}
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    console.log("randomChosenColour: " + randomChosenColour);
    gamePattern.push(randomChosenColour);
    
 animatePress(randomChosenColour);
playSound(randomChosenColour);
}


$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");  
    console.log( "userChosenColour: " +userChosenColour);
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    console.log("userClickedPattern: " + userClickedPattern.length);

    checkAnswer(userClickedPattern.length-1);

});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    console.log("currentLevel: " + currentLevel);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log(gamePattern[currentLevel] + " " + userClickedPattern[currentLevel])
        console.log("success");
        
        if(gamePattern.length === userClickedPattern.length){
            $("#level-title").text("Level " + level + " - Success!");
            setTimeout(function(){
      
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        $("#level-title")
        .text("Game Over, Click to Start Again")
        .on("mouseenter", function() {
            $(this).css("background", "#00ffa82b");
        })
        .on("mouseleave", function() {
            $(this).css("background", ""); // Reset background on mouse leave
        }) .css("border", "1px solid #fff")
   

        

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);



        startOver()
 
    }   
}

function startOver(){
    level = 0;
    gamePattern = [];
    isStarted = false;
}



















    //     console.log("wrong");
    //     playSound("wrong");
    //     $("body").addClass("game-over");
    //     setTimeout(function(){
    //         $("body").removeClass("game-over");
    //     },200);
    //     $("#level-title").text("Game Over, Press Any Key to Restart");
    //     startOver();