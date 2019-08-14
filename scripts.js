(function () {
    var currentPlayer = "player1";
    var turn = "Player 1";
    var diagonals = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ];

    $("#refresh-btn").on("click", function () {
        location.reload();
    });

    $(".colum").on("click", function (e) {

        var slotInCol = $(e.currentTarget).find(".slot");

        for (var i = 5; i >= 0; i--) {

            if (
                !slotInCol.eq(i).hasClass("player1") &&
                !slotInCol.eq(i).hasClass("player2")
            ) {
                console.log("just i by itself: ", i);
                slotInCol.eq(i).addClass(currentPlayer);
                break;
            } // closes if block
        } //closes for-loop
        if (i === -1) {
            return;
        } //makes sure that if a full colum is clicked, the player wont be switched.

        console.log("$('.row' + i): Was isr das", $(".row" + i));

        verticalVictoryCheck(slotInCol);
        horizontalVictoryCheck($(".row" + i));
        diagonalVictoryCheck();
        switchPlayer();
    }); // closes click-event

    function verticalVictoryCheck(slots) {
        var counter = 0;

        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                counter++;

                if (counter === 4) {

                    slots.eq(i).addClass("win animated bounceOutLeft delay-1s");
                    slots.eq(i - 1).addClass("win animated bounceOutLeft delay-1s");
                    slots.eq(i - 2).addClass("win animated bounceOutLeft delay-1s");
                    slots.eq(i - 3).addClass("win animated bounceOutLeft delay-1s");
                    modal();
                }
            } else {
                counter = 0;
            } // closes else
        } // closes for-loop
    } // closes verticalVictoryCheck

    function horizontalVictoryCheck(row) {

        var counter = 0;
        for (var i = 0; i < row.length; i++) {
            if (row.eq(i).hasClass(currentPlayer)) {
                counter++;
                if (counter === 4) {
                    console.log("VICTORY HORIZONTAL");
                    row.eq(i).addClass("win animated bounceOutLeft delay-1s"); // acces i and the previous one
                    row.eq(i - 1).addClass("win animated bounceOutLeft delay-1s");
                    row.eq(i - 2).addClass("win animated bounceOutLeft delay-1s");
                    row.eq(i - 3).addClass("win animated bounceOutLeft delay-1s");
                    modal();
                }
            } else {
                counter = 0;
            } // closes if-statement
        } //closes forLoop
    } // closes horizontalVictoryCheck

    function diagonalVictoryCheck() {
        var slots = $(".slot");

        for (var i = 0; i < diagonals.length; i++) {
            var counter = 0;
            for (var j = 0; j < diagonals[i].length; j++) {
                if (slots.eq(diagonals[i][j]).hasClass(currentPlayer)) {
                    counter++;
                }
                if (counter === 4) {

                    slots.eq(diagonals[i][0]).addClass("win animated bounceOutLeft delay-1s");
                    slots.eq(diagonals[i][1]).addClass("win animated bounceOutLeft delay-1s");
                    slots.eq(diagonals[i][2]).addClass("win animated bounceOutLeft delay-1s");
                    slots.eq(diagonals[i][3]).addClass("win animated bounceOutLeft delay-1s");

                    modal();
                    return;
                }
            }
            // closes 2.forLoop
        } // closes 1.forLoop
    } // closes diagonalVictoryCheck

    function switchPlayer() {
        var turn = "";
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
            turn =
                '<p style="background-color: #533B4D;border-radius: 25px; color:#fae3c6; animation: shake 2s ease-out 5s ">Player 2</p>'; //creates text
        } else {
            currentPlayer = "player1";
            turn =
                '<p style="background-color: #bb206b;border-radius: 25px; color:#fae3c6; animation: shake 2s ease-out 5s ">Player 1</p>';
        }
        // turn.css("background-color", red);
        $(".currentPlayer-info").html(turn);
        //inserts text to html
    } // closes switchPlayer

    function modal() {
        var modal = $('.modal');
        modal.addClass('win');
    }
})(); // end iife