// Game State initialized with break_eternity Decimals
let player = {
    energy: new Decimal(0),
    generators: new Decimal(0),
    generatorCost: new Decimal(10),
    generatorProduction: new Decimal(1)
};

// DOM Elements
const energyDisplay = document.getElementById("energy-display");
const clickBtn = document.getElementById("click-btn");
const generatorBtn = document.getElementById("generator-btn");
const generatorsDisplay = document.getElementById("generators-display");

// Manual Clicking
clickBtn.addEventListener("click", () => {
    player.energy = player.energy.add(1); // Standard addition syntax
    updateUI();
});

// Buying Generators
generatorBtn.addEventListener("click", () => {
    if (player.energy.gte(player.generatorCost)) { // .gte() means Greater Than or Equal To
        player.energy = player.energy.sub(player.generatorCost); // .sub() for subtraction
        player.generators = player.generators.add(1);
        
        // Scale the cost exponentially for incremental progression
        player.generatorCost = player.generatorCost.times(1.5); // .times() for multiplication
        
        updateUI();
    }
});

// Format numbers nicely for the player
function format(decimal) {
    if (decimal.lt(1000)) return decimal.toFixed(0);
    // Automatically switches to scientific notation (e.g., 1.23e45) for large numbers
    return decimal.toString(); 
}

function updateUI() {
    energyDisplay.innerText = format(player.energy);
    generatorsDisplay.innerText = format(player.generators);
    generatorBtn.innerText = `Buy Generator (Cost: ${format(player.generatorCost)})`;
}

// Core Game Loop (Runs 20 times per second)
setInterval(() => {
    if (player.generators.gt(0)) {
        // Production per tick = (Generators * Production) / 20 ticks per second
        let productionPerTick = player.generators.times(player.generatorProduction).div(20);
        player.energy = player.energy.add(productionPerTick);
        updateUI();
    }
}, 50);
