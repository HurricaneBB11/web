// Quiz data
var questions = [
	{
	  question: "What was the first state in the US?",
	  options: ["VA", "NY", "FL", "DE"],
	  answer: 3
	},
	{
	  question: "In a basketball game, how many players are on the court at the same time?",
	  options: ["8", "5", "7", "11"],
	  answer: 1
	},
	{
	  question: "What iconic company did Steve Jobs start?",
	  options: ["Tasla", "Target", "Apple", "Wish.com"],
	  answer: 2
	},
	{
	  question: "What is the largest country in the world?",
	  options: ["Canada", "Russia", "China", "USA"],
	  answer: 1
	},
	{
	  question: "What is the largest mammal?",
	  options: ["Blue Whale", "Elephant", "Rhino", "Hippo"],
	  answer: 1
	},
	{
	  question: "What is the largest organ in the body?",
	  options: ["Teeth", "Heart", "Brain", "Skin"],
	  answer: 3
	},
	{
	  question: "In what year was James Madison elected president of the US?",
	  options: ["1796", "1784", "1924", "1809"],
	  answer: 3
	},
	{
	  question: "In what city can you find the Eiffel Tower?",
	  options: ["London", "Paris", "New York", "Tokyo"],
	  answer: 1
	},
	{
	  question: "Name one of the Great Lakes",
	  options: ["Lake Michigan", "Dead Sea", "Lake Winnipeg", "Red Lake"],
	  answer: 1
	},
	{
	  question: "What is the largest ocean?",
	  options: ["Atlantic Ocean", "Arctic Ocean", "Southern Ocean", "Pacific Ocean"],
	  answer: 3
	},
	{
	  question: "What is the national bird of the US?",
	  options: ["Bald Eagle", "Pigeon", "Peacock", "Falcon"],
	  answer: 1
	},
	{
	  question: "Who founded Amazon?",
	  options: ["Steve Jobs", "Elon Musk", "Jeff Bezos", "Bill Gates"],
	  answer: 2
	},
	{
	  question: "Where was the game of checkers invented?",
	  options: ["France", "USA", "Egypt", "Sudan"],
	  answer: 3
	},
	{
	  question: "Where did the Olympics start?",
	  options: ["Greece", "Sudan", "USA", "Canada"],
	  answer: 1
	},
	{
	  question: "How many stars are in our solar system?",
	  options: ["Infinity", "9B", "1", "65B"],
	  answer: 2
	},
	{
	  question: "How many time zones are there in the world?",
	  options: ["32", "28", "19", "24"],
	  answer: 3
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
  