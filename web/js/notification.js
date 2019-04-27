// index message
let message = document.getElementById("HomeMessage");
let closeNotificationBtn = document.getElementById("closeNotification");

// functions
const closeMessage = () => (message.style.display = "none");

// listeners
closeNotificationBtn.addEventListener("click", closeMessage);
