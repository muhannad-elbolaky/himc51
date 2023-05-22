const finalScoreText = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScoreText.innerText = mostRecentScore;