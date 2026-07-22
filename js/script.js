/* Alphajiri Movers & Cleaners — Interactive Scripts */

document.addEventListener('DOMContentLoaded', function() {

    // === INSTANT QUOTE CALCULATOR ===
    const serviceSelect = document.getElementById('serviceType');
    const sizeSelect = document.getElementById('propertySize');
    const estimateBox = document.getElementById('estimateBox');
    const estimatePrice = document.getElementById('estimatePrice');
    const estimatedPriceInput = document.getElementById('estimatedPriceInput');

    function calculateEstimate() {
        if (!serviceSelect || !sizeSelect) return;
        const basePrice = parseFloat(serviceSelect.selectedOptions[0]?.dataset.price || 0);
        const multiplier = parseFloat(sizeSelect.selectedOptions[0]?.dataset.mult || 0);

        if (basePrice && multiplier) {
            const price = Math.round((basePrice * multiplier) / 100) * 100;
            estimatePrice.textContent = 'KES ' + price.toLocaleString();
            estimatedPriceInput.value = price;
            estimateBox.style.display = 'block';
            estimateBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            estimateBox.style.display = 'none';
        }
    }

    if (serviceSelect) serviceSelect.addEventListener('change', calculateEstimate);
    if (sizeSelect) sizeSelect.addEventListener('change', calculateEstimate);

    // === Set minimum date to tomorrow ===
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // === SMOOTH SCROLL FOR ANCHORS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
