const GLOBALS = {
    instagram: "https://instagram.com/nikhshay",
    whatsapp: "https://wa.me/66816033069",
    phone: "tel:+66816033069",
    phoneText: "Call Us"
};

document.addEventListener("DOMContentLoaded", () => {
    // Create the footer element
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
        <div class="social">
            <a id="footer-instagram-link" href="${GLOBALS.instagram}" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
            <a id="footer-email-link" href="#" onclick="openContactForm()">
                <i class="fas fa-envelope"></i>
            </a>
             <a id="footer-whatsapp-link" href="${GLOBALS.whatsapp}" target="_blank">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a id="footer-phone-link" href="${GLOBALS.phone}">
                <i class="fas fa-phone"></i>
            </a>
        </div>
        <p class="copyright">&copy; 2025 Possibility Inc. All rights reserved.</p>
    `;

    // Append the footer to the body
    document.body.appendChild(footer);
});