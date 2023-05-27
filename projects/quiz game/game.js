// Quiz data
var questions = [
	{
		question: "What is the capital of France?",
		options: ["Paris", "London", "Rome", "Madrid"],
		answer: 0
	},
	{
		question: "Which planet is known as the Red Planet?",
		options: ["Venus", "Mars", "Jupiter", "Saturn"],
		answer: 1
	},
	{
		question: "who is dead",
		options: ["batman", "mr clean", "dobby", "the coder of this project"],
		answer: 3
	},
	{
		question: "",
		options: ["", "", "", ""],
		answer: 1
	},
	// Add more questions...
];
  
  // Game variables
  var currentQuestion = 0;
  var score = 0;
  
  // Initialize the quiz
  function init() {
	shuffleQuestions();
	displayQuestion();
  
	// Add event listener to the submit button
	var submitBtn = document.getElementById("submitBtn");
	submitBtn.addEventListener("click", submitAnswer);
  }
  
  // Shuffle the order of questions
  function shuffleQuestions() {
	for (var i = questions.length - 1; i > 0; i--) {
	  var j = Math.floor(Math.random() * (i + 1));
	  var temp = questions[i];
	  questions[i] = questions[j];
	  questions[j] = temp;
	}
  }
  
  // Display the current question
  function displayQuestion() {
	var questionElem = document.getElementById("question");
	var optionsElem = document.getElementById("options");
  
	// Clear previous question and options
	questionElem.innerHTML = "";
	optionsElem.innerHTML = "";
  
	// Display current question
	questionElem.innerHTML = questions[currentQuestion].question;
  
	// Display answer options
	for (var i = 0; i < questions[currentQuestion].options.length; i++) {
	  var li = document.createElement("li");
	  li.innerHTML = questions[currentQuestion].options[i];
	  li.className = "option";
	  li.setAttribute("data-index", i);
	  optionsElem.appendChild(li);
	}
  
	// Add click event listener to options
	var options = optionsElem.getElementsByClassName("option");
	for (var i = 0; i < options.length; i++) {
	  options[i].addEventListener("click", selectOption);
	}
  }
  
  // Select the player's answer
  function selectOption() {
	var selectedOption = this;
	var options = document.getElementsByClassName("option");
  
	// Clear selection
	for (var i = 0; i < options.length; i++) {
	  options[i].classList.remove("selected");
	}
  
	// Set selected option
	selectedOption.classList.add("selected");
  }
  
  // Submit the player's answer
  function submitAnswer() {
	var options = document.getElementsByClassName("option");
  
	// Check if an option is selected
	var selectedOption = null;
	for (var i = 0; i < options.length; i++) {
	  if (options[i].classList.contains("selected")) {
		selectedOption = options[i];
		break;
	  }
	}
  
	// If an option is selected, check the answer
	if (selectedOption) {
	  var selectedAnswer = parseInt(selectedOption.getAttribute("data-index"));
	  if (selectedAnswer === questions[currentQuestion].answer) {
		score++;
	  }
	}
  
	// Move to the next question or end the game
	if (currentQuestion < questions.length - 1) {
	  currentQuestion++;
	  displayQuestion();
	} else {
	  endGame();
	}
  }
  
  // End the game and display the score
  function endGame() {
	var quizContainer = document.getElementById("quizContainer");
	quizContainer.style.display = "none";
	
	var scoreContainer = document.getElementById("scoreContainer");
	var result = document.createElement("h2");
	result.innerHTML = "Quiz Completed";
	var scoreMsg = document.createElement("p");
	scoreMsg.innerHTML = "Your score: " + score + " out of " + questions.length;
	
	scoreContainer.appendChild(result);
	scoreContainer.appendChild(scoreMsg);
	scoreContainer.style.display = "block";
  }
  
  // Initialize the quiz when the page loads
  window.onload = init;
  