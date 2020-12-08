$(document).ready(function () {

    // Event handlers
    $("#santaButton").click(santaForm);
    $("#countdownButton").click(countdown);
    $("input[type='button']").click(getLetter);

    // javaScript for the Santa form

    // Object containing the validation rules
    var myRules =
        {
           fullName:
               {
                   required: true,
                   digits: false
               },
            email:
                {
                    required: true
                },
            phone:
                {
                    required: true
                },
            date:
                {
                    required: true
                },
            time:
                {
                    required: true
                },
            userDate:
                {
                    required: true,
                }
        };

    // Object containing the error messages
    var myMessages =
        {
            fullName:
                {
                    required: "Please enter your full name.",
                    digits: "Your name cannot contain numbers."
                },
            email:
                {
                    required: "Pleaser enter your E-Mail."
                },
            phone:
                {
                    required: "Please enter your phone number."
                },
            date:
                {
                    required: "Please enter the date you'd like to meet Santa."
                },
            time:
                {
                    required: "Please enter the time you'd like to meet Santa."
                },
            userDate:
                {
                    required: "A date is required to calculate the days till Christmas."
                }
        };

    // Pass the configuration to the form's validate() method
    // Needs submitHandler, rules, and messages properties
    $("form").validate(
        {
            submitHandler: santaForm,
            rules: myRules,
            messages: myMessages
        }
    );

    function santaForm(event) {
        event.preventDefault();
        // Get the user input values
        var fullName = $("#fullName").val();
        var date = $("#date").val();
        var time = $("#time").val();
        var phone = $("#phone").val();
        var email = $("#email").val();

        // Output them into a message
        $("#message").text(fullName + ", your appointment to meet Santa was accepted. See you on " + date + " at " + time + "!");
        $("#message2").text("We will call you at " + phone + " or E-Mail you at " + email + " if there are any problems.")
    }

    // javaScript for the Christmas countdown calculator
    function countdown(event) {
        event.preventDefault();
        // Create a new date - Christmas date
        var christmasDate = new Date('12/25/2020');
        // Create a new date - users date
        var userDate = new Date($("#userDate").val());

        // Get the difference by subtracting them - christmas first(it should be the bigger date)
        var diffTime = Math.floor(christmasDate - userDate);
        // Get the difference in days
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Out put the amount of days until Christmas
        $("#countdown").text("Christmas is " + diffDays + " days away!");
    }

    // Christmas Hangman

    // Create an array with christmas words
    // Array
    var christmasWords = ["Angel", "Bells", "Candy", "Christmas", "Cookie", "Decorate",
        "Frosty", "Snow", "Donkey", "Gingerbread", "Holiday", "Holly", "Joyful", "Merry",
    "Nutcracker", "Naughty", "Nice", "Rudolph", "Reindeer", "Elves", "Santa", "Gifts", "Sleigh",
    "Snowman", "Stocking", "Wreath"];

    // initialize variable outside of the functions
    var letter;
    var wrongGuesses = 0;

    // create arrays for easier searching
    var randomWords = [];
    var dashArray = [];
    var wrongGuess = [];

    // Runs the start game function right away
    startGame();

    function startGame() {
        // When the game begins, generate a random valid index to pick one of the words.
        var index = Math.floor(Math.random() * christmasWords.length);
        var word = christmasWords[index].toUpperCase();
        randomWords = word.split("");

        // Display one dash for each unguessed letter for the length of the random word
        // For loop
        for (var i = 0; i < word.length; i++) {
            dashArray[i] = "-";
        }
        // Output the dashes
        $("#mysteryWord").text(dashArray.join(" "));
    }

    function getLetter(event) {
        // Event handler - prevent default
        event.preventDefault();
        // Get the users chosen letter value
        var chosenLetter = $(this);
        letter = chosenLetter.val();
        getIndex(letter);
    }

    function getIndex(letter) {
        var letterIndex = [];
        // For loop
        for (var i = 0; i < randomWords.length; i++) {
            if (randomWords[i] === letter) {
                letterIndex.push(i);
            }
        }
        enterLetters(letterIndex);
    }

    /* As the user enters each guess, display the word again,
        replacing dashes with the guessed letter if it occurs in that position.*/
    function enterLetters(letterIndex) {
        // If-Else statement
        if (letterIndex.length !== 0) {
            // For loop
            for (var i = 0; i < letterIndex.length; i++) {
                var replaceLetter = letterIndex[i];
                dashArray[replaceLetter] = letter;
            }
        }
        else {
            wrongGuesses++;
            // push the wrong guess into the wrong guesses array
            wrongGuess.push(letter);
            // output the wrong guess so they know what they have guessed
            $("#wrongGuesses").text(wrongGuess.join(" "));
        }
        $("#mysteryWord").text(dashArray.join(" "));
        gameResult();
    }

    function gameResult() {
        // Allow the user to guess letters continuously (up to 6 guesses)
        // If the user has used all of their guesses without completing the word, they have lost and the game is over.
        // If statement
        if (wrongGuesses === 6) {
            // output loser message
            $("#lost").text("You Lost!");
        }
        // If the joined letters = the random word that was picked the user wins
        if (dashArray.join("") === randomWords.join("")) {
            // output winner message
            $("#win").text("You won!");
        }
    }
});