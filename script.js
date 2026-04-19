// Crowd Data Simulation
function updateCrowd() {
    const crowds = ["High at Gate A", "Medium at Gate B", "Low at Gate C"];
    const random = crowds[Math.floor(Math.random() * crowds.length)];
    document.getElementById("crowd-info").innerText = random;
}

// Queue Estimator
function checkQueue() {
    const times = ["5 mins", "10 mins", "15 mins"];
    const random = times[Math.floor(Math.random() * times.length)];
    document.getElementById("queue-info").innerText = "Estimated wait time: " + random;
}

// Simple AI Assistant (logic-based)
function askAI() {
    const input = document.getElementById("user-input").value.toLowerCase();
    let response = "";

    const gates = [
        { name: "Gate A", crowd: "High" },
        { name: "Gate B", crowd: "Medium" },
        { name: "Gate C", crowd: "Low" }
    ];

    const bestGate = gates.reduce((prev, curr) =>
        (prev.crowd === "Low" ? prev : curr.crowd === "Low" ? curr : prev)
    );

    if (input.includes("gate")) {
        response = `Based on live analysis, ${bestGate.name} is the least crowded entry point.`;
    }
    else if (input.includes("food")) {
        response = "Food stalls near Gate B have shortest wait time (~5-10 mins).";
    }
    else if (input.includes("exit")) {
        response = "Exit 2 is currently the fastest route to leave.";
    }
    else if (input.includes("crowd")) {
        response = "Gate A: High, Gate B: Medium, Gate C: Low crowd density.";
    }
    else {
        response = "Ask about gates, food, crowd, or exits.";
    }

    document.getElementById("ai-response").innerText = response;
}
function updateCircle() {
    const circle = document.getElementById("circleChart");

    const low = Math.floor(Math.random() * 40) + 20;
    const medium = Math.floor(Math.random() * 30) + 20;
    const high = 100 - low - medium;

    circle.style.background = `conic-gradient(
        #22c55e 0% ${low}%,
        #facc15 ${low}% ${low + medium}%,
        #ef4444 ${low + medium}% 100%
    )`;
}

// update every 3 seconds
setInterval(updateCircle, 3000);
const scenarios = [
    {
        name: "Normal",
        occupancy: [400, 700],
        wait: [2, 5],
        zones: [0, 1]
    },
    {
        name: "Halftime Surge",
        occupancy: [700, 1200],
        wait: [5, 12],
        zones: [2, 5]
    },
    {
        name: "Exit Rush",
        occupancy: [800, 1500],
        wait: [3, 8],
        zones: [3, 6]
    }
];

let currentScenarioIndex = 0;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function updateDashboard() {
    const scenario = scenarios[currentScenarioIndex];

    const occupancy = getRandom(...scenario.occupancy);
    const wait = getRandom(...scenario.wait);
    const zones = getRandom(...scenario.zones);

    document.getElementById("occupancy").innerText = occupancy;
    document.getElementById("wait").innerText = wait + " min";
    document.getElementById("zones").innerText = zones;
    document.getElementById("scenario").innerText = scenario.name;


    // also update circle
    updateCircle();
}
window.onload = function () {
    window.setScenario = function (index) {
        currentScenarioIndex = index;
        addLog(`Manual Override: Scenario changed to ${scenarios[index].name}`);
    };

    const scenarios = [
        {
            name: "Normal",
            occupancy: [400, 700],
            wait: [2, 5],
            zones: [0, 1]
        },
        {
            name: "Halftime Surge",
            occupancy: [700, 1200],
            wait: [5, 12],
            zones: [2, 5]
        },
        {
            name: "Exit Rush",
            occupancy: [800, 1500],
            wait: [3, 8],
            zones: [3, 6]
        }
    ];

    let currentScenarioIndex = 0;

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function addLog(message) {
        const logContainer = document.getElementById("ai-logs");

        if (!logContainer) return; // safety

        const entry = document.createElement("div");
        entry.className = "log-entry";
        entry.innerText = message;

        logContainer.prepend(entry);

        if (logContainer.children.length > 8) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }

    function updateDashboard() {
        const scenario = scenarios[currentScenarioIndex];

        const occupancy = getRandom(...scenario.occupancy);
        const wait = getRandom(...scenario.wait);
        const zones = getRandom(...scenario.zones);

        document.getElementById("occupancy").innerText = occupancy;
        document.getElementById("wait").innerText = wait + " min";
        document.getElementById("zones").innerText = zones;
        document.getElementById("scenario").innerText = scenario.name;

        updateCircle(); // already exists
        addLog(`Prediction: Crowd shifting in ${scenario.name}`);
        addLog(`Action: Optimizing routes & reducing congestion`);
    }

    function switchScenario() {
        currentScenarioIndex = (currentScenarioIndex + 1) % scenarios.length;
    }

    updateDashboard();
    setInterval(updateDashboard, 3000);
    setInterval(switchScenario, 10000);
};