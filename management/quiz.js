const question = document.getElementById('question');
const margin = document.getElementById('score');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
import questions from "./questions.json" assert { type: "json" };

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availbleQuestions = [];

const startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availbleQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {

  if (availbleQuestions.length === 0) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign(window.location.pathname.replace(/\/[^/]*$/, "") + '/end.html');
  }

  questionCounter++;
  progressText.innerText = `السؤال: ${questionCounter}/${questions.length}`;

  progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availbleQuestions.length);

  currentQuestion = availbleQuestions[questionIndex];

  if (currentQuestion.question.length > 80) {
    question.style.fontSize = "1.5rem";
    margin.style.marginBottom = "0";
  } else {
    question.style.fontSize = "2.8rem"
    margin.style.marginBottom = "5";
  }


  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number]

    if (currentQuestion['choice' + number]) {
      choice.parentElement.style.visibility = "visible";
      choice.innerHTML = currentQuestion['choice' + number];
    } else {
      choice.parentElement.style.visibility = "hidden";
    }
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
    }, 700);

  });
});

const incrementScore = number => {
  score += number
  scoreText.innerText = score
}

startQuiz();