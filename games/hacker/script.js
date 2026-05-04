// --- GAME STATE ---
let isMuted = false;
let musicStarted = false;
let bytes = 0;
let bps = 0; 
let bpc = 1; 
let rebirthPoints = 0; 
let totalRebirths = 0; 
let clickTimestamps = []; // Tracks the exact time of every click]
let ultraRebirths = 0;
let ultraBoostLevel = 0; // Tracks oermanentspeed multipliers
let ultraRPLevel = 0; // Tracks the Rebirth Point buffs
let ultraHeadStartLevel = 0; // Tracks the starting bytes
let totalTimePlayed = 0; // Tracksall

// --- THE REBIRTH SHOP (PERMANENT UPGRADES) ---
let rebirthShopItems = [
    // baseCost is the starting price. costStep is how much the price goes up per level.
    { id: 'rb_bps', name: 'Global BPS Overclock (+25% BPS)', effect: 0.25, max: 50, owned: 0, baseCost: 1, costStep: 1 },
    { id: 'rb_bpc', name: 'Global Click Multiplier (+25% BPC)', effect: 0.25, max: 50, owned: 0, baseCost: 1, costStep: 1 },
    { id: 'rb_start', name: 'Starting Cache (+10,000 Bytes)', effect: 10000, max: 50, owned: 0, baseCost: 2, costStep: 1 },
    
    // NEW UPGRADES
    { id: 'rb_cap', name: 'Deep Storage (+10 Max Item Capacity)', effect: 10, max: 50, owned: 0, baseCost: 3, costStep: 2 },
    { id: 'rb_discount', name: 'Market Manipulator (-0.01 Cost Scaling)', effect: 0.01, max: 50, owned: 0, baseCost: 5, costStep: 5 }
];

// --- THE BLACK MARKET (RESETS ON REBIRTH) ---
let shopItems = [
    // --- EARLY GAME ---
    { id: 'script', name: 'Auto-Script', baseCost: 15, bps: 1, bpc: 0, owned: 0 },
    { id: 'mouse', name: 'Ergonomic Mouse', baseCost: 25, bps: 0, bpc: 1, owned: 0 },
    { id: 'phish', name: "Phishing Campaign", baseCost: 50, bps: 4, bpc: 0, owned: 0 },
    { id: 'proxy', name: 'Proxy Server', baseCost: 100, bps: 10, bpc: 0, owned: 0 },
    { id: 'keyboard', name: 'Mechanical Keyboard', baseCost: 150, bps: 0, bpc: 5, owned: 0 },
    { id: 'pc', name: 'Stronger PC', baseCost: 180, bps: 10, bpc: 10, owned: 0 },
    { id: 'iprip', name: 'IP Rip', baseCost: 200, bps: 15, bpc: 0, owned: 0 },
    { id: 'keylog', name: 'Keylogger Drone', baseCost: 300, bps: 25, bpc: 0, owned: 0 },
    { id: 'ducky', name: 'USB Rubber Ducky', baseCost: 500, bps: 40, bpc: 0, owned: 0 }, // NEW
    { id: 'sql', name: 'SQL Injector', baseCost: 750, bps: 55, bpc: 0, owned: 0 },
    { id: 'botnet', name: 'Botnet Cluster', baseCost: 1100, bps: 80, bpc: 0, owned: 0 },
    { id: 'router', name: 'Rogue Wi-Fi Hotspot', baseCost: 2000, bps: 130, bpc: 0, owned: 0 }, // NEW
    
    // --- MID GAME ---
    { id: 'ransom', name: 'Ransomware Worm', baseCost: 3500, bps: 200, bpc: 0, owned: 0 },
    { id: 'crypto', name: 'Crypto Hijacker', baseCost: 9000, bps: 550, bpc: 0, owned: 0 },
    { id: 'insider', name: 'Corporate Insider', baseCost: 15000, bps: 900, bpc: 0, owned: 0 }, // NEW
    { id: 'zeroday', name: 'Zero-Day Exploit', baseCost: 25000, bps: 1500, bpc: 0, owned: 0 },
    { id: 'darkweb', name: 'Dark Web Node', baseCost: 65000, bps: 4000, bpc: 0, owned: 0 },
    { id: 'backdoor', name: 'Silicon Valley Backdoor', baseCost: 150000, bps: 10000, bpc: 0, owned: 0 },
    { id: 'farm', name: 'Offshore Server Farm', baseCost: 400000, bps: 28000, bpc: 0, owned: 0 },
    { id: 'cloud', name: 'Cloud Subversion', baseCost: 1000000, bps: 75000, bpc: 0, owned: 0 },
    { id: 'deepfake', name: 'Deepfake Propaganda', baseCost: 2500000, bps: 200000, bpc: 0, owned: 0 },
    { id: 'cable', name: 'Submarine Cable Tap', baseCost: 8000000, bps: 600000, bpc: 0, owned: 0 },
    { id: 'satellite', name: 'Satellite Uplink Override', baseCost: 25000000, bps: 1800000, bpc: 0, owned: 0 },
    
    // --- LATE GAME ---
    { id: 'quantum', name: 'Quantum Decryptor', baseCost: 85000000, bps: 6000000, bpc: 0, owned: 0 },
    { id: 'bank', name: 'Central Bank Siphon', baseCost: 300000000, bps: 22000000, bpc: 0, owned: 0 },
    { id: 'emp', name: 'EMP Grid Sabotage', baseCost: 1000000000, bps: 80000000, bpc: 0, owned: 0 },
    { id: 'military', name: 'Military Mainframe', baseCost: 4000000000, bps: 350000000, bpc: 0, owned: 0 },
    { id: 'ai', name: 'Sentient Malware', baseCost: 15000000000, bps: 1500000000, bpc: 0, owned: 0 },
    { id: 'neural', name: 'Neural Network Overload', baseCost: 60000000000, bps: 7000000000, bpc: 0, owned: 0 },
    { id: 'laser', name: 'Orbital Laser Syndicate', baseCost: 250000000000, bps: 35000000000, bpc: 0, owned: 0 },
    { id: 'dyson', name: 'Planetary Dyson Matrix', baseCost: 1000000000000, bps: 180000000000, bpc: 0, owned: 0 },
    { id: 'matrix', name: 'Reality Distortion Engine', baseCost: 5000000000000, bps: 1000000000000, bpc: 0, owned: 0 },
    { id: 'internet', name: 'Entire Internet', baseCost: 10000000000000, bps: 65000000000000, bpc: 0, owned: 0 },

    // --- THE NEW ENDGAME (INTERGALACTIC HACKING) ---
    { id: 'lunar', name: 'Lunar Data Center', baseCost: 50000000000000, bps: 400000000000000, bpc: 0, owned: 0 },
    { id: 'mars', name: 'Martian Rover Hack', baseCost: 250000000000000, bps: 2500000000000000, bpc: 0, owned: 0 },
    { id: 'solar', name: 'Interplanetary Grid', baseCost: 1500000000000000, bps: 18000000000000000, bpc: 0, owned: 0 },
    { id: 'alien', name: 'Alien Tech Reverse-Engineering', baseCost: 10000000000000000, bps: 150000000000000000, bpc: 0, owned: 0 },
    { id: 'stellar', name: 'Stellar Engine Siphon', baseCost: 75000000000000000, bps: 1200000000000000000, bpc: 0, owned: 0 },
    { id: 'galactic', name: 'Galactic Mainframe', baseCost: 500000000000000000, bps: 9000000000000000000, bpc: 0, owned: 0 },
    { id: 'blackhole', name: 'Black Hole Computronium', baseCost: 5000000000000000000, bps: 100000000000000000000, bpc: 0, owned: 0 },
    { id: 'multiverse', name: 'Multiverse Node', baseCost: 50000000000000000000, bps: 1500000000000000000000, bpc: 0, owned: 0 },
    { id: 'simulation', name: 'Simulation Root Access', baseCost: 1000000000000000000000, bps: 40000000000000000000000, bpc: 0, owned: 0 }
];

// --- SYSTEM AUDIO ENGINE ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    // If the game is muted, instantly exit this function before playing anything
    if (isMuted) return;

    // Browsers require audio to be "resumed" after the first user click
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // 'square' wave gives it that classic, crunchy retro computer sound
    oscillator.type = 'square'; 

    if (type === 'mine') {
        // A short, high-pitched blip for mining bytes
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Pitch
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Volume (0.05 is quiet)
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05); // Lasts for 0.05 seconds
        
    } else if (type === 'buy') {
        // A slightly longer, higher-pitched ping for buying upgrades
        oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
        
    } else if (type === 'error') {
        // A low, harsh buzz for when they can't afford something
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15);

    } else if (type === 'rebirth') {
        // --- NEW REBIRTH SOUND ---
        oscillator.type = 'sine'; // A smooth wave for a clean "power up" feel
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime); // Starts low
        
        // Sweeps the pitch up to 1500Hz over 0.6 seconds!
        oscillator.frequency.linearRampToValueAtTime(1500, audioCtx.currentTime + 0.6);
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        
        // Fades the volume out smoothly so it doesn't click at the end
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.6);
    }
}


// --- CORE FUNCTIONS ---
function formatNumber(num) {
    // If it's under 1 Million, just use normal commas (e.g., 999,999)
    if (num < 1000000) {
        return Math.floor(num).toLocaleString();
    }

    // The scale of massive numbers
    const suffixes = [
        { value: 1e123, symbol: "Qg" }, // Quadragintillion
        { value: 1e120, symbol: "Not" }, // Novemtrigintillion
        { value: 1e117, symbol: "Oct" }, // Octotrigintillion
        { value: 1e114, symbol: "Spt" }, // Septentrigintillion
        { value: 1e111, symbol: "Sxt" }, // Sextrigintillion
        { value: 1e108, symbol: "Qi" }, // Quintrigintillion
        { value: 1e105, symbol: "Qtt" }, // Quattuortrigintillion
        { value: 1e102, symbol: "Tr" }, // Trestrigintillion
        { value: 1e99, symbol: "Dt" }, // Duotrigintillion
        { value: 1e96, symbol: "Ut" }, // Untrigintillion
        { value: 1e93, symbol: "Tg" }, // Trigintillion
        { value: 1e90, symbol: "Nov" }, // Novemvigintillion
        { value: 1e87, symbol: "Ocv" }, // Octovigintillion
        { value: 1e84, symbol: "Spv" }, // septenvigintillion
        { value: 1e81, symbol: "Svg" }, // Sexvigintillion
        { value: 1e78, symbol: "Qivg" }, // Quinvigintillion
        { value: 1e75, symbol: "Qav" }, // Quattuorvirgintillion
        { value: 1e72, symbol: "Tvg" }, // Trevigintillion
        { value: 1e69, symbol: "Dvg" }, // Duovigintillion
        { value: 1e66, symbol: "Uvg" }, // Unvigintillion
        { value: 1e63, symbol: "V" }, // Vigintillion
        { value: 1e60, symbol: "N" }, // Novemdecillion
        { value: 1e57, symbol: "O" }, // Octodecillion
        { value: 1e54, symbol: "St" }, // Septendecillion
        { value: 1e51, symbol: "Sd" }, // Sexdecillion
        { value: 1e48, symbol: "Qd" }, // Quindecillion
        { value: 1e45, symbol: "Qt" }, // Quattuordecillion
        { value: 1e42, symbol: "Td" }, // Tredecillion
        { value: 1e39, symbol: "Dd" }, // Duodecillion
        { value: 1e36, symbol: "Ud" }, // Undecillion
        { value: 1e33, symbol: "Dc" }, // Decillion
        { value: 1e30, symbol: "No" }, // Nonillion
        { value: 1e27, symbol: "Oc" }, // Octillion
        { value: 1e24, symbol: "Sp" }, // Septillion
        { value: 1e21, symbol: "Sx" }, // Sextillion
        { value: 1e18, symbol: "Qi" }, // Quintillion
        { value: 1e15, symbol: "Qa" }, // Quadrillion (Qa so it doesn't get confused with Quintillion)
        { value: 1e12, symbol: "T" },  // Trillion
        { value: 1e9, symbol: "B" },   // Billion
        { value: 1e6, symbol: "M" }    // Million
    ];

    // Check the number against the scale, from biggest to smallest
    for (let i = 0; i < suffixes.length; i++) {
        if (num >= suffixes[i].value) {
            // Divide the number by its scale, keep 2 decimal places, and add the letter
            return (num / suffixes[i].value).toFixed(2) + suffixes[i].symbol;
        }
    }
    
    // Fallback just in case
    return Math.floor(num).toLocaleString();
}

function getMaxCap() {
    // Finds the Deep Storage upgrade and calculates its bonus
    let extraCapItem = rebirthShopItems.find(i => i.id === 'rb_cap');
    let extraCap = extraCapItem ? (extraCapItem.owned * extraCapItem.effect) : 0;
    
    // Adds the new bonus to your normal formula
    return 100 + (totalRebirths * 25) + extraCap;
}

function getRebirthRequirement() {
    // Starts at 50 Billion, multiplies by 12 for every total rebirth
    let baseReq = 50000000000; 
    return baseReq * Math.pow(2, totalRebirths);
}

function getCost(item) {
    // Finds the Market Manipulator upgrade and calculates the discount
    let discountItem = rebirthShopItems.find(i => i.id === 'rb_discount');
    let discount = discountItem ? (discountItem.owned * discountItem.effect) : 0;
    
    // Calculates the multiplier, but ensures it never drops below 1.05 so the game doesn't break
    let costMultiplier = Math.max(1.05, 1.15 + (totalRebirths * 0.05) - discount); 
    
    return Math.floor(item.baseCost * Math.pow(costMultiplier, item.owned));
}

function getRebirthCost(item) {
    // Calculates the custom cost for each specific rebirth item
    return item.baseCost + (item.owned * item.costStep);
}

function mineBytes() {
    playSound('mine');
    if (isNaN(bytes)) bytes = 0; 
    bytes += bpc; 

    // Record the exact millisecond this click happened
    clickTimestamps.push(Date.now());

    updateUI();
}

