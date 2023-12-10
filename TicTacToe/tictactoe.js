document.addEventListener('DOMContentLoaded', function () {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGame = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turn0 = true; //playerX,playerO

    // 2D array
    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const resetGame = () => {
        turn0 = true;
        enableBoxes();
        msgContainer.classList.add("hide");
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("box was clicked");
            if (turn0) {
                // player O turn
                box.innerText = "O";
                turn0 = false;
            } else {
                // player X turn
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;
            checkWinner();
        });
    });

    const disableBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    };

    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };

    const checkWinner = () => {
        for (pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    console.log("winner", pos1Val);
                    showWinner(pos1Val);
                }
            }
        }
    };

    newGame.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
});
