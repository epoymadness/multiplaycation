function play() {
  const menu = document.getElementById("menu");
  const game = document.getElementById("game");
  menu.classList.add("hidden");
  game.classList.remove("hidden");
  showQuestion();
}

let easyScore = 0;
let hardScore = 0;
let expertScore = 0;
let correctAnswer = 0;
let score = 0;
let number = 0;
let round = "beginner";

// Store previous values
let lastNum1 = null,
  lastNum2 = null;
let prevNum1 = null,
  prevNum2 = null;

function generateNumbers(round) {
  let num1, num2;

  do {
    if (round === "beginner") {
      num1 = Math.floor(Math.random() * 10) + 1; // 1–10
      num2 = Math.floor(Math.random() * 10) + 1;
    } else if (round === "intermediate") {
      num1 = Math.floor(Math.random() * 11) + 10; // 10–20
      num2 = Math.floor(Math.random() * 11) + 10;
    } else if (round === "expert") {
      num1 = Math.floor(Math.random() * 11) + 20; // 20–30
      num2 = Math.floor(Math.random() * 11) + 20;
    }

    // Repeat only if num1 or num2 repeated 3 times in a row
  } while (
    (num1 === lastNum1 && num1 === prevNum1) ||
    (num2 === lastNum2 && num2 === prevNum2)
  );

  // Update previous tracking
  prevNum1 = lastNum1;
  lastNum1 = num1;

  prevNum2 = lastNum2;
  lastNum2 = num2;

  return { num1, num2 };
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

function showQuestion() {
  if (number === 0) {
    score = 0;
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = `Score: ${score}`;
  }

  const { num1, num2 } = generateNumbers(round);

  const tryAgain = document.getElementById("tryAgain");
  tryAgain.textContent = "Try Again";
  const ttlScoreBox = document.getElementById("ttlScoreBox");
  ttlScoreBox.classList.add("hidden");
  const problem = document.getElementById("problem");
  problem.classList.remove("hidden");
  const levelScore = document.getElementById("levelScore");
  levelScore.classList.remove("hidden");
  const solve = document.getElementById("solve");
  solve.classList.remove("hidden");
  const level = document.getElementById("round");
  const roundLvl = round.charAt(0).toUpperCase() + round.slice(1);
  level.textContent = `Level: ${roundLvl}`;
  solve.textContent = `${num1} x ${num2}`;

  correctAnswer = num1 * num2;
  number++;

  const submitBtn = document.getElementById("submitBtn");
  const userAnswer = document.getElementById("userAnswer");
  const lvlInd = document.getElementById("round");
  const lvlUp = document.getElementById("nextLvl");
  const tAgain = document.getElementById("tryAgain");
  const tryIndi = document.getElementById("tryIndi");
  const resultBox = document.getElementById("resultBox");
  resultBox.classList.add("hidden");
  const result = document.getElementById("result");
  result.classList.add("hidden");
  tryIndi.classList.add("hidden");
  lvlUp.classList.add("hidden");
  lvlInd.classList.remove("hidden");
  userAnswer.classList.remove("hidden");
  tAgain.classList.add("hidden");
  submitBtn.classList.remove("hidden");
  problem.appendChild(solve);
}

function checkAnswer() {
  console.log(number);

  const userAnswer = document.getElementById("userAnswer");
  const userAnswerValue = userAnswer.value;

  if (userAnswerValue == correctAnswer) {
    console.log("correct answer");
    if (round === "beginner") {
      score++;
    } else if (round === "intermediate") {
      score += 5;
    } else if (round === "expert") {
      score += 10;
    }
  } else {
    console.log("incorrect answer");
    if (round === "beginner") {
      score--;
    } else if (round === "intermediate") {
      score -= 5;
    } else if (round === "expert") {
      score -= 10;
    }
  }

  if (score < 0) {
    score = 0;
  }

  userAnswer.value = ""; // clear input field

  showQuestion();

  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = `Score: ${score}`;

  // expert level
  if (score > 150 && number === 31 && round === "expert") {
    expertScore = score;
    round = "beginner";
    number = 0;
    console.log("expert score: " + expertScore);
    console.log("intermediate score: " + hardScore);
    console.log("easy score: " + easyScore);
    const tryIndi = document.getElementById("tryIndi");
    const solve = document.getElementById("solve");
    const lvlUp = document.getElementById("nextLvl");
    const submitBtn = document.getElementById("submitBtn");
    const userAnswer = document.getElementById("userAnswer");
    const lvlInd = document.getElementById("round");
    const levelScore = document.getElementById("levelScore");
    const finalResult = document.getElementById("finalResult");
    finalResult.classList.remove("hidden");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent =
      "Great work! you completed all the levels and got " + score + " points!";
    levelScore.classList.add("hidden");
    lvlInd.classList.add("hidden");
    userAnswer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    solve.classList.add("hidden");
    lvlUp.classList.add("hidden");
  }

  // try again expert level
  if (score === 0 && number === 31 && round === "expert") {
    const tAgain = document.getElementById("tryAgain");
    tAgain.classList.remove("hidden");
    // buttons
    const round = document.getElementById("round");
    const userAnswer = document.getElementById("userAnswer");
    const solve = document.getElementById("solve");
    const tryIndi = document.getElementById("tryIndi");
    const submitBtn = document.getElementById("submitBtn");
    const levelScore = document.getElementById("levelScore");
    levelScore.classList.add("hidden");
    round.classList.add("hidden");
    userAnswer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    solve.classList.add("hidden");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent = `you've got ${score} points but you can try again!`;
    solve.textContent = "You can try again!";
    number = 0;
  }

  // restart expert level
  if (score < 150 && number === 31 && round === "expert") {
    const tAgain = document.getElementById("tryAgain");
    tAgain.textContent = "Restart";
    tAgain.classList.remove("hidden");
    // buttons
    const roundInd = document.getElementById("round");
    const userAnswer = document.getElementById("userAnswer");
    const solve = document.getElementById("solve");
    const tryIndi = document.getElementById("tryIndi");
    const submitBtn = document.getElementById("submitBtn");
    const levelScore = document.getElementById("levelScore");
    levelScore.classList.add("hidden");
    roundInd.classList.add("hidden");
    userAnswer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    solve.classList.add("hidden");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent = `you've got ${score} points and failed!`;
    solve.textContent = "You can try again!";
    number = 0;
    round = "beginner";
  }

  //intermediate level
  if (score > 50 && number === 21 && round === "intermediate") {
    hardScore = score;
    round = "expert";
    number = 0;
    console.log("medium score: " + hardScore);
    console.log("easy score: " + easyScore);
    console.log("You passed the hard level!");
    const tryIndi = document.getElementById("tryIndi");
    const solve = document.getElementById("solve");
    const lvlUp = document.getElementById("nextLvl");
    const submitBtn = document.getElementById("submitBtn");
    const userAnswer = document.getElementById("userAnswer");
    const lvlInd = document.getElementById("round");
    const result = document.getElementById("result");
    const levelScore = document.getElementById("levelScore");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent = `got ${score} points! Let's move to the next level!`;
    levelScore.classList.add("hidden");
    result.classList.remove("hidden");
    lvlInd.classList.add("hidden");
    userAnswer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    solve.classList.add("hidden");
    lvlUp.classList.add("hidden");
  }

  // try again inter level
  if (score === 0 && number === 21 && round === "intermediate") {
    const tAgain = document.getElementById("tryAgain");
    tAgain.classList.remove("hidden");
    // buttons
    const round = document.getElementById("round");
    const userAnswer = document.getElementById("userAnswer");
    const solve = document.getElementById("solve");
    const tryIndi = document.getElementById("tryIndi");
    const submitBtn = document.getElementById("submitBtn");
    const levelScore = document.getElementById("levelScore");
    levelScore.classList.add("hidden");
    round.classList.add("hidden");
    userAnswer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    solve.classList.add("hidden");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent = `you've got ${score} points but you can try again!`;
    solve.textContent = "You can try again!";
    number = 0;
  }

  // restart inter level
  if (score < 50 && number === 21 && round === "intermediate") {
    const tAgain = document.getElementById("tryAgain");
    tAgain.textContent = "Restart";
    tAgain.classList.remove("hidden");
    // buttons
    const roundInd = document.getElementById("round");
    const userAnswer = document.getElementById("userAnswer");
    const solve = document.getElementById("solve");
    const tryIndi = document.getElementById("tryIndi");
    const submitBtn = document.getElementById("submitBtn");
    const levelScore = document.getElementById("levelScore");
    levelScore.classList.add("hidden");
    roundInd.classList.add("hidden");
    userAnswer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    solve.classList.add("hidden");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent = `you've got ${score} points and failed!`;
    solve.textContent = "You can try again!";
    number = 0;
    round = "beginner";
  }

  // try again beginner level
  if (score === 0 && number === 16 && round === "beginner") {
    const tAgain = document.getElementById("tryAgain");
    tAgain.classList.remove("hidden");
    // buttons
    const round = document.getElementById("round");
    const userAnswer = document.getElementById("userAnswer");
    const solve = document.getElementById("solve");
    const tryIndi = document.getElementById("tryIndi");
    const submitBtn = document.getElementById("submitBtn");
    const levelScore = document.getElementById("levelScore");
    levelScore.classList.add("hidden");
    round.classList.add("hidden");
    userAnswer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    solve.classList.add("hidden");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent = `you've got ${score} points but you can try again!`;
    solve.textContent = "You can try again!";
    number = 0;
  }

  // restart beginner level
  if (score < 7 && number === 16 && round === "beginner") {
    const tAgain = document.getElementById("tryAgain");
    tAgain.textContent = "Restart";
    tAgain.classList.remove("hidden");
    // buttons
    const round = document.getElementById("round");
    const userAnswer = document.getElementById("userAnswer");
    const solve = document.getElementById("solve");
    const tryIndi = document.getElementById("tryIndi");
    const submitBtn = document.getElementById("submitBtn");
    const levelScore = document.getElementById("levelScore");
    levelScore.classList.add("hidden");
    round.classList.add("hidden");
    userAnswer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    solve.classList.add("hidden");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent = `you've got ${score} points and failed!`;
    solve.textContent = "You can try again!";
    number = 0;
  }

  // leveling up
  if (round === "beginner" && score > 7 && number === 16) {
    // tochange
    easyScore = score;
    console.log("easy score: " + easyScore);
    round = "intermediate";
    number = 0;
    const tryIndi = document.getElementById("tryIndi");
    const userAnswer = document.getElementById("userAnswer");
    const lvlInd = document.getElementById("round");
    const lvlUp = document.getElementById("nextLvl");
    const solve = document.getElementById("solve");
    const submitBtn = document.getElementById("submitBtn");
    const levelScore = document.getElementById("levelScore");
    tryIndi.classList.remove("hidden");
    tryIndi.textContent = `got ${score} points! Let's move to the next level!`;
    solve.classList.add("hidden");
    levelScore.classList.add("hidden");
    lvlInd.classList.add("hidden");
    userAnswer.classList.add("hidden");
    lvlUp.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

function result() {
  //removed
  round = "beginner";
  const levelScore = document.getElementById("levelScore");
  const problem = document.getElementById("problem");
  const answerBox = document.getElementById("finalResult");
  levelScore.classList.add("hidden");
  problem.classList.add("hidden");
  answerBox.classList.add("hidden");

  //add
  const resultBox = document.getElementById("resultBox");
  const begScore = document.getElementById("begScore");
  const interScore = document.getElementById("interScore");
  const exScore = document.getElementById("exScore");
  const totalScore = document.getElementById("totalScore");
  const tryAgain = document.getElementById("tryAgain");
  const ttlScoreBox = document.getElementById("ttlScoreBox");
  ttlScoreBox.classList.remove("hidden");
  resultBox.classList.remove("hidden");
  begScore.textContent = `Beginner Level Score: ${easyScore}`;
  interScore.textContent = `Intermediate Level Score: ${hardScore}`;
  exScore.textContent = `Expert Level Score: ${expertScore}`;
  totalScore.textContent = `Total Score: ${
    easyScore + hardScore + expertScore
  }`;
  tryAgain.textContent = "Restart Game";
  tryAgain.classList.remove("hidden");
}
