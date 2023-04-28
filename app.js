//Global letiables Declaration
let container = document.querySelector(".container");
let imgNumber;
let colIndex;
let leftPosition;
let topPosition;
let emoji;
const colEmptyHeight = new Array(12).fill(850);
let seconds;
let falling;
let rowIndex;
const emojiGrid = new Array(18);
let imgScore;
let startBtn = document.querySelector(".startBtn");


// Function To Ask Player For a Nickname Between 3 to 8 Characters 
function greetingPlayer(){
    let greetingPhrase = document.querySelector("#greetingPhrase");
    let playerNickName = prompt(`Please enter a Nickname : 
    (Nick must be between 3 to 8 characters)`);
    while (playerNickName == null || playerNickName.trim().length < 3 || playerNickName.trim().length > 8){
        playerNickName = prompt(`You must enter Nickname to be able to start the game : 
        (Nick must be between 3 to 8 characters)`);
    };
    greetingPhrase.innerText = `Welcome ${playerNickName}`;
}

//Function To Choose a Random  Emoji Image, Style It, And Position It
function CreateEmoji(){
    imgNumber = Math.ceil(Math.random() * 5);
    emoji.src=`images/${imgNumber}.png`;
    imgScore = document.querySelector(`#s${imgNumber}`);
    emoji.classList.add("block");
    container.appendChild(emoji);
    colIndex = Math.floor(Math.random() * 12);
    leftPosition = colIndex *50;
    emoji.style.left = `${leftPosition}px`
}

// This function initialize the grid columns
function EmojiGridCol(){
    for(let i = 0; i < emojiGrid.length; i++){
        emojiGrid[i] = new Array(12); 
    }
}

/*This Function Makes The Emoji Keep Falling Untill It Reachs The Container Bottom Or The Frist Emoji
Below It*/
function FallingEmoji(){
    emoji = document.createElement("img");
    topPosition = 0;
    
    CreateEmoji();
    
    falling = setInterval(() => {
        if(seconds > 0){
            topPosition += 1;
        }
        else{
            clearInterval(falling);
        }
        if (topPosition > colEmptyHeight[colIndex]){
            topPosition = colEmptyHeight[colIndex];
            emoji.style.top = `${topPosition}px`;
            colEmptyHeight[colIndex] -= 50;
            rowIndex = (850 - topPosition) / 50;
            emojiGrid[rowIndex][colIndex] = emoji;
            RemoveEmoji();
            clearInterval(falling);
            FallingEmoji();
        }
        else{
            emoji.style.top = `${topPosition}px`;
        };
    }, 1);
}

//Function To Control The Falling Emoji Movement
function Movement(){
    document.onkeydown = function(e){
        if (topPosition < 850){
            if(e.code == "ArrowRight" && colIndex < 11 && topPosition < colEmptyHeight[colIndex] && topPosition < colEmptyHeight[colIndex+1]){
                colIndex += 1;
                leftPosition += 50;
                emoji.style.left = `${leftPosition}px`
            }
            else if(e.code == "ArrowLeft" && colIndex > 0 && topPosition < colEmptyHeight[colIndex] && topPosition < colEmptyHeight[colIndex-1]){
                colIndex -= 1;
                leftPosition -= 50;
                emoji.style.left = `${parseInt(leftPosition)}px`
            }
            else if (e.code == "ArrowDown"  && topPosition < colEmptyHeight[colIndex]){
                topPosition +=50
                emoji.style.top = `${topPosition}p`;
            }
        }
    }
}

//These Functions Check The Different Directions Around The Current Emoji 
function CheckLeft(){
    if(emojiGrid[rowIndex][colIndex - 1] != null && emojiGrid[rowIndex][colIndex - 2] != null){
        if(emojiGrid[rowIndex][colIndex].src == emojiGrid[rowIndex][colIndex - 1].src && emojiGrid[rowIndex][colIndex - 1].src == emojiGrid[rowIndex][colIndex - 2].src){
            return "Left";
        }
        else{
           return CheckRight();
        }
    }
    else{
        return CheckRight();
    }
}

function CheckRight(){
    if(emojiGrid[rowIndex][colIndex + 1] != null && emojiGrid[rowIndex][colIndex + 2] != null){
        if(emojiGrid[rowIndex][colIndex].src == emojiGrid[rowIndex][colIndex + 1].src && emojiGrid[rowIndex][colIndex + 1].src == emojiGrid[rowIndex][colIndex + 2].src){
            return "Right";
        }
        else{
           return CheckBottom();
        }
    }
    else{
       return CheckBottom();
    }
}

function CheckBottom(){
    if(rowIndex > 1){
        if(emojiGrid[rowIndex - 1][colIndex] != null && emojiGrid[rowIndex - 2][colIndex] != null){
            if(emojiGrid[rowIndex][colIndex].src == emojiGrid[rowIndex - 1][colIndex].src && emojiGrid[rowIndex - 1][colIndex].src == emojiGrid[rowIndex - 2][colIndex].src){
                return "Bottom";
            }
        }
    }
}

//This Function Check if Emojis Are Matched 
function EmojiMatching(){
    if(emojiGrid[rowIndex][colIndex - 1] != null && emojiGrid[rowIndex][colIndex + 1] != null){
        if(emojiGrid[rowIndex][colIndex].src == emojiGrid[rowIndex][colIndex - 1].src && emojiGrid[rowIndex][colIndex - 1].src == emojiGrid[rowIndex][colIndex + 1].src){
            return "Middle";
        }
        else{
           return CheckLeft();
        } 
    }
    else{
       return CheckLeft();
    }
}

// This Function Make The Required Changes After 3 Emojies of The Same Type Aligned Vertically Or Horizontally
function Reaction(indexOne,indexTwo,indexThree){
    emojiGrid[rowIndex][indexOne].remove();
    emojiGrid[rowIndex][indexTwo].remove();
    emojiGrid[rowIndex][indexThree].remove();
    emojiGrid[rowIndex].splice(indexOne,1,null);  
    emojiGrid[rowIndex].splice(indexTwo,1,null);
    emojiGrid[rowIndex].splice(indexThree,1,null);
    colEmptyHeight[indexOne] += 50;
    colEmptyHeight[indexTwo] += 50;
    colEmptyHeight[indexThree] += 50;
    if(emojiGrid[rowIndex + 1][indexTwo] != null || emojiGrid[rowIndex + 1][indexThree] != null){
        let counter;
        for (let i = 1; i < 18; i++){
            if(emojiGrid[rowIndex + i][indexTwo] != null){
                counter = i;
                emojiGrid[rowIndex + i][indexTwo].style.top = `${parseInt(emojiGrid[rowIndex + i][indexTwo].style.top) + 50}px`;
                emojiGrid[rowIndex + i - 1].splice(indexTwo,1,emojiGrid[rowIndex + i][indexTwo]);
            }
            if(emojiGrid[rowIndex + i][indexThree] != null){
                counter = i;
                emojiGrid[rowIndex + i][indexThree].style.top = `${parseInt(emojiGrid[rowIndex + i][indexThree].style.top) + 50}px`;
                emojiGrid[rowIndex + i - 1].splice(indexThree,1,emojiGrid[rowIndex + i][indexThree]);
            }
            if(counter < i){
                break;
            }
        }
    }
    imgScore.innerText = `${Number(imgScore.innerText)+1}`
}

//This Function Removes Emojis When 3 Of The Same Type Aligned Vertically Or Horizontally And Record Score
function RemoveEmoji(){
    switch (EmojiMatching()){
        case 'Middle':
            Reaction(colIndex, colIndex - 1, colIndex + 1);
            break;
        case 'Left':
            Reaction(colIndex, colIndex - 1, colIndex - 2);
            break;
        case 'Right':
            Reaction(colIndex, colIndex + 1, colIndex + 2);
            break;
        case 'Bottom':
            emojiGrid[rowIndex][colIndex].remove();
            emojiGrid[rowIndex - 1][colIndex].remove();
            emojiGrid[rowIndex - 2][colIndex].remove();
            emojiGrid[rowIndex].splice(colIndex,1,null);  
            emojiGrid[rowIndex - 1].splice(colIndex,1,null)
            emojiGrid[rowIndex - 2].splice(colIndex,1,null)
            colEmptyHeight[colIndex] += 150;
            imgScore.innerText = `${Number(imgScore.innerText)+1}`
            break;
    }
}

//Function To Countdown 2 Minutes
function CountDown(){
    let stopWatch = document.querySelector(".stopWatch");
     seconds = 120;

        FallingEmoji()

        Movement();

    let timer = setInterval(() => {
        seconds -= 1 ;
        stopWatch.innerText = `${Math.floor(seconds/60)}:${seconds%60}`
        if (seconds == 0){
            clearInterval(timer)
            console.log(emojiGrid)
        };
    }, 1000);
}

//Function to stop the game when reaching the end of the container
function GameOver(falling){
    for (let i = 0; i < colEmptyHeight.length; i++){
        if (colEmptyHeight[i] == -50){
            clearInterval(falling)
            alert("GameOver");
        }
    }
}

greetingPlayer()

//Start Button Event
startBtn.onclick = function () {
    startBtn.disabled = true;
    EmojiGridCol();
    CountDown();
} 

