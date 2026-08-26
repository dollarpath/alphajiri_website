const posts = {
    'moving-mistakes': {
        title: '5 Costly Mistakes Kenyans Make When Moving House',
        category: 'Moving',
        meta: 'July 15, 2026 · 5 min read',
        content: '<p>Moving house can be exciting, but it is also one of the easiest places to overspend or lose valuable time. Many families rush into the process without planning for transport, packing materials, or access restrictions.</p><p>Some of the biggest mistakes include delaying the booking, underestimating the number of boxes, and using poor-quality packing materials for fragile items. Another common issue is forgetting to protect delicate electronics, glassware, and documents.</p><p>At Alphajiri, we help clients avoid these problems by planning the move from start to finish, packing properly, and giving clear timelines so your relocation stays calm and organized.</p>'
    },
    'packing-checklist': {
        title: 'The Ultimate Packing Checklist for a Nairobi Apartment',
        category: 'How-To',
        meta: 'July 8, 2026 · 8 min read',
        content: '<p>A successful apartment move starts with an organized packing plan. The best approach is to sort your belongings room by room and label every box clearly.</p><p>Keep essential items such as chargers, toiletries, documents, and a change of clothes in a clearly marked overnight bag. Use strong boxes for books and kitchen items, and wrap fragile pieces with multiple layers of protection.</p><p>Our team recommends a simple checklist that covers utilities, cleaning supplies, keys, and transport arrangements well before moving day.</p>'
    },
    'airbnb-cleaning': {
        title: 'Deep Cleaning Your Airbnb: What Guests Actually Notice',
        category: 'Cleaning',
        meta: 'July 1, 2026 · 6 min read',
        content: '<p>Airbnb guests notice the small details quickly. A spotless bathroom, fresh linen, and a clear kitchen can make the difference between a 4-star review and a 5-star one.</p><p>Professional cleaning should go beyond visible dust. That means tackling baseboards, sinks, cabinet doors, mirrors, and high-touch surfaces that are often missed during routine cleaning.</p><p>At Alphajiri, our deep cleaning services are designed to leave every property guest-ready and welcoming.</p>'
    },
    'office-relocation': {
        title: 'Office Relocation Guide: Zero Downtime, Zero Stress',
        category: 'Office',
        meta: 'June 24, 2026 · 10 min read',
        content: '<p>Office moves are much easier when they are planned in phases. The best strategy is to separate equipment, documents, and furniture into clear categories before the move begins.</p><p>Make sure your IT team is involved early, especially for cables, desktops, printers, and sensitive files. Labeling every item and assigning a point person helps reduce confusion.</p><p>With careful planning and a reliable moving team, an office relocation can be completed with minimal disruption to daily operations.</p>'
    }
};

const params = new URLSearchParams(window.location.search);
const post = posts[params.get('slug')] || posts['moving-mistakes'];

document.title = `${post.title} — Alphajiri Movers & Cleaners`;
document.getElementById('pageTitle').textContent = post.title;
document.getElementById('pageSubtitle').textContent = post.category;
document.getElementById('postCategory').textContent = post.category;
document.getElementById('postHeading').textContent = post.title;
document.getElementById('postMeta').textContent = post.meta;
document.getElementById('postContent').innerHTML = post.content;
