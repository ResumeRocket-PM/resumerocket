
//async function authenticate(email, password) {
//    const response = await fetch('https://localhost:44392/index.html/authenticate', {
//        method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ EmailAddress: email, Password: password })
//    });
//    const data = await response.json();
//    if (data.JsonWebToken) {
//        chrome.storage.local.set({ token: data.JsonWebToken });
//    }
//}

// This function will be called when the login button is clicked
async function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    //alert("user name: " + username + " password: "+password);

    // You can then use this data to make an API request, etc.
    console.log("Username:", username);
    console.log("Password:", password);

    fetch("https://localhost:5001/api/authentication", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailAddress: username,
            password: password
        })
    })
    //.then(response => response.json())

    .then(response => {
        alert("get the response: " + response)
        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            // Save the token and do something after successful login
            chrome.storage.local.set({ token: data.token }, function() {
                console.log("Token saved.");
            });
            alert("Login successful!");
        } else {
            alert("Authentication failed!");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert(error)
    });
}

// Attach the click event listener to the login button
document.getElementById("loginButton").addEventListener("click", handleLogin);


//get the content of job posting, show the resumes
document.getElementById("jobPostingTextbox").addEventListener("keydown", function(event) {
    // Check if the "Enter" key (key code 13) was pressed
    if (event.key === "Enter") {
        // Get the value of the textbox
        let textboxValue = event.target.value;

        // Send message to background.js to fetch the resume based on the input
        //chrome.runtime.sendMessage({ action: "getResume", jobPosting: jobPostingText }, function(response) {
        //    if (response && response.resume) {
        //        // Display the resume in the 'resumeOutput' div
        //        document.getElementById("resumeOutput").innerText = response.resume;
        //    } else {
        //        alert("Failed to retrieve resume");
        //    }
        //});
        alert("input " + textboxValue)
    }
});
