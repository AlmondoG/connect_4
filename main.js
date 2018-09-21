$(document).ready(function() { //adds click handlers after DOM loads
    readyPageFunctions();
});

function readyPageFunctions () {
    $(".resetButton").hide();
    $(".choose-god-page").hide();
    $(window).on("load", function() {
        setTimeout(function() {
            $(".loader").hide();
            $(".choose-god-page").show();
        }, 1000);
    });
    $(".ares").on("click", playerGod);
    $(".artemis").on("click", playerGod);
    $(".athena").on("click", playerGod);
    $(".poseidon").on("click", playerGod);

    $(".col0").on('click', function(){
        columnNumber = 0;
        addToGridArray();
    });

    $(".col1").on('click', function(){
        columnNumber = 1;
        addToGridArray();
    });

    $(".col2").on('click', function(){
        columnNumber = 2;
        addToGridArray();
    });

    $(".col3").on('click', function(){
        columnNumber = 3;
        addToGridArray();
    });

    $(".col4").on('click', function(){
        columnNumber = 4;
        addToGridArray();
    });

    $(".col5").on('click', function(){
        columnNumber = 5;
        addToGridArray();
    });

    $(".col6").on('click', function(){
        columnNumber = 6;
        addToGridArray();
    });

    $(".reset").on('click', function() {
        resetGame();
    });

    $(".toggleAI").on('click', function() {
        toggleAI();
    });

    $(".togglePlayerNumber").on('click', function() {
        togglePlayerMode();
    });

    $(".resetButton").on('click', function() {
        resetButtonReset();
    });

    $('.col').hover(highlight, unHighlight);
}

function highlight() {
    var currentCol = this.classList[1];
    $(`.${currentCol}`).addClass('glow');
}

function unHighlight() {
    var currentCol = this.classList[1];
    $(`.${currentCol}`).removeClass('glow');
}

var playerSwitch = 2;
var playerOneGod = null;
var playerTwoGod = null;
var playerThreeGod = null;
var victoryTrigger = 0;
var gameArray = [[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null]];
var columnNumber = null;
var playerModeToggle = 1;
var toggleAICount = 0;
var drawTrigger = 0;
var godVictoryName = null;
var godTurnName = null;

/* Game modes start */
function togglePlayerMode() {
    $('.title').text("Third Player Summoned. Player One: Select Your Deity.");
    $('.togglePlayerNumber').text("TWO PLAYER MODE");
    playerModeToggle = 1 - playerModeToggle; //if playerModeToggle === 0; three player mode activates; else two player mode;
    if (playerModeToggle === 1) {
        // playScream();
        // playFire();
        $('.title').text("Third Player Sacrificed. Player One: Select Your Deity.");
        $('.togglePlayerNumber').text("THREE PLAYER MODE");
    }
    toggleAICount = 0;
}


function toggleAI() { //toggles whether AI should be on/off    //if toggle ai === 0, then it's off. if toggle ai ===1, it's on
    toggleAICount = 1 - toggleAICount;
    $(".toggleAI, .togglePlayerNumber").hide();
    $(".resetButton").show();
    $('.title').text("Choose your deity and play with the Gods.");
    if (toggleAICount === 0 ) {
        $('.title').text("Player One: Select Your Deity");
    }
    playerModeToggle = 1; //occurs so you can't have player 3 mode on AI
    $('.togglePlayerNumber').text("THREE PLAYER MODE");
};

/* Game modes end */

//Function to assign image class to players
function playerGod() {
    if (playerSwitch === 2) {
        if (playerOneGod === null) {
            playerOneGod = $(this).css("background-image");
        }
    } else if (playerSwitch === 1) {
        if (playerTwoGod === null) {
            playerTwoGod = $(this).css("background-image");
        }
    } else if (playerSwitch === 0 && playerModeToggle === 0) {
        if (playerThreeGod === null) {
            playerThreeGod = $(this).css("background-image");
        }
    }
    $(this).addClass("gray");
    $(this).off("click");
    $(".toggleAI, .togglePlayerNumber").hide();
    $(".resetButton").show();
    if (godTurnName === null) {
        turnName(playerSwitch);
    };
    playerSwitch--;
    if (playerSwitch === 1 && toggleAICount === 0) { //if toggle ai === 0, then it's off. if toggle ai ===1, it's on
        $('.title').text("Player Two: Choose Your Deity");
    } else if (playerSwitch === 0 && toggleAICount === 0) {
        $('.title').text("Player Three: Choose Your Deity");
    }
    if (toggleAICount === 1 && victoryTrigger === 0) { //if AI mode is on, runs function that allows AI to randomly choose god
        aiSelectGod();
    };
    if (playerOneGod != null && playerTwoGod != null && playerThreeGod != null && toggleAICount === 0 || playerOneGod != null && playerTwoGod != null && toggleAICount === 1 || playerOneGod != null && playerTwoGod != null && playerModeToggle === 1) {
        $('.choose-god-page').hide();
        $('.game_area').show();
        $('.gameTitle').text(`${godTurnName} Turn`);
        playerSwitch = 2;
    }
}


function aiSelectGod() { // Allows AI to pick random god after player one chooses god
    var godArray = [$(".ares").css("background-image"), $(".artemis").css("background-image"), $(".athena").css("background-image"), $(".poseidon").css("background-image")];
    if (playerOneGod != null) {
        for (var godCount = 0; godCount < godArray.length; godCount++) {
            if (playerOneGod === godArray[godCount]) {
                godArray.splice(godCount, 1); //removes player one god from godArray so AI doesn't pick undefined god
            }
        }
        var randomGodNum = Math.floor((Math.random() * godArray.length ));
        playerTwoGod = godArray[randomGodNum];
    }
};


/* Core game start */
function addToGridArray() { //function that stores respective player's number into gameArray
    for (var rowCount = gameArray.length-1; rowCount >= 0; rowCount--) {
        if (gameArray[rowCount][columnNumber] === null) {
            if (playerSwitch === 2) {
                gameArray[rowCount][columnNumber] = 2;
                // break;
            } else if (playerSwitch === 1) {
                gameArray[rowCount][columnNumber] = 1;
                // break;
            } else if (playerSwitch === 0 && playerModeToggle === 0) {
                gameArray[rowCount][columnNumber] = 0;
                // break;
            }
            togglePlayers();
            break;
        }
    }

}

function togglePlayers() {
    playerSwitch--;
    if (playerSwitch === 2 || playerSwitch === 1) {
        turnName(playerSwitch);
    } else if (playerSwitch === 0 && playerModeToggle === 0) {
        threePlayerTurnName(playerSwitch);
    }
    checkPowerUpCondition();
    if (playerSwitch === 1){
        $('.gameTitle').text(`${godTurnName} Turn`);
    } else if (playerSwitch === 0 && playerModeToggle === 0){
        $('.gameTitle').text(`${godTurnName} Turn`);
    }
    addGodToGrid();
    if (hadesVictoryToggle === 0) {
        checkWinCondition();
    }
    if (toggleAICount === 1 && playerSwitch === 1 && victoryTrigger !== 1) { //if AI mode is on, runs function that has AI "choose" a column
        aiGridSelect();
    }
    if (playerSwitch === -1 || playerSwitch === 0 && toggleAICount === 1 || playerSwitch === 0 && playerModeToggle === 1) {
        playerSwitch = 2;
        turnName(playerSwitch);
        $('.gameTitle').text(`${godTurnName} Turn`);
    }
}

function aiGridSelect() { //function that allows AI to randomly select a column
    $('.ares, .artemis, .athena, .poseidon, .toggleAI, .togglePlayerNumber, .col').off('click');
    var randomColumnNum = Math.round((Math.random() * 6 ));
    columnNumber = randomColumnNum;
    $('.gameTitle').text("Turn of the Gods");
    setTimeout(aiToGameArray, 1500);
}

function aiToGameArray() {
    addToGridArray();
    readyPageFunctions();
}

function addGodToGrid() { //function that adds player's image to HTML grid depending on gameArray
    for (var rowCount = gameArray.length-1; rowCount >= 0; rowCount--) {
        for (var columnCount = 0; columnCount < gameArray[rowCount].length; columnCount++) {
            if (gameArray[rowCount][columnCount] === 2) {
                var selector = ".row" + rowCount + " .col" + columnCount; //$('.row6 .col0')
                $(selector).css('background-image', playerOneGod);
            } else if (gameArray[rowCount][columnCount] === 1) {
                var selector = ".row" + rowCount + " .col" + columnCount;
                $(selector).css('background-image', playerTwoGod);
            } else if (gameArray[rowCount][columnCount] === 0) {
                var selector = ".row" + rowCount + " .col" + columnCount;
                $(selector).css('background-image', playerThreeGod);
            }
            $(selector).addClass('animated fadeIn').css('-vendor-animation-duration', '3s');
        }
    }
}
/* Core game start */

/*Power up start */

function checkPowerUpCondition() {
    checkFirstPowerUp();
    secondPowerUp(gameArray);
}

var firstPowerUpTrigger = 0; //trigger that gives only one player the first powerup once
function checkFirstPowerUp() { //checks to see if player makes 3 x 3 cross
    if (firstPowerUpTrigger === 0) {
        for (var rowCount = gameArray.length-2; rowCount >=1; rowCount--) {
            for (var columnCount=1; columnCount < gameArray[rowCount].length-1; columnCount++) {
                if (gameArray[rowCount][columnCount] != null && gameArray[rowCount][columnCount] === gameArray[rowCount+1][columnCount] && gameArray[rowCount][columnCount] === gameArray[rowCount-1][columnCount] && gameArray[rowCount][columnCount] === gameArray[rowCount][columnCount+1] && gameArray[rowCount][columnCount] === gameArray[rowCount][columnCount-1]){
                    zeusModal();
                }
            }
        }
    }
}

function zeusModal() {
    $(".zeus-modal").removeClass("hidden-modal");
    $(".zeus-modal-text").text("Praise Zeus mortal, for he has granted you one more move!").css("text-shadow", "0 0 1px black");
    firstPowerUpTrigger = 1;
    playerSwitch++;
    $(".zeus-modal").on("click", hideZeus);
}

function hideZeus() {
    $(".zeus-modal").addClass("hidden-modal");
}

function secondPowerUp(someArray){
    for(var checkRow = someArray.length-1; checkRow >= 2; checkRow--){
        for(var checkX = 0; checkX <= 4; checkX++){
            if(someArray[checkRow][checkX] !== null && someArray[checkRow][checkX] === someArray[checkRow-1][checkX+1] && someArray[checkRow-1][checkX+1] === someArray[checkRow-2][checkX+2] && someArray[checkRow-2][checkX+2] === someArray[checkRow-2][checkX] && someArray[checkRow-2][checkX] === someArray[checkRow][checkX+2]){
                hadesModal();
            }
        }
    }
}

var hadesVictoryToggle = 0;
function hadesModal(){
    playFire();
    hadesVictoryToggle = 1;
    $('.hades-modal-shadow').removeClass('hidden-modal');
    $('.hades-text').text('You created a X, summoning Hades and comdemning us all to the Underworld!');
}

/*Power up end */

/* Win Condition checker start */
function checkWinCondition() {
    checkHorizontalWin(gameArray);
    checkVerticalWin(gameArray);
    checkDiagonalWin(gameArray);
    checkDraw();
}

function checkHorizontalWin(someArray){
    var winningPlayer = playerSwitch;

    for(var checkRow = someArray.length-1; checkRow >= 0; checkRow--){
        for(var checkInnerRow = 0; checkInnerRow < someArray[checkRow].length; checkInnerRow++){
            if(someArray[checkRow][checkInnerRow] != null && someArray[checkRow][checkInnerRow] === someArray[checkRow][checkInnerRow + 1] && someArray[checkRow][checkInnerRow + 1] === someArray[checkRow][checkInnerRow + 2] && someArray[checkRow][checkInnerRow + 2] === someArray[checkRow][checkInnerRow + 3]){
                $('.gameTitle').text("The Game Is Over");
                $(".col0").off("click");
                $(".col1").off("click");
                $(".col2").off("click");
                $(".col3").off("click");
                $(".col4").off("click");
                $(".col5").off("click");
                $(".col6").off("click");
                victoryTrigger = 1;
                console.log($(`.row${checkRow} .col${checkInnerRow}`).css("background-image"));
                var newBackground = $(`.row${checkRow} .col${checkInnerRow}`).css("background-image");
                var newerBackground = newBackground.replace('url(','').replace(')','').replace(/\"/gi, "");
                console.log(newerBackground);
                if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Athena.jpg") {
                    $(`.row${checkRow} .col${checkInnerRow}`).addClass("athenaWins");
                    $(`.row${checkRow} .col${checkInnerRow + 1}`).addClass("athenaWins");
                    $(`.row${checkRow} .col${checkInnerRow + 2}`).addClass("athenaWins");
                    $(`.row${checkRow} .col${checkInnerRow + 3}`).addClass("athenaWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Poseidon.jpg") {
                    $(`.row${checkRow} .col${checkInnerRow}`).addClass("poseidonWins");
                    $(`.row${checkRow} .col${checkInnerRow + 1}`).addClass("poseidonWins");
                    $(`.row${checkRow} .col${checkInnerRow + 2}`).addClass("poseidonWins");
                    $(`.row${checkRow} .col${checkInnerRow + 3}`).addClass("poseidonWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Artemis.jpg") {
                    $(`.row${checkRow} .col${checkInnerRow}`).addClass("artemisWins");
                    $(`.row${checkRow} .col${checkInnerRow + 1}`).addClass("artemisWins");
                    $(`.row${checkRow} .col${checkInnerRow + 2}`).addClass("artemisWins");
                    $(`.row${checkRow} .col${checkInnerRow + 3}`).addClass("artemisWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Ares.jpg") {
                    $(`.row${checkRow} .col${checkInnerRow}`).addClass("aresWins");
                    $(`.row${checkRow} .col${checkInnerRow + 1}`).addClass("aresWins");
                    $(`.row${checkRow} .col${checkInnerRow + 2}`).addClass("aresWins");
                    $(`.row${checkRow} .col${checkInnerRow + 3}`).addClass("aresWins");
                }
                setTimeout(function() {
                    modalWin(winningPlayer);
                }, 1500);
                // modalWin();
            }
        }
    }
}
function checkVerticalWin(someArray){
    var winningPlayer = playerSwitch;

    for(var checkRow = someArray.length-1; checkRow >= 4; checkRow--){
        for(var checkInnerRow = 0; checkInnerRow < someArray[checkRow].length; checkInnerRow++){
            if(someArray[checkRow][checkInnerRow] != null && someArray[checkRow][checkInnerRow] === someArray[checkRow-1][checkInnerRow] && someArray[checkRow-1][checkInnerRow] === someArray[checkRow-2][checkInnerRow] && someArray[checkRow-2][checkInnerRow] === someArray[checkRow-3][checkInnerRow]){
                $('.gameTitle').text("The Game Is Over");
                $(".col0").off("click");
                $(".col1").off("click");
                $(".col2").off("click");
                $(".col3").off("click");
                $(".col4").off("click");
                $(".col5").off("click");
                $(".col6").off("click");
                victoryTrigger = 1;
                console.log($(`.row${checkRow} .col${checkInnerRow}`).css("background-image"));
                var newBackground = $(`.row${checkRow} .col${checkInnerRow}`).css("background-image");
                var newerBackground = newBackground.replace('url(','').replace(')','').replace(/\"/gi, "");
                console.log(newerBackground);
                if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Athena.jpg") {
                    $(`.row${checkRow} .col${checkInnerRow}`).addClass("athenaWins");
                    $(`.row${checkRow - 1} .col${checkInnerRow}`).addClass("athenaWins");
                    $(`.row${checkRow - 2} .col${checkInnerRow}`).addClass("athenaWins");
                    $(`.row${checkRow - 3} .col${checkInnerRow}`).addClass("athenaWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Poseidon.jpg") {
                    $(`.row${checkRow} .col${checkInnerRow}`).addClass("poseidonWins");
                    $(`.row${checkRow - 1} .col${checkInnerRow}`).addClass("poseidonWins");
                    $(`.row${checkRow - 2} .col${checkInnerRow}`).addClass("poseidonWins");
                    $(`.row${checkRow - 3} .col${checkInnerRow}`).addClass("poseidonWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Artemis.jpg") {
                    $(`.row${checkRow} .col${checkInnerRow}`).addClass("artemisWins");
                    $(`.row${checkRow - 1} .col${checkInnerRow}`).addClass("artemisWins");
                    $(`.row${checkRow - 2} .col${checkInnerRow}`).addClass("artemisWins");
                    $(`.row${checkRow - 3} .col${checkInnerRow}`).addClass("artemisWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Ares.jpg") {
                    $(`.row${checkRow} .col${checkInnerRow}`).addClass("aresWins");
                    $(`.row${checkRow - 1} .col${checkInnerRow}`).addClass("aresWins");
                    $(`.row${checkRow - 2} .col${checkInnerRow}`).addClass("aresWins");
                    $(`.row${checkRow - 3} .col${checkInnerRow}`).addClass("aresWins");
                }
                setTimeout(function() {
                    modalWin(winningPlayer);
                }, 1500);
                // modalWin();
            }
        }
    }
}
function checkDiagonalWin(someArray){
    var winningPlayer = playerSwitch;

    for(var checkRow = someArray.length-1; checkRow >= 4; checkRow--){
        for(var checkInnerRowUpRight = 0; checkInnerRowUpRight < 4; checkInnerRowUpRight++){
            if(someArray[checkRow][checkInnerRowUpRight] !== null && someArray[checkRow][checkInnerRowUpRight] === someArray[checkRow-1][checkInnerRowUpRight+1] && someArray[checkRow-1][checkInnerRowUpRight+1] === someArray[checkRow-2][checkInnerRowUpRight+2] && someArray[checkRow-2][checkInnerRowUpRight+2] === someArray[checkRow-3][checkInnerRowUpRight+3]){
                $('.gameTitle').text("The Game Is Over");
                $(".col0").off("click");
                $(".col1").off("click");
                $(".col2").off("click");
                $(".col3").off("click");
                $(".col4").off("click");
                $(".col5").off("click");
                $(".col6").off("click");
                victoryTrigger = 1;
                console.log($(`.row${checkRow} .col${checkInnerRowUpRight}`).css("background-image"));
                var newBackground = $(`.row${checkRow} .col${checkInnerRowUpRight}`).css("background-image");
                var newerBackground = newBackground.replace('url(','').replace(')','').replace(/\"/gi, "");
                console.log(newerBackground);
                if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Athena.jpg") {
                    $(`.row${checkRow} .col${checkInnerRowUpRight}`).addClass("athenaWins");
                    $(`.row${checkRow - 1} .col${checkInnerRowUpRight + 1}`).addClass("athenaWins");
                    $(`.row${checkRow - 2} .col${checkInnerRowUpRight + 2}`).addClass("athenaWins");
                    $(`.row${checkRow - 3} .col${checkInnerRowUpRight + 3}`).addClass("athenaWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Poseidon.jpg") {
                    $(`.row${checkRow} .col${checkInnerRowUpRight}`).addClass("poseidonWins");
                    $(`.row${checkRow - 1} .col${checkInnerRowUpRight + 1}`).addClass("poseidonWins");
                    $(`.row${checkRow - 2} .col${checkInnerRowUpRight + 2}`).addClass("poseidonWins");
                    $(`.row${checkRow - 3} .col${checkInnerRowUpRight + 3}`).addClass("poseidonWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Artemis.jpg") {
                    $(`.row${checkRow} .col${checkInnerRowUpRight}`).addClass("artemisWins");
                    $(`.row${checkRow - 1} .col${checkInnerRowUpRight + 1}`).addClass("artemisWins");
                    $(`.row${checkRow - 2} .col${checkInnerRowUpRight + 2}`).addClass("artemisWins");
                    $(`.row${checkRow - 3} .col${checkInnerRowUpRight + 3}`).addClass("artemisWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Ares.jpg") {
                    $(`.row${checkRow} .col${checkInnerRowUpRight}`).addClass("aresWins");
                    $(`.row${checkRow - 1} .col${checkInnerRowUpRight + 1}`).addClass("aresWins");
                    $(`.row${checkRow - 2} .col${checkInnerRowUpRight + 2}`).addClass("aresWins");
                    $(`.row${checkRow - 3} .col${checkInnerRowUpRight + 3}`).addClass("aresWins");
                }
                setTimeout(function() {
                    modalWin(winningPlayer);
                }, 1500);
                // modalWin();
            }
        }
        for(var checkInnerRowUpLeft = someArray[checkRow].length-1; checkInnerRowUpLeft >=0; checkInnerRowUpLeft--){
            if(someArray[checkRow][checkInnerRowUpLeft] !== null && someArray[checkRow][checkInnerRowUpLeft] === someArray[checkRow-1][checkInnerRowUpLeft-1] && someArray[checkRow-1][checkInnerRowUpLeft-1] === someArray[checkRow-2][checkInnerRowUpLeft-2] && someArray[checkRow-2][checkInnerRowUpLeft-2] === someArray[checkRow-3][checkInnerRowUpLeft-3]){
                $('.gameTitle').text("The Game Is Over");
                $(".col0").off("click");
                $(".col1").off("click");
                $(".col2").off("click");
                $(".col3").off("click");
                $(".col4").off("click");
                $(".col5").off("click");
                $(".col6").off("click");
                victoryTrigger = 1;
                console.log($(`.row${checkRow} .col${checkInnerRowUpLeft}`).css("background-image"));
                var newBackground = $(`.row${checkRow} .col${checkInnerRowUpLeft}`).css("background-image");
                var newerBackground = newBackground.replace('url(','').replace(')','').replace(/\"/gi, "");
                console.log(newerBackground);
                if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Athena.jpg") {
                    $(`.row${checkRow} .col${checkInnerRowUpLeft}`).addClass("athenaWins");
                    $(`.row${checkRow - 1} .col${checkInnerRowUpLeft - 1}`).addClass("athenaWins");
                    $(`.row${checkRow - 2} .col${checkInnerRowUpLeft - 2}`).addClass("athenaWins");
                    $(`.row${checkRow - 3} .col${checkInnerRowUpLeft - 3}`).addClass("athenaWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Poseidon.jpg") {
                    $(`.row${checkRow} .col${checkInnerRowUpLeft}`).addClass("poseidonWins");
                    $(`.row${checkRow - 1} .col${checkInnerRowUpLeft - 1}`).addClass("poseidonWins");
                    $(`.row${checkRow - 2} .col${checkInnerRowUpLeft - 2}`).addClass("poseidonWins");
                    $(`.row${checkRow - 3} .col${checkInnerRowUpLeft - 3}`).addClass("poseidonWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Artemis.jpg") {
                    $(`.row${checkRow} .col${checkInnerRowUpLeft}`).addClass("artemisWins");
                    $(`.row${checkRow - 1} .col${checkInnerRowUpLeft - 1}`).addClass("artemisWins");
                    $(`.row${checkRow - 2} .col${checkInnerRowUpLeft - 2}`).addClass("artemisWins");
                    $(`.row${checkRow - 3} .col${checkInnerRowUpLeft - 3}`).addClass("artemisWins");
                } else if(newerBackground === "https://aghanimati.com/ancient-greek-connect/Images/Ares.jpg") {
                    $(`.row${checkRow} .col${checkInnerRowUpLeft}`).addClass("aresWins");
                    $(`.row${checkRow - 1} .col${checkInnerRowUpLeft - 1}`).addClass("aresWins");
                    $(`.row${checkRow - 2} .col${checkInnerRowUpLeft - 2}`).addClass("aresWins");
                    $(`.row${checkRow - 3} .col${checkInnerRowUpLeft - 3}`).addClass("aresWins");
                }
                setTimeout(function() {
                    modalWin(winningPlayer);
                }, 1500);
                // modalWin();
            }
        }
    }
}


function checkDraw() {
    var drawCount = 0;
    for(var checkRow = gameArray.length-1; checkRow >= 0; checkRow--){
        for(var checkInnerRow = 0; checkInnerRow < gameArray[checkRow].length; checkInnerRow++){
            if (gameArray[checkRow][checkInnerRow] != null) {
                drawCount++;
            }
        }
    }
    if (drawCount === 49) {
        drawTrigger = 1;
        modalWin();
    }
}

/*Win condition checker end */
//Modal display, hide, and exit functions
function modalWin(winningPlayer) {
    var playerSwitchLocal = winningPlayer;
    // playChoir()
    victoryTrigger = 1; //disables ai from making actions
    $('.gameTitle').text("The Game Is Over");
    victoryName(playerSwitchLocal);
    if (drawTrigger === 1 ) {
        $(".modal-shadow").removeClass("hidden-modal");
        $(".modal-text").text("Draw!!!");
    } else if (playerSwitchLocal === 1) {
        $(".modal-shadow").removeClass("hidden-modal");
        $(".modal-text").text(godVictoryName + " Wins!!!");
    } else if (playerSwitchLocal === 0 && toggleAICount === 1) {
        $(".modal-shadow").removeClass("hidden-modal");
        $(".modal-text").text("The Gods Win!!!");
    } else if (playerSwitchLocal === 0 && toggleAICount === 0) {
        $(".modal-shadow").removeClass("hidden-modal");
        $(".modal-text").text(godVictoryName + " Wins!!!");
    } else if (playerSwitchLocal === -1) {
        $(".modal-shadow").removeClass("hidden-modal");
        $(".modal-text").text(godVictoryName + " Wins!!!");
    }
}

function victoryName(playerSwitchNum) { // Function that chooses which player's deity to display
    var nameArray = [$(".ares").css("background-image"), $(".artemis").css("background-image"), $(".athena").css("background-image"), $(".poseidon").css("background-image")];
    var nameArrayCheck = null;
    if (playerSwitchNum === 1) { //Checks which player won the game
        nameArrayCheck = playerOneGod;
    } else if (playerSwitchNum === 0) {
        nameArrayCheck = playerTwoGod;
    } else if (playerSwitchNum === -1) {
        nameArrayCheck = playerThreeGod;
    }
    if (nameArrayCheck === nameArray[0]) { //checks what deity the player choose to display the matching deity
        godVictoryName = 'Ares';
    } else if (nameArrayCheck === nameArray[1]) {
        godVictoryName = 'Artemis';
    } else if (nameArrayCheck === nameArray[2]) {
        godVictoryName = 'Athena';
    } else if (nameArrayCheck === nameArray[3]) {
        godVictoryName = 'Poseidon';
    }
}

function resetGame() { //function that resets the game, including player gods and game grid
    if (playerModeToggle === 0 && toggleAICount === 0) {
        playerOneGod = null;
        playerTwoGod = null;
        playerThreeGod = null;
        playerSwitch = 2;
        toggleAICount = 0;
        victoryTrigger = 0;
        playerModeToggle = 1;
        drawTrigger = 0;
        firstPowerUpTrigger = 0;
        hadesVictoryToggle = 0;
        godTurnName = null;
        $('.col').css('background-image', 'none').removeClass('animated fadeIn');
        $(".col").removeClass("athenaWins");
        $(".col").removeClass("aresWins");
        $(".col").removeClass("artemisWins");
        $(".col").removeClass("poseidonWins");
        for (var rowCount = 0; rowCount < gameArray.length; rowCount++) {
            for (var colCount = 0; colCount < gameArray[rowCount].length; colCount++) {
                if (gameArray[rowCount][colCount] != null) {
                    gameArray[rowCount][colCount] = null;
                }
            }
        }
        $('.ares, .artemis, .athena, .poseidon, .toggleAI, .togglePlayerNumber, .col').off('click').removeClass("gray"); //removes all click handlers
        readyPageFunctions();   //re-adds all click handlers
        $(".modal-shadow").addClass("hidden-modal");
        $('.choose-god-page').show();
        $('.game_area').hide();
        $(".resetButton").hide();
        $('.hades-modal-shadow').addClass('hidden-modal');
        togglePlayerMode();
        $(".toggleAI, .togglePlayerNumber").show();
    }
    if (playerModeToggle === 1 && toggleAICount === 1) {
        playerOneGod = null;
        playerTwoGod = null;
        playerThreeGod = null;
        playerSwitch = 2;
        toggleAICount = 0;
        victoryTrigger = 0;
        playerModeToggle = 1;
        drawTrigger = 0;
        firstPowerUpTrigger = 0;
        hadesVictoryToggle = 0;
        godTurnName = null;
        $('.col').css('background-image', 'none').removeClass('animated fadeIn');
        $(".col").removeClass("athenaWins");
        $(".col").removeClass("aresWins");
        $(".col").removeClass("artemisWins");
        $(".col").removeClass("poseidonWins");
        for (var rowCount = 0; rowCount < gameArray.length; rowCount++) {
            for (var colCount = 0; colCount < gameArray[rowCount].length; colCount++) {
                if (gameArray[rowCount][colCount] != null) {
                    gameArray[rowCount][colCount] = null;
                }
            }
        }
        $('.ares, .artemis, .athena, .poseidon, .toggleAI, .togglePlayerNumber, .col').off('click').removeClass("gray"); //removes all click handlers
        readyPageFunctions();   //re-adds all click handlers
        $(".modal-shadow").addClass("hidden-modal");
        $('.choose-god-page').show();
        $('.game_area').hide();
        $(".resetButton").hide();
        $('.hades-modal-shadow').addClass('hidden-modal');
        toggleAI();
    }
    if (playerModeToggle === 1 && toggleAICount === 0) {
        playerOneGod = null;
        playerTwoGod = null;
        playerThreeGod = null;
        playerSwitch = 2;
        toggleAICount = 0;
        victoryTrigger = 0;
        playerModeToggle = 1;
        drawTrigger = 0;
        firstPowerUpTrigger = 0;
        hadesVictoryToggle = 0;
        godTurnName = null;
        $('.col').css('background-image', 'none').removeClass('animated fadeIn');
        $(".col").removeClass("athenaWins");
        $(".col").removeClass("aresWins");
        $(".col").removeClass("artemisWins");
        $(".col").removeClass("poseidonWins");
        for (var rowCount = 0; rowCount < gameArray.length; rowCount++) {
            for (var colCount = 0; colCount < gameArray[rowCount].length; colCount++) {
                if (gameArray[rowCount][colCount] != null) {
                    gameArray[rowCount][colCount] = null;
                }
            }
        }
        $('.ares, .artemis, .athena, .poseidon, .toggleAI, .togglePlayerNumber, .col').off('click').removeClass("gray"); //removes all click handlers
        readyPageFunctions();   //re-adds all click handlers
        $(".modal-shadow").addClass("hidden-modal");
        $('.choose-god-page').show();
        $('.game_area').hide();
        $(".resetButton").hide();
        $('.title').text("Player One: Choose Your Diety");
        $('.hades-modal-shadow').addClass('hidden-modal');
        $(".toggleAI, .togglePlayerNumber").show();
        $('.togglePlayerNumber').text("THREE PLAYER MODE");
    }
}

function playScream() {
    $(".scream")[0].play();

};
function playFire() {
    $(".fire")[0].play();
}
function playChoir() {
    $(".choir")[0].play();
}


function turnName(playerSwitchNum) { // Function that chooses which player's deity to display
    var nameArray = [$(".ares").css("background-image"), $(".artemis").css("background-image"), $(".athena").css("background-image"), $(".poseidon").css("background-image")];
    var nameArrayCheck = null;
    if (playerSwitchNum === 2) { //Checks which player's turn it is
        nameArrayCheck = playerOneGod;
    } else if (playerSwitchNum === 1) {
        nameArrayCheck = playerTwoGod;
    }
    if (nameArrayCheck === nameArray[0]) { //checks what deity the player choose to display the matching deity
        godTurnName = "Ares'";
    } else if (nameArrayCheck === nameArray[1]) {
        godTurnName = "Artemis'";
    } else if (nameArrayCheck === nameArray[2]) {
        godTurnName = "Athena's";
    } else if (nameArrayCheck === nameArray[3]) {
        godTurnName = "Poseidon's";
    }
}

function threePlayerTurnName(playerSwitchNum) {
    var nameArray = [$(".ares").css("background-image"), $(".artemis").css("background-image"), $(".athena").css("background-image"), $(".poseidon").css("background-image")];
    var nameArrayCheck = null;
    if (playerSwitchNum === 2) {
        nameArrayCheck = playerOneGod;
    } else if (playerSwitchNum === 1) {
        nameArrayCheck = playerTwoGod;
    } else if (playerSwitchNum === 0) {
        nameArrayCheck = playerThreeGod;
    }
    if (nameArrayCheck === nameArray[0]) {
        godTurnName = "Ares'";
    } else if (nameArrayCheck === nameArray[1]) {
        godTurnName = "Artemis'";
    } else if (nameArrayCheck === nameArray[2]) {
        godTurnName = "Athena's";
    } else if (nameArrayCheck === nameArray[3]) {
        godTurnName = "Poseidon's";
    }
}

function resetButtonReset() {
    playerOneGod = null;
    playerTwoGod = null;
    playerThreeGod = null;
    playerSwitch = 2;
    toggleAICount = 0;
    victoryTrigger = 0;
    playerModeToggle = 1;
    drawTrigger = 0;
    firstPowerUpTrigger = 0;
    hadesVictoryToggle = 0;
    godTurnName = null;
    $('.col').css('background-image', 'none').removeClass('animated fadeIn');
    $(".col").removeClass("athenaWins");
    $(".col").removeClass("aresWins");
    $(".col").removeClass("artemisWins");
    $(".col").removeClass("poseidonWins");
    for (var rowCount = 0; rowCount < gameArray.length; rowCount++) {
        for (var colCount = 0; colCount < gameArray[rowCount].length; colCount++) {
            if (gameArray[rowCount][colCount] != null) {
                gameArray[rowCount][colCount] = null;
            }
        }
    }
    $('.ares, .artemis, .athena, .poseidon, .toggleAI, .togglePlayerNumber, .col').off('click').removeClass("gray"); //removes all click handlers
    readyPageFunctions();   //re-adds all click handlers
    $(".modal-shadow").addClass("hidden-modal");
    $('.choose-god-page').show();
    $('.game_area').hide();
    $(".resetButton").hide();
    $('.title').text("Player One: Choose Your Diety");
    $('.hades-modal-shadow').addClass('hidden-modal');
    $(".toggleAI, .togglePlayerNumber").show();
    $('.togglePlayerNumber').text("THREE PLAYER MODE");
}