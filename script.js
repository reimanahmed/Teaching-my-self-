document.addEventListener("DOMContentLoaded", function () {
    const studentButton = document.querySelector("#students .btn");
    
    if (studentButton) {
        studentButton.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Welcome to the Student Corner! Ready to learn and play?");
        });
    }
});
