/* Alphajiri Movers & Cleaners — Interactive Scripts */

document.addEventListener('DOMContentLoaded', function() {

    if (window.AOS) {
        window.AOS.init({ duration: 800, once: true, offset: 80 });
    }

    const nav = document.getElementById('mainNavbar');
    if (nav) {
        const updateNavbar = () => nav.classList.toggle('scrolled', window.scrollY > 50);
        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
    }

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
    const allowedServiceNames = [
        ...movingServiceNames,
        'Deep Cleaning',
        'Post-Construction Cleaning',
        'Fumigation',
        'Storage'
    ];

    function normalizedField(formData, fieldName, maxLength) {
        return String(formData.get(fieldName) || '')
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, maxLength);
    }

    function wasRecentlySubmitted() {
        try {
            const lastSubmission = Number(sessionStorage.getItem('quoteSubmittedAt') || 0);
            return Date.now() - lastSubmission < 10000;
        } catch (error) {
            return false;
        }
    }

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

            if (wasRecentlySubmitted()) return;

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
            const fullName = normalizedField(formData, 'Full Name', 80);
            const phone = normalizedField(formData, 'Phone', 30);
            const service = normalizedField(formData, 'Service', 40);
            const propertySize = normalizedField(formData, 'Property Size', 100);
            const pickupLocation = normalizedField(formData, 'Pickup Location', 120);
            const pickupFloor = normalizedField(formData, 'Pickup Floor', 40);
            const dropoffLocation = normalizedField(formData, 'Dropoff Location', 120);
            const dropoffFloor = normalizedField(formData, 'Dropoff Floor', 40);
            const preferredDate = normalizedField(formData, 'Preferred Date', 10);
            const notes = normalizedField(formData, 'Notes', 500);

            const requestedDate = new Date(`${preferredDate}T00:00:00`);
            const tomorrow = new Date();
            tomorrow.setHours(0, 0, 0, 0);
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (!allowedServiceNames.includes(service) ||
                !/^\+?[0-9 ()-]{7,20}$/.test(phone) ||
                fullName.length < 2 || propertySize.length < 2 ||
                Number.isNaN(requestedDate.getTime()) || requestedDate < tomorrow) {
                quoteForm.reportValidity();
                return;
            }

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
            try {
                sessionStorage.setItem('quoteSubmittedAt', String(Date.now()));
            } catch (error) {
                // Session storage can be unavailable in privacy-restricted browsers.
            }
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
