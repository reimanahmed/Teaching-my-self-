document.addEventListener("DOMContentLoaded", function () {
    const studentButton = document.querySelector("#students .btn");
    
    if (studentButton) {
        studentButton.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Welcome to the Student Corner! Ready to learn and play?");
        });
    }
});
// Global Quiz State Variables
let currentScore = 0;
const POINTS_PER_CORRECT_ANSWER = 10;
const answeredQuestions = new Set(); // Tracks submitted question IDs/indexes to prevent duplicate submissions

/**
 * Updates the displayed total score in the DOM.
 * Ensure you have an element with id="score-display" or class="stat-value" on your dashboard.
 */
function updateScoreDisplay() {
    const scoreElement = document.getElementById('score-display');
    if (scoreElement) {
        scoreElement.textContent = currentScore.toLocaleString();
    }
}

/**
 * Handles the submission of a quiz question.
 * 
 * @param {string|number} questionId - Unique identifier for the question being answered.
 * @param {string|number} selectedAnswer - The answer selected by the student.
 * @param {string|number} correctAnswer - The correct answer for the question.
 * @param {HTMLElement} submitButton - (Optional) The submit button element to disable.
 */
function submitAnswer(questionId, selectedAnswer, correctAnswer, submitButton = null) {
    // Prevent submitting the same question multiple times
    if (answeredQuestions.has(questionId)) {
        console.warn(`Question ${questionId} has already been answered.`);
        return;
    }

    // Evaluate answer and update score
    if (selectedAnswer === correctAnswer) {
        currentScore += POINTS_PER_CORRECT_ANSWER;
    } else {
        // Wrong answer gives 0 points (score remains unchanged)
        currentScore += 0; 
    }

    // Mark question as answered
    answeredQuestions.add(questionId);

    // Disable submission controls for this question
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }

    // Disable option inputs for this question if present
    const questionContainer = document.getElementById(`question-${questionId}`);
    if (questionContainer) {
        const inputs = questionContainer.querySelectorAll('input, button');
        inputs.forEach(input => input.disabled = true);
    }

    // Refresh score display on UI
    updateScoreDisplay();
}

/**
 * Optional initialization function to set initial score state on DOM load.
 */
document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();
});
