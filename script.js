// script.js
let cacheSize = 0;
let cache = [];
let cacheHits = 0;
let cacheMisses = 0;

function initializeCache() {
    cacheSize = parseInt(document.getElementById("cacheSize").value);
    cache = new Array(cacheSize).fill(null);
    cacheHits = 0;
    cacheMisses = 0;
    updateCacheUI();
}

function accessData(replacementPolicy) {
    const data = prompt("Enter Data to Access:");
    if (data) {
        if (!cache.includes(data)) {
            // Cache miss
            if (cache.length >= cacheSize) {
                if (replacementPolicy === 'FIFO') {
                    // FIFO: Remove the first item
                    cache.shift();
                } else {
                    // LRU: Remove the least recently used item
                    cache.shift();
                }
            }
            // Add the new data to cache
            cache.push(data);
            cacheMisses++;
        } else {
            // Cache hit
            cacheHits++;
        }
        updateCacheUI();
    }
}

function updateCacheUI() {
    const cacheContainer = document.getElementById("cacheContainer");
    cacheContainer.innerHTML = "";

    for (let i = 0; i < cache.length; i++) {
        const cacheItem = document.createElement("div");
        cacheItem.className = "cache";
        cacheItem.textContent = cache[i] || "-";
        cacheContainer.appendChild(cacheItem);
    }

    const cacheStatus = document.getElementById("cacheStatus");
    cacheStatus.textContent = `Cache Status: [${cache.join(", ")}]`;

    const hitRate = cacheHits / (cacheHits + cacheMisses);
    const missRate = cacheMisses / (cacheHits + cacheMisses);

    const cacheStats = document.getElementById("cacheStats");
    cacheStats.innerHTML = `
        Cache Hits: ${cacheHits}<br>
        Cache Misses: ${cacheMisses}<br>
        Hit Rate: ${hitRate.toFixed(2)}<br>
        Miss Rate: ${missRate.toFixed(2)}
    `;
}
