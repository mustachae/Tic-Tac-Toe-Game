let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX , PlayerO
let count = 0; //To Track Draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msg.innerText = "";
    msgcontainer.classList.add("hide");
}

const newGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msg.innerText = "";
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
    if (turn0) {
        //playerO
        box.innerText = "O";
        box.style.color = "#00f58b";
        turn0 = false;
    }
    else {
        //playerX
        box.innerText = "X";
        box.style.color = "#b0413e";
        turn0 = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if(count == 9 && !isWinner){
        gameDraw();
    }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Winner is player ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () =>{
    for(let pattern of winPatterns) {
       let pos1 = boxes[pattern[0]].innerText;
       let pos2 = boxes[pattern[1]].innerText;
       let pos3 = boxes[pattern[2]].innerText;

       if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1 == pos2 && pos2 == pos3){
            showWinner(pos1);    
            return true;
        }
       }
    }
}

resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",newGame);