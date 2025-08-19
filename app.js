// Load existing shortcodes from localStorage
let urls = JSON.parse(localStorage.getItem("urls")) || {};

const resultDiv = document.querySelector(".result");
const tableBody = document.getElementById("url-table-body");

// Render saved URLs in table
function renderTable() {
    tableBody.innerHTML = "";
    for (const shortcode in urls) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${shortcode}</td>
            <td><a href="${urls[shortcode]}" target="_blank">${urls[shortcode]}</a></td>
            <td><a href="${window.location.href.split('#')[0]}#${shortcode}" target="_blank">
                ${window.location.href.split('#')[0]}#${shortcode}
            </a></td>
        `;

        tableBody.appendChild(row);
    }
}

// Generate random shortcode
function generateShortcode(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Simple URL validation
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}

// Handle form submission
document.getElementById("shorten-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const urlInput = document.getElementById("url");
    const url = urlInput.value.trim();

    if (!url) {
        resultDiv.innerHTML = "Please enter a URL.";
        return;
    }

    if (!isValidUrl(url)) {
        resultDiv.innerHTML = " Invalid URL format.";
        return;
    }

    // Generate unique shortcode
    let shortcode;
    do {
        shortcode = generateShortcode();
    } while (urls[shortcode]); // ensure uniqueness

    // Save to localStorage
    urls[shortcode] = url;
    localStorage.setItem("urls", JSON.stringify(urls));

    resultDiv.innerHTML = ` Shortened URL: 
        <a href="#${shortcode}" target="_blank">${window.location.href.split('#')[0]}#${shortcode}</a>`;

    urlInput.value = ""; // clear input
    urlInput.focus();    // focus back on input

    renderTable();
});

// Handle redirection when user opens a hash link
function handleRedirect() {
    const shortcode = location.hash.substring(1);
    if (urls[shortcode]) {
        window.location.href = urls[shortcode];
    }
}

window.addEventListener("hashchange", handleRedirect);
window.addEventListener("load", handleRedirect);

// Render table on page load
renderTable();