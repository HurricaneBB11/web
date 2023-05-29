document.addEventListener('DOMContentLoaded', function() {
	var form = document.querySelector('form');
	form.addEventListener('submit', function(event) {
	  event.preventDefault();
	  calculateWorkload();
	});
  });
  
  function calculateWorkload() {
	var totalLessonsInput = document.getElementById("totalLessons");
	var targetDateInput = document.getElementById("targetDate");
	var resultDiv = document.getElementById("result");
  
	var totalLessons = parseInt(totalLessonsInput.value);
	var targetDate = new Date(targetDateInput.value);
	var currentDate = new Date();
  
	if (isNaN(totalLessons) || totalLessons <= 0) {
	  resultDiv.innerHTML = "Please enter a valid number of lessons.";
	  return;
	}
  
	if (targetDate.getTime() <= currentDate.getTime()) {
	  resultDiv.innerHTML = "Please select a future date.";
	  return;
	}
  
	var daysLeft = Math.ceil((targetDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
	var workloadPerDay = Math.ceil(totalLessons / daysLeft);
  
	resultDiv.innerHTML = "You need to complete " + totalLessons + " lessons in " + daysLeft + " days.<br>";
	resultDiv.innerHTML += "You should do approximately " + workloadPerDay + " lessons per day.";
  }
  