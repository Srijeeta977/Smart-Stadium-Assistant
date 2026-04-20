// =======================
// SMART AI STADIUM SYSTEM
// =======================

// Scenarios
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

// Utility
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// =======================
// AI LOG SYSTEM
// =======================
function addLog(type, message) {
    const logContainer = document.getElementById("ai-logs");
    if (!logContainer) return;

    const entry = document.createElement("div");
    entry.className = "log-entry";

    const time = new Date().toLocaleTimeString();

    entry.innerHTML = `<strong>[${time}] ${type}:</strong> ${message}`;
    logContainer.prepend(entry);

    if (logContainer.children.length > 10) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// =======================
// PIE CHART (LIVE FLOW)
// =======================
function updateCircle() {
    const circle = document.getElementById("circleChart");

    const low = getRandom(20, 50);
    const medium = getRandom(20, 40);
    const high = 100 - low - medium;

    circle.style.background = `conic-gradient(
        #22c55e 0% ${low}%,
        #facc15 ${low}% ${low + medium}%,
        #ef4444 ${low + medium}% 100%
    )`;
}

function updateCrowd() {
    const scenario = scenarios[currentScenarioIndex];

    let status = "";

    if (scenario.name === "Halftime Surge") {
        status = "High crowd detected across multiple gates";
    } else if (scenario.name === "Exit Rush") {
        status = "Heavy exit congestion in progress";
    } else {
        status = "Moderate and stable crowd distribution";
    }

    document.getElementById("crowd-info").innerText = status;
}

function checkQueue(waitTime) {
    let message = "";

    if (waitTime > 8) {
        message = "⚠️ High wait time (~" + waitTime + " mins)";
    } else if (waitTime > 5) {
        message = "⏳ Moderate wait (~" + waitTime + " mins)";
    } else {
        message = "✅ Fast service (~" + waitTime + " mins)";
    }

    document.getElementById("queue-info").innerText = message;
}

// =======================
// AI PREDICTION ENGINE
// =======================
function aiDecisionLogic(occupancy, wait) {
    if (occupancy > 1000) {
        addLog("ALERT", "AI Model detected congestion probability spike (87%).");
        addLog("ACTION", "Redirecting attendees to alternate gates.");
    } else if (wait > 8) {
        addLog("PREDICTION", "Queue times rising. Food stalls may bottleneck.");
        addLog("ACTION", "Optimizing service distribution.");
    } else {
        addLog("STATUS", "Flow stable. No intervention needed.");
    }
}

// =======================
// AI INSIGHTS (GOOGLE-LIKE)
// =======================
function updateAIInsights(occupancy, wait) {
    const insightBox = document.getElementById("ai-insight-text");

    let insight = "";

    if (occupancy > 1000) {
        insight = "Gemini AI: Predicting congestion spike. Suggest dynamic rerouting.";
    }
    else if (wait > 8) {
        insight = "Gemini AI: Queue buildup detected. Optimizing service nodes.";
    }
    else {
        insight = "Gemini AI: System stable. Flow efficiency optimal.";
    }

    insightBox.innerText = insight;
}

// =======================
// GOOGLE AI SIMULATION
// =======================
function callGeminiAPI(context) {
    // Simulated API call delay
    setTimeout(() => {
        addLog("GOOGLE AI", `Gemini processed scenario: ${context}`);
    }, 500);
}

// =======================
// SYSTEM PERFORMANCE METRICS
// =======================
function updateSystemMetrics() {
    const cpu = getRandom(30, 85);
    const latency = getRandom(40, 120);
    const confidence = getRandom(85, 99);

    document.getElementById("cpu").innerText = cpu;
    document.getElementById("latency").innerText = latency;
    document.getElementById("confidence").innerText = confidence;
}

// =======================
// DASHBOARD UPDATE
// =======================
function updateDashboard() {
    const scenario = scenarios[currentScenarioIndex];

    const occupancy = getRandom(...scenario.occupancy);
    const wait = getRandom(...scenario.wait);
    const zones = getRandom(...scenario.zones);

    document.getElementById("occupancy").innerText = occupancy;
    document.getElementById("wait").innerText = wait + " min";
    document.getElementById("zones").innerText = zones;
    document.getElementById("scenario").innerText = scenario.name;

    updateCircle();
    updateAIInsights(occupancy, wait);
    updateSystemMetrics();
    callGeminiAPI(scenario.name);

    // AI logic runs here
    aiDecisionLogic(occupancy, wait);
    document.getElementById("scenario").innerText = scenario.name;
    updateCrowd();
    checkQueue(wait);
}

// =======================
// AUTO SCENARIO SWITCH
// =======================
function switchScenario() {
    currentScenarioIndex = (currentScenarioIndex + 1) % scenarios.length;
    addLog("SYSTEM", `Scenario auto-switched to ${scenarios[currentScenarioIndex].name}`);
}

// =======================
// USER CONTROL
// =======================
function setScenario(index) {
    currentScenarioIndex = index;
    addLog("MANUAL", `Scenario changed to ${scenarios[index].name}`);
}

// =======================
// AI ASSISTANT (UPGRADED)
// =======================
function askAI() {
    const input = document.getElementById("user-input").value.toLowerCase();
    let response = "";

    if (input.includes("gate")) {
        response = "AI Suggestion: Gate C is currently optimal with lowest congestion.";
    }
    else if (input.includes("food")) {
        response = "AI Insight: Food stalls near Gate B have lowest wait time.";
    }
    else if (input.includes("exit")) {
        response = "AI Routing: Exit 2 is the fastest path right now.";
    }
    else if (input.includes("crowd")) {
        response = "Live Status → Gate A: High | Gate B: Medium | Gate C: Low";
    }
    else {
        response = "Try queries like: best gate, crowd status, food, exit routes.";
    }

    document.getElementById("ai-response").innerText = response;
    addLog("QUERY", input);
}

// =======================
// INIT SYSTEM
// =======================
window.onload = function () {
    updateDashboard();

    // Real-time loop
    setInterval(updateDashboard, 3000);

    // Scenario change loop
    setInterval(switchScenario, 12000);

    addLog("SYSTEM", "AI Crowd Management System Initialized");
};