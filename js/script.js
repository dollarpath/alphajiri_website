/* Alphajiri Movers & Cleaners — Interactive Scripts */

document.addEventListener('DOMContentLoaded', function() {

    function applyResponsiveMode() {
        const isMobile = window.matchMedia('(max-width: 991px)').matches ||
            window.matchMedia('(pointer: coarse)').matches ||
            /Android|iPhone|iPad|Mobile|Windows Phone/i.test(navigator.userAgent);

        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-desktop', !isMobile);
    }

    applyResponsiveMode();
    window.addEventListener('resize', applyResponsiveMode);

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkPath = href.split('/').pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const navMenu = document.getElementById('mainNav');
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991 && navMenu?.classList.contains('show')) {
                const collapse = window.bootstrap?.Collapse.getOrCreateInstance(navMenu);
                collapse?.hide();
            }
        });
    });

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

    const quoteForm = document.getElementById('quoteForm');
    const movingServiceNames = [
        'Home Moving',
        'Office Relocation',
        'Packing Services',
        'General Cleaning',
        'Pet Relocation',
        'Courier',
        'Combo'
    ];

    function updateLocationFields() {
        const serviceValue = serviceSelect ? serviceSelect.value : '';
        const isMovingService = movingServiceNames.includes(serviceValue);
        const pickupLocationGroup = document.getElementById('pickupLocationGroup');
        const pickupFloorGroup = document.getElementById('pickupFloorGroup');
        const dropoffLocationGroup = document.getElementById('dropoffLocationGroup');
        const dropoffFloorGroup = document.getElementById('dropoffFloorGroup');

        const locationFields = [pickupLocationGroup, pickupFloorGroup, dropoffLocationGroup, dropoffFloorGroup];
        locationFields.forEach(group => {
            if (!group) return;
            const display = isMovingService ? 'block' : 'none';
            group.style.display = display;
        });

        const pickupLocationInput = document.querySelector('input[name="Pickup Location"]');
        const dropoffLocationInput = document.querySelector('input[name="Dropoff Location"]');

        const toggleRequired = (input, required) => {
            if (!input) return;
            input.required = required;
            input.setAttribute('aria-required', required ? 'true' : 'false');
        };

        toggleRequired(pickupLocationInput, isMovingService);
        toggleRequired(dropoffLocationInput, isMovingService);
    }

    if (quoteForm) {
        serviceSelect && serviceSelect.addEventListener('change', updateLocationFields);
        updateLocationFields();

        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const isMovingService = movingServiceNames.includes(serviceSelect ? serviceSelect.value : '');
            if (isMovingService) {
                const pickupLocationInput = document.querySelector('input[name="Pickup Location"]');
                const dropoffLocationInput = document.querySelector('input[name="Dropoff Location"]');
                if (!pickupLocationInput.value.trim() || !dropoffLocationInput.value.trim()) {
                    quoteForm.reportValidity();
                    return;
                }
            }

            if (!quoteForm.checkValidity()) {
                quoteForm.reportValidity();
                return;
            }

            const formData = new FormData(quoteForm);
            const fullName = (formData.get('Full Name') || '').trim();
            const phone = (formData.get('Phone') || '').trim();
            const service = (formData.get('Service') || '').trim();
            const propertySize = (formData.get('Property Size') || '').trim();
            const pickupLocation = (formData.get('Pickup Location') || '').trim();
            const pickupFloor = (formData.get('Pickup Floor') || '').trim();
            const dropoffLocation = (formData.get('Dropoff Location') || '').trim();
            const dropoffFloor = (formData.get('Dropoff Floor') || '').trim();
            const preferredDate = (formData.get('Preferred Date') || '').trim();
            const notes = (formData.get('Notes') || '').trim();

            const message = [
                'Hello Alphajiri Movers & Cleaners,',
                '',
                'I would like to request a quotation for the following service.',
                '',
                'Client Details:',
                `• Full Name: ${fullName || 'Not provided'}`,
                `• Phone: ${phone || 'Not provided'}`,
                `• Service Type: ${service || 'Not provided'}`,
                `• Property Size: ${propertySize || 'Not provided'}`,
                '',
                isMovingService ? 'Moving Details:' : 'Service Details:',
                isMovingService ? `• From Location: ${pickupLocation || 'Not provided'}` : '',
                isMovingService ? `• From Floor: ${pickupFloor || 'Not provided'}` : '',
                isMovingService ? `• To Location: ${dropoffLocation || 'Not provided'}` : '',
                isMovingService ? `• To Floor: ${dropoffFloor || 'Not provided'}` : '',
                `• Preferred Date: ${preferredDate || 'Not provided'}`,
                '',
                'Additional Information:',
                notes ? `• Notes: ${notes}` : '• Notes: None provided',
                '',
                'Please share the quotation and next steps with me.'
            ].filter(Boolean).join('\n');

            const whatsappUrl = 'https://wa.me/254708076946?text=' + encodeURIComponent(message);
            window.open(whatsappUrl, '_blank');
        });
    }

    const hashTarget = window.location.hash;
    if (hashTarget === '#quote-form') {
        const quoteFormBlock = document.getElementById('quote-form');
        if (quoteFormBlock) {
            setTimeout(() => {
                quoteFormBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    }

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
