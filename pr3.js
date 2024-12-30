document.addEventListener("DOMContentLoaded", () => {
    const sessions = [];
    
    const addSessionForm = document.getElementById("addSessionForm");
    const sessionsList = document.getElementById("sessionsList");
    
    // Add a new session
    addSessionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const topic = document.getElementById("topic").value;
        const sessionTime = new Date(document.getElementById("sessionTime").value);
        const duration = parseInt(document.getElementById("duration").value, 10);
        
        if (isNaN(duration) || duration <= 0 || isNaN(sessionTime.getTime())) {
            alert("Invalid input. Please check your entries.");
            return;
        }
        
        const session = { topic, sessionTime, duration };
        sessions.push(session);
        
        updateSessionsList();
        alert(`Session on '${topic}' added successfully!`);
        addSessionForm.reset();
    });
    
    // Update the sessions list
    function updateSessionsList() {
        const today = new Date();
        sessionsList.innerHTML = "";
        
        const todaySessions = sessions.filter(session => {
            const sessionDate = session.sessionTime;
            return (
                sessionDate.getFullYear() === today.getFullYear() &&
                sessionDate.getMonth() === today.getMonth() &&
                sessionDate.getDate() === today.getDate()
            );
        });
        
        if (todaySessions.length === 0) {
            sessionsList.innerHTML = "<li>No sessions scheduled for today.</li>";
        } else {
            todaySessions.forEach(session => {
                const li = document.createElement("li");
                li.textContent = `Topic: ${session.topic}, Time: ${session.sessionTime.toLocaleTimeString()}, Duration: ${session.duration} mins`;
                sessionsList.appendChild(li);
            });
        }
    }
});
