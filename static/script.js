let cryptoData = [];

function fetchData() {
    fetch("/api/crypto")
        .then(res => res.json())
        .then(data => {
            cryptoData = data;
            renderTable(data);
        })
        .catch(err => console.error("API Error:", err));
}

function renderTable(data) {
    const body = document.getElementById("crypto-body");
    body.innerHTML = "";

    data.forEach((coin, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${coin.image}" width="20"> ${coin.name} (${coin.symbol.toUpperCase()})</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
                ${coin.price_change_percentage_24h?.toFixed(2)}%
            </td>
            <td>$${coin.market_cap.toLocaleString()}</td>
        `;
        body.appendChild(row);
    });
}

function filterTable(value) {
    const filtered = cryptoData.filter(coin =>
        coin.name.toLowerCase().includes(value.toLowerCase())
    );
    renderTable(filtered);
}

function recommendTop() {
    const top = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 10);
    renderTable(top);
}

function recommendStable() {
    const stable = cryptoData.filter(coin =>
        Math.abs(coin.price_change_percentage_24h) < 1
    );
    renderTable(stable);
}

document.getElementById("search").addEventListener("input", e => {
    filterTable(e.target.value);
});

fetchData();