function hardReset() {
    if (confirm("WARNING: Are you absolutely sure you want to delete all save data?")) {
        if (confirm("FINAL WARNING: This cannot be undone. All Bytes and Rebirths will be lost. Proceed?")) {
            
            // 1. Clear the storage
            localStorage.clear();

            // 2. Zero out all global variables in active memory
            bytes = 0;
            rebirthPoints = 0;
            totalRebirths = 0;
            ultraRebirthCount = 0;
            totalTimePlayed = 0;

            // 3. Wipe all owned items in both shops
            if (typeof shopItems !== 'undefined') {
                shopItems.forEach(item => item.owned = 0);
            }
            if (typeof rebirthShopItems !== 'undefined') {
                rebirthShopItems.forEach(item => item.owned = 0);
            }

            // 4. Force a save of these zeroes to overwrite the file completely
            if (typeof saveGame === "function") {
                saveGame(); 
            }

            // 5. NOW reload the page
            location.reload();
        }
    }
}

// --- BUY FUNCTIONS ---
function buyItem(index) {
    let item = shopItems[index];
    let cost = getCost(item);
    let maxCap = getMaxCap();

    if (bytes >= cost && item.owned < maxCap) {
        playSound('buy');
        bytes -= cost;
        item.owned++;
        recalculateStats();
        updateUI();
        saveGame();
    } else {
        playSound('error');
    }
}

function buyRebirthItem(index) {
    let item = rebirthShopItems[index];
    let cost = getRebirthCost(item);

    if (rebirthPoints >= cost && item.owned < item.max) {
        playSound('buy')
        rebirthPoints -= cost;
        item.owned++;
        recalculateStats();
        updateUI();
        saveGame();
    } else {
        playSound('error');
    }
}

// --- STAT CALCULATIONS ---
function recalculateStats() {
    let baseBPS = 0;
    let baseBPC = 1; 
    
    // 1. Calculate Base Stats from the Normal Shop
    shopItems.forEach(item => {
        baseBPS += ((item.bps || 0) * item.owned);
        baseBPC += ((item.bpc || 0) * item.owned);
    });

    // 2. Calculate Multipliers
    let bpsMultiplier = 1 + ((rebirthShopItems[0].owned || 0) * (rebirthShopItems[0].effect || 0));
    
    // 2 to the power of however many upgrades you own
    let clickUpgradesOwned = rebirthShopItems[1].owned || 0;
    let bpcMultiplier = Math.pow(2, clickUpgradesOwned);

    // Calculate the Ultra Rebirth Global Boost (10x per level)
    // Using Math.pow(10, ultraBoostLevel) makes it exponential: 10x, 100x, 1000x...
    let ultraMultiplier = Math.pow(5, ultraBoostLevel);


    // 3. Apply the Multipliers
    bps = baseBPS * bpsMultiplier * ultraMultiplier;
    bpc = baseBPC * bpcMultiplier * ultraMultiplier;

    // 4. Final Safety Net
    if (isNaN(bps)) bps = 0;
    if (isNaN(bpc)) bpc = 1; 
}

// Converts raw seconds into Days, Hours, Minutes, and Seconds
function formatTime(seconds) {
    let d = Math.floor(seconds / (3600 * 24));
    let h = Math.floor(seconds % (3600 * 24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? d + "d " : "";
    let hDisplay = h > 0 ? h + "h " : "";
    let mDisplay = m > 0 ? m + "m " : "";
    let sDisplay = s + "s";

    return dDisplay + hDisplay + mDisplay + sDisplay;
}

// --- UI UPDATES ---
function updateUI() {
    let maxCap = getMaxCap();

    // Text updates
    document.getElementById('byte-count').innerText = formatNumber(bytes);
    document.getElementById('bps-count').innerText = formatNumber(bps);
    document.getElementById('bpc-count').innerText = formatNumber(bpc);
    document.getElementById('rebirth-points').innerText = formatNumber(rebirthPoints);
    document.getElementById('total-rebirths').innerText = formatNumber(totalRebirths);

    // Rebirth Shop Gen
    const rShopContainer = document.getElementById('rebirth-shop-container');
    if (rShopContainer) {
        rShopContainer.innerHTML = ''; 
        rebirthShopItems.forEach((item, index) => {
            let currentCost = getRebirthCost(item);
            let isMaxed = item.owned >= item.max;
            let canAfford = rebirthPoints >= currentCost && !isMaxed;

            let itemDiv = document.createElement('div');
            itemDiv.className = 'rebirth-item';
            itemDiv.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p style="color: #ccc; font-size: 0.9em;">Level: ${item.owned}/${item.max} | Cost: ${isMaxed ? 'MAX' : currentCost + ' Rebirths'}</p>
                </div>
                <button onclick="buyRebirthItem(${index})" ${canAfford ? '' : 'disabled'}>
                    ${isMaxed ? 'MAXED' : 'BUY'}
                </button>
            `;
            rShopContainer.appendChild(itemDiv);
        });
    }

    // Normal Shop Gen
    const shopContainer = document.getElementById('shop-container');
    let allMaxed = true; 
    if (shopContainer) {
        shopContainer.innerHTML = ''; 
        shopItems.forEach((item, index) => {
            let currentCost = getCost(item);
            let isMaxed = item.owned >= maxCap;
            let canAfford = bytes >= currentCost && !isMaxed;
            let effectText = item.bpc > 0 ? `+${formatNumber(item.bpc)} BPC` : `+${formatNumber(item.bps)} BPS`;

            if (!isMaxed) allMaxed = false;

            let itemDiv = document.createElement('div');
            itemDiv.className = 'shop-item';
            itemDiv.innerHTML = `
                <div>
                    <h3>${item.name} (${item.owned}/${maxCap})</h3>
                    <p>${isMaxed ? 'MAX CAPACITY' : `${effectText} | Cost: ${formatNumber(currentCost)} Bytes`}</p>
                </div>
                <button onclick="buyItem(${index})" ${canAfford ? '' : 'disabled'}>
                    ${isMaxed ? 'MAXED' : 'BUY'}
                </button>
            `;
            shopContainer.appendChild(itemDiv);
        });
    }

    // --- NORMAL REBIRTH BUTTON LOGIC ---
    let rebirthBtn = document.getElementById('rebirth-btn');
    if (rebirthBtn) {
        let req = getRebirthRequirement(); // Grabs the dynamic cost
        
        if (bytes >= req) {
            // Unlocks the button
            rebirthBtn.disabled = false;
            rebirthBtn.innerText = "[ INITIATE REBIRTH ]";
            rebirthBtn.style.color = "#ff00ff"; // Gives it a nice hacker-green glow
            rebirthBtn.style.borderColor = "#ff00ff";
        } else {
            // Locks the button and shows the current cost
            rebirthBtn.disabled = true;
            // Note: If you have a number formatter (like formatBytes(req)), wrap 'req' in it!
            rebirthBtn.innerText = `Rebirth (Requires ${formatNumber(req)} Bytes)`; 
            rebirthBtn.style.color = ""; 
            rebirthBtn.style.borderColor = "";
        }
    }

    // --- ULTRA REBIRTH BUTTON LOGIC ---
    let ultraBtn = document.getElementById('ultra-rebirth-btn');
    if (ultraBtn) {
        let blocker = getUltraRebirthBlocker(); // Runs the scanner
        
        if (blocker === null) {
            // Nothing is blocking it! You can rebirth.
            ultraBtn.disabled = false;
            ultraBtn.innerText = "[ INITIATE ULTRA REBIRTH ]";
            ultraBtn.style.color = "#ff33ff";
            ultraBtn.style.borderColor = "#ff33ff";
        } else {
            // Something is missing, so we print exactly what it is on the button!
            ultraBtn.disabled = true;
            ultraBtn.innerText = `Ultra Rebirth Locked (${blocker})`;
            ultraBtn.style.color = ""; 
            ultraBtn.style.borderColor = "";
        }
    }


    // Update the raget based on your progress
    let targetDisplay = document.getElementById('target-name');
    if (targetDisplay) {
        if (bytes >= 100000000000000000000000000) { // 1 Nonillion
            targetDisplay.innerText = "Target: Escaping Reality";
        } else if (bytes >= 1000000000000000000000000) { // 1 Octillion
            targetDisplay.innterText = "Target: The Matrix Core";
        } else if (bytes >= 10000000000000000000000) { // 1 Septillion
            targetDisplay.innerText = "Target: The Multiverse"
        } else if (bytes >= 100000000000000000000) { // 1 Sextillion
            targetDisplay.innerText = "Target: Dimension Rift Creator";
        } else if (bytes >= 1000000000000000000) { // 1 Quintillion
            targetDisplay.innerText = "Target: The Universe";
        } else if (bytes >= 1000000000000000) { // 1 Quadrillion
            targetDisplay.innerText = "Target: Alien Technology";
        } else if (bytes >= 1000000000000000) { // 1 Quadrillion
            targetDisplay.innerText = "Target: Alien Spaceships";
        } else if (bytes >= 500000000000000) { // 500 Trillion
            targetDisplay.innerText = "Target: The World";
        } else if (bytes >= 1000000000000) { // 1 Trillion
            targetDisplay.innerText = "Target: The Matrix Core";
        } else if (bytes >= 1000000000000) { // 1 Trillion
            targetDisplay.innerText = "Target: Global AI Hivemind";
        } else if (bytes >= 500000000000) { // 500 Billion
            targetDisplay.innerText = "Target: Multiverse Simulation Node";
        } else if (bytes >= 1000000000) { // 1 Billion
            targetDisplay.innerText = "Target: Deep Web Backbone";
        } else if (bytes >= 500000000) { // 500 Million
            targetDisplay.innerText = "Target: Global Satellite Network";
        } else if (bytes >= 100000000) { // 100 Million
            targetDisplay.innerText = "Target: Military Defense Grid";
        } else if (bytes >= 50000000) { // 50 Million
            targetDisplay.innerText = "Target: International Space Station";
        } else if (bytes >= 10000000) { // 10 Million
            targetDisplay.innerText = "Target: Central Intelligence Database";
        } else if (bytes >= 5000000) { // 5 Million
            targetDisplay.innerText = "Target: National Power Grid";
        } else if (bytes >= 1000000) { // 1 Million
            targetDisplay.innerText = "Target: Secret Government Database";
        } else if (bytes >= 500000) { // 500k
            targetDisplay.innerText = "Target: Offshore Bank Servers";
        } else if (bytes >= 100000) { // 100k
            targetDisplay.innerText = "Target: Tech Conglomerate Mainframe";
        } else if (bytes >= 50000) { // 50k
            targetDisplay.innerText = "Target: Cryptocurrency Exchange";
        } else if (bytes >= 25000) { // 25k
            targetDisplay.innerText = "Target: Regional ISP Node";
        } else if (bytes >= 10000) { // 10k
            targetDisplay.innerText = "Target: Corporate Firewall";
        } else if (bytes >= 5000) { // 5k
            targetDisplay.innerText = "Target: Small Business Internet";
        } else if (bytes >= 1000) { // 1k
            targetDisplay.innerText = "Target: Local Coffee Shop Router";
        } else if (bytes >= 500) { // 500
            targetDisplay.innerText = "Target: Public Library Terminal";
        } else if (bytes >= 100) { // 100
            targetDisplay.innerText = "Target: Neighbor's Smart Fridge";
        } else { 
            // 0 Bytes (Starting Target)
            targetDisplay.innerText = "Target: Neighbor's Unsecured Wi-Fi";
        }
    }
}

// --- SAVE / LOAD SYSTEM ---
function saveGame() {
    const gameSave = {
        bytes: bytes,
        rebirthPoints: rebirthPoints,
        totalRebirths: totalRebirths,
        shopItems: shopItems,
        rebirthShopItems: rebirthShopItems
    };
    // USING NEW SAVE KEY
    localStorage.setItem('idleHackerSave_v2', JSON.stringify(gameSave));
    localStorage.setItem('totalTimePlayed', totalTimePlayed);
    localStorage.setItem('ultraRebirthCount', ultraRebirthCount);
    
    // Save the permanent reward tracking variables (Update these variable names if you named them differently!)
    localStorage.setItem('ultraOverclock', ultraOverclock); // Multiplies bytes by 10x
    localStorage.setItem('ultraDataMiner', ultraDataMiner); // Doubles Rebirth Points
    localStorage.setItem('ultraGhostCache', ultraGhostCache); // Start with 1B bytes
}

function loadGame() {
    // USING NEW SAVE KEY
    const savedData = localStorage.getItem('idleHackerSave_v2');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        totalRebirths = parsedData.totalRebirths || 0;
        rebirthPoints = parsedData.rebirthPoints || 0;
        bytes = parsedData.bytes || 0;
        totalTimePlayed = parseInt(localStorage.getItem('totalTimePlayed')) || 0;
        ultraRebirthCount = parseInt(localStorage.getItem('ultraRebirthCount')) || 0;
    
         // Load the permanent rewards
        ultraOverclock = parseInt(localStorage.getItem('ultraOverclock')) || 0;
        ultraDataMiner = parseInt(localStorage.getItem('ultraDataMiner')) || 0;
        ultraGhostCache = parseInt(localStorage.getItem('ultraGhostCache')) || 0;
        
        if (parsedData.shopItems) {
            parsedData.shopItems.forEach(savedItem => {
                let currentItem = shopItems.find(i => i.id === savedItem.id);
                if (currentItem) currentItem.owned = savedItem.owned;
            });
        }
        
        if (parsedData.rebirthShopItems) {
            parsedData.rebirthShopItems.forEach(savedItem => {
                let currentItem = rebirthShopItems.find(i => i.id === savedItem.id);
                if (currentItem) currentItem.owned = savedItem.owned;
            });
        }
        let ultraCountElement = document.getElementById('ultra-rebirth-count');
        if (ultraCountElement) {
            ultraCountElement.innerText = ultraRebirthCount;
        }
    }
    recalculateStats();
    updateUI();
}

function attemptRebirth() {
    let req = getRebirthRequirement();

    // Checks if you have enough Bytes
    if (bytes >= req) {
        
        // 1. Calculate how many points they should get based on their Ultra level
        // Math.pow(2, 0) = 1 point. Math.pow(2, 1) = 2 points. Math.pow(2, 2) = 4 points.
        let pointsToEarn = Math.pow(2, ultraRPLevel);

        // 2. We use backticks ( ` ) here instead of quotes so we can inject the exact number into the text!
        if(confirm(`Initiate System Rebirth? You will lose all current Bytes and normal Upgrades, but gain +${pointsToEarn} Rebirth Point(s) for permanent upgrades!`)) {

            // --- PLAY THE SOUND HERE ---
            playSound('rebirth');
            
            // --- THE NEW MAGIC LINE ---
            rebirthPoints += pointsToEarn; // Adds the calculated points instead of just 1
            totalRebirths++; 
            // --------------------------
            
            // Set starting bytes based on the Starting Cache upgrade
            bytes = rebirthShopItems[2].owned * rebirthShopItems[2].effect;
            
            // Wipe normal shop
            shopItems.forEach(item => item.owned = 0);
            
            recalculateStats();
            saveGame(); 
            updateUI(); 
        }
    }
}

// --- ULTRA REBIRTH ENGINE ---

function getUltraRebirthBlocker() {
    try {
        // --- THIS IS THE MAGIC FIX ---
        // Instead of doing manual math here, we ask your game what the real cap is!
        let currentNormalMax = getMaxCap(); 

        // 1. Scan the Normal Shop
        if (typeof shopItems === 'undefined') return "CRASH: 'shopItems' array does not exist!";
        for (let i = 0; i < shopItems.length; i++) {
            let item = shopItems[i];
            
            // Normal items STRICTLY use the dynamic max capacity now.
            let limit = currentNormalMax; 
            
            if (item.owned < limit) return `Requires: ${item.name} (Lvl ${item.owned}/${limit})`;
        }

        // 2. Scan the Rebirth Shop
        if (typeof rebirthShopItems === 'undefined') return "CRASH: 'rebirthShopItems' array does not exist!";
        for (let i = 0; i < rebirthShopItems.length; i++) {
            let item = rebirthShopItems[i];
            
            // Rebirth upgrades have their own individual maxes built into their code
            let limit = item.max || item.maxLevel; 
            
            // Safety check just in case a rebirth item is missing its max
            if (limit === undefined) return `ERROR: [Q] ${item.name || 'Unknown'} missing max limit!`;
            
            if (item.owned < limit) return `Requires: [Q] ${item.name} (Lvl ${item.owned}/${limit})`;
        }

        return null; // Everything is maxed!
    } catch (error) {
        return "JS ERROR: " + error.message;
    }
}

function attemptUltraRebirth() {
    // 1. Check the scanner to make absolutely sure they are allowed to Ultra Rebirth
    if (getUltraRebirthBlocker() !== null) {
        return; // If the scanner finds an issue, stop the function entirely.
    }

    // --- PLAY THE REBIRTH SOUND ---
    playSound('rebirth');

    // 2. Add to their Ultra Rebirth counter
    ultraRebirthCount++;

    // 3. (Optional) Put your permanent reward logic here, or trigger your modal!
    // Example: showUltraRebirthModal(); 

    // 4. Wipe the current run's data (Bytes, normal upgrades, regular rebirth upgrades)
    bytes = 0;
    rebirthPoints = 0;

    // Reset Normal Shop
    shopItems.forEach(item => {
        item.owned = 0;
    });

    // Reset Rebirth Shop
    rebirthShopItems.forEach(item => {
        item.owned = 0;
    });

    // 5. Save the game and update the screen
    recalculateStats();
    saveGame();
    updateUI();

    // 6. Give the player some feedback so they know it worked!
    alert("SYSTEM OVERRIDE COMPLETE. ULTRA REBIRTH SUCCESSFUL.");
}

function selectUltraReward(choice) {
    // 1. Hide the menu
    document.getElementById('ultra-reward-modal').style.display = 'none';

    // 2. Apply the chosen reward
    if (choice === 1) ultraBoostLevel++;
    if (choice === 2) ultraRPLevel++;
    if (choice === 3) ultraHeadStartLevel++;

    // 3. Grant the Ultra Rebirth stat
    ultraRebirths++;

    // 4. Wipe the board, but factor in the Head Start reward!
    // 1 Billion Bytes per level of Ghost Cache
    bytes = ultraHeadStartLevel * 1000000000; 
    rebirthPoints = 0;

    shopItems.forEach(item => item.owned = 0);
    rebirthShopItems.forEach(item => item.owned = 0);

    // 5. Finalize
    recalculateStats();
    updateUI();
    if (typeof saveGame === "function") saveGame();
    
    alert("REBOOT COMPLETE. Protocol accepted.");
}

// --- THE GAME LOOP ---
setInterval(() => {
    bytes += bps;
    updateUI();
    saveGame();
}, 1000);

setInterval(() => {
    let now = Date.now();

    // Filter out any clicks that happened more than 1000ms (1 second) ago
    clickTimestamps =clickTimestamps.filter(time => now - time <= 1000);

    // Update the HTML with the number of clicks left in the array
    let cpsDisplay = document.getElementById('cps-count');
    if (cpsDisplay) {
        cpsDisplay.innerText = formatNumber(clickTimestamps.length);
    }
}, 100);

// --- SYSTEM UPTIME CLOCK ---
// --- SYSTEM UPTIME CLOCK ---
setInterval(() => {
    totalTimePlayed++;
    
    // Update the UI
    let uptimeElement = document.getElementById('uptime-display');
    if (uptimeElement) {
        uptimeElement.innerText = formatTime(totalTimePlayed);
    }
}, 1000); // 1000 milliseconds = 1 second

loadGame();

// --- MATRIX DIGITAL RAIN BACKGROUND ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Make the canvas fill the entire screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas(); // Run once on load
window.addEventListener('resize', resizeCanvas); // Run again if window changes size

// Matrix characters and setup
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=~';
const fontSize = 14;
// Calculate how many columns we need based on window width
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }).fill(1);

// Redraw columns if screen resizes
window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }).fill(1);
});

function drawMatrix() {
    // Fades the previous frame slightly
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // NEW: Make the font BOLD so it's thicker and easier to see
    ctx.font = 'bold ' + fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // NEW: 10% chance for a character to be glowing white, otherwise neon green
        if (Math.random() > 0.9) {
            ctx.fillStyle = '#ffffff'; 
        } else {
            ctx.fillStyle = '#39ff14'; // Matches your game's exact neon green
        }
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly reset the drop to the top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++; // Move the drop down
    }
}

// Run the animation at roughly 30 frames per second
setInterval(drawMatrix, 33);

// --- RANDOM EVENT ENGINE (Guaranteed 5-8 Minute Window) ---
let packetActive = false;

function spawnDataPacket() {
    if (!packetActive) {
        packetActive = true;
        let packet = document.getElementById('data-packet');
        
        let randomX = Math.floor(Math.random() * 70) + 10; 
        let randomY = Math.floor(Math.random() * 70) + 10; 
        
        packet.style.left = randomX + 'vw';
        packet.style.top = randomY + 'vh';
        packet.style.display = 'block';

        // Disappears after 8 seconds if not clicked
        setTimeout(() => {
            if (packetActive) {
                packet.style.display = 'none';
                packetActive = false;
            }
        }, 8000);
    }
    
    // Once it spawns, queue up the next one!
    queueNextPacket();
}

function claimDataPacket() {
    if (!packetActive) return;

    // Immediately hide it
    let packet = document.getElementById('data-packet');
    packet.style.display = 'none';
    packetActive = false;

    // Reward the player
    let reward = Math.max(bps * 100, 500);
    bytes += reward;
    
    updateUI();
}

function queueNextPacket() {
    // 5 minutes = 300,000 ms | 8 minutes = 480,000 ms
    let minTime = 180000;
    let maxTime = 600000;
    
    let randomDelay = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    
    setTimeout(spawnDataPacket, randomDelay);
}

// Kick off the very first timer when the script loads
queueNextPacket();

// --- LICENSE MODAL LOGIC ---
function showLicense() {
    document.getElementById('license-modal').style.display = 'flex';
    document.getElementById('license-modal').style.setProperty('display', 'flex', 'important');
}

function hideLicense() {
    // Changes it back to hidden
    document.getElementById('license-modal').style.display = 'none';
}

// --- INSTRUCTIONS MODAL LOGIC ---
function openInstructions() {
    document.getElementById('instructions-modal').style.display = 'block';
}

function closeInstructions() {
    document.getElementById('instructions-modal').style.display = 'none';
}

// --- SYSTEM INITIALIZATION ---
function initializeSystem() {
    // 1. Hide the boot screen
    document.getElementById('boot-screen').style.display = 'none';

    // 2. Start the background music instantly
    if (!musicStarted) {
        let bgm = document.getElementById('bg-music');
        if (bgm) {
            bgm.volume = 0.3;
            bgm.play();
        }
        musicStarted = true;
    }
}

// --- AUDIO MUTE SYSTEM ---
function toggleMute() {
    isMuted = !isMuted; // Flips the state between true and false
    
    let muteBtn = document.getElementById('mute-btn');
    let bgm = document.getElementById('bg-music');

    if (isMuted) {
        // 1. Silence the background music
        if (bgm) bgm.muted = true;
        
        // 2. Change the button to look like a warning
        muteBtn.innerText = "[ UNMUTE AUDIO ]";
        muteBtn.classList.add("muted");
    } else {
        // 1. Turn the background music back on
        if (bgm) bgm.muted = false;
        
        // 2. Change the button back to normal green
        muteBtn.innerText = "[ MUTE AUDIO ]";
        muteBtn.classList.remove("muted");
    }
}