let boxes = document.querySelectorAll(".box");
let newGamebtn = document.getElementById("btn");
let game_info = document.getElementById("game_info");

let currentPlayer;
let gameGrid;

let winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty krna h boxes ko
    boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove("bg-green-500");
    })
    newGamebtn.classList.add("hidden");
    game_info.textContent = `Current Player: ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    //change in UI
    game_info.textContent = `Current Player: ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        //all three boxes should be non empty and must have same value
        if((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") && (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            //check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "0";

            
            
            //now we know X/0 is winner
            boxes[position[0]].classList.add("bg-green-500");
            boxes[position[1]].classList.add("bg-green-500");
            boxes[position[2]].classList.add("bg-green-500");
        }
    });
    if(answer !== ""){
        game_info.textContent = `Winner Player: ${answer}`;
        newGamebtn.classList.remove("hidden");
        return;
    }

    //let check fill count
    let fillCount = 0;
    boxes.forEach((box) => {
        if(box.textContent !== "")
        fillCount++;
    });
    //condition for tied game
    if(fillCount === 9){
        game_info.textContent = "Game Tied!";
        newGamebtn.classList.remove("hidden");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].textContent = currentPlayer;  //UI me change
        gameGrid[index] = currentPlayer;           //backend me add
        //swap the turn
        swapTurn();
        //check if game over
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })    
});

newGamebtn.addEventListener("click", initGame);