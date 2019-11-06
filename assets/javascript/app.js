var card = $("#quiz");

// questions
var questions = [
  {
    question: "Which instrument is known as a 'woodwind' instrument?",
    answers: ["Trumpet", "Guitar", "Clarinet", "Theremin"],
    correctAnswer: "Clarinet"
  },
  {
    question: "Which guitar tuning is considered standard?",
    answers: ["EADGBE", "DADGAF", "DADF#AD", "DADEAD"],
    correctAnswer: "EADGBE"
  },
  {
    question: "In 4/4 time signature, how many quarter notes are in each bar?",
    answers: ["2", "3", "4", "1"],
    correctAnswer: "4"
  },
  {
    question: "When thinking about percussion instruments, which choice fits best?",
    answers: ["Cow bell", "Acoustic guitar", "Tuba", "Microphone"],
    correctAnswer: "Cow bell"
  },
  {
    question: "Which instrument is considered a stringed instrument?",
    answers: ["Trumpet", "Harmonica", "Xylophone", "Banjo"],
    correctAnswer: "Banjo"
  },
  {
    question: "A __________ is considered a modern version of a piano?",
    answers: ["Timpani", "Keyboard", "Fresh", "Cab"],
    correctAnswer: "Keyboard"
  },
  {
    question: "What instrument rose to popularity in the 1950s and is still an integral part of music today?",
    answers: ["Violin", "Saxophone", "Electric guitar", "Tamborine"],
    correctAnswer: "Electric guitar"
  },
  {
    question: "Which instrument is considered part of the brass instruments?",
    answers: ["Saxophone", "Cello", "Bongos", "Trumpet"],
    correctAnswer: "Trumpet"
  },
  {
    question: "Which instrument best fits the term 'classical'?",
    answers: ["Violin", "Electric Guitar", "Xylophone", "Harmonica"],
    correctAnswer: "Violin"
  },
  {
    question: "Which instrument is considered the oldest instrument?",
    answers: ["Drum", "Harp", "Lute", "Flute"],
    correctAnswer: "Flute"
  }
];

// Variable that will hold the setInterval
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 150,
// a function that counts down to 0 and ends the portion if an answer is not selected
  counterFunction: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },
// starts the timer that counts down and displays a message that includes the seconds left
  start: function() {
    timer = setInterval(game.counterFunction, 1000);

    $("#doubled").prepend(
      "<h2>Time Left: <span id='counter-number'>150</span> Seconds</h2>"
    );
// when the game is started, remove the start button
    $("#start").remove();

// a for loop that displays the list of questions and the possible correct answers

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }
// make the 'done' button appear
    card.append("<button id='done'>Done</button>");
  },
// when an answer is selected, stop the timer and add either correct or incorrect +1
  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

// a function that resets the timer and displays number of answers that were correct vs incorrect

  result: function() {
    clearInterval(timer);

    $("#doubled h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Wrong Answers: " + this.incorrect + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
