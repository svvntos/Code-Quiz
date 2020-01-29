var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText =document.getElementById("questionCounter");
var scoreText= document.getElementById("score");




var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: "What does HTML stand for?" ,
        choice1: "Highlight Tree Marking Land",
        choice2: "Hyper Text Markup Language",
        choice3: "High Text Markup Language",
        choice4: "Hyper Text Motion Language",
        answer: 2 
    },
    {
        question: "What does Css Stand for?" ,
        choice1: "Calling Style Sheet",
        choice2: "Cascading Seeing Style",
        choice3: "Casacading Style Sheet",
        choice4: "Calling Seeing Sheet",
        answer: 3 
    },
    {
        question: "How do you 'Hello World' in a alert?" ,
        choice1: "msg('Hello World');",
        choice2: "msgBox('Hello World');",
        choice3: "alert('Hello World');",
        choice4: "alertText('Hello World');",
        answer: 3 
    },
    {
        question: "Which languages are the building block of the web?" ,
        choice1: "HTML Only",
        choice2: "CSS & Bootstrap",
        choice3: "Javascript",
        choice4: "All of the above",
        answer: 4 
    },
    {
        question: "What is Javascript?" ,
        choice1: "Language that renders web page to become interactive",
        choice2: "Language that styles the page",
        choice3: "Language that is object-oriented",
        choice4: "Language that does nothing",
        answer: 1 
    }
];


var correct_bonus = 20;
var max_Question = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    // console.log(availableQuestions);
    getNewQuestion();
};
getNewQuestion = () => {

  if (availableQuestions.length === 0 || questionCounter >= max_Question ){
    //   go tothe end
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
  }
 
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + max_Question;




    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
 

    });
     availableQuestions.splice(questionIndex, 1);
     acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        // console.log(e.target);
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset["number"];
        
        var classToApply = 
          selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
             
          if(classToApply === "correct"){
              incrementScore(correct_bonus);
          }


          selectedChoice.parentElement.classList.add(classToApply);
          setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

          },1000);
         


    });
});
incrementScore = num => {
    score = score + num;
    scoreText.innerText = score;
};

startGame();