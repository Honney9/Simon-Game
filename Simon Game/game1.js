let buttonColors=["red","blue","green","yellow"];
let userClickedPattern=[];
let level=0;
let gamePattern=[];
let started=false;

$(document).on("keydown",function(){
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
$(".btn").on("click",function(){
    let userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOVer();
    }
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    let randomNum=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}



function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function startOVer(){
    level=0;
    gamePattern=[];
    started=false;
}