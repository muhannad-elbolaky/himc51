const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availbleQuestions = [];

let questions = [
  {
    question: "I",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 1
  },
  {
    question: "x",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 2
  },
  {
    question: "z",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 3
  }
]

startGame = () => {
  questionCounter = 0;
  score = 0;
  availbleQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {

  if (availbleQuestions.length === 0) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/end.html');
  }

  questionCounter++;
  progressText.innerText = `السؤال: ${questionCounter}/${questions.length}`;

  progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availbleQuestions.length);

  currentQuestion = availbleQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number]
  });

  availbleQuestions.splice(questionIndex, 1);

  acceptingAnswer = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", ({ target: selectedChoice }) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;

    const selectedAnswer = selectedChoice.dataset['number'];
    const classToApply = selectedAnswer == currentQuestion.answer
      ? 'correct'
      : 'incorrect';

    if (classToApply === "correct") {
      incrementScore(1)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion();
    }, 1000);

  });
});

incrementScore = number => {
  score += number
  scoreText.innerText = score
}

startGame();