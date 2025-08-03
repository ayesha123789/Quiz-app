const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Tool Multi Language", correct: false }
    ]
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "text-style", correct: false },
      { text: "font-style", correct: false },
      { text: "text-size", correct: false },
      { text: "font-size", correct: true }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  }
];

const questionEl = document.getElementById("question");
const answerBtns = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  resultBox.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQ = questions[currentQuestionIndex];
  questionEl.innerText = currentQ.question;

  currentQ.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerBtns.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerBtns.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionEl.innerText = "Quiz Completed!";
  scoreText.innerText = `You scored ${score} out of ${questions.length}.`;
  resultBox.classList.remove("hide");
  nextBtn.innerText = "Restart";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
