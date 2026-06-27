

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // FEATURE 1: PORTFOLIO FILTER
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button styles
                filterBtns.forEach(b => {
                    b.classList.remove('btn-primary', 'text-white');
                    b.classList.add('btn-outline-primary');
                });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary', 'text-white');
                
                // Filter items
                const filter = this.dataset.filter;
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        // Add a small animation
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========================================
    // FEATURE 2: CONTACT FORM VALIDATION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const formMessage = document.getElementById('formMessage');
        
        // Real-time validation on input
        const inputs = [nameInput, emailInput, subjectInput, messageInput];
        inputs.forEach(input => {
            if (input) {
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.remove('is-invalid');
                    }
                });
                
                input.addEventListener('blur', function() {
                    if (this.hasAttribute('required') && !this.value.trim()) {
                        this.classList.add('is-invalid');
                    }
                });
            }
        });
        
        // Email validation helper
        function isValidEmail(email) {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(email.trim());
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
            }
            
            // Validate email
            if (!isValidEmail(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            // Validate subject
            if (!subjectInput.value.trim()) {
                subjectInput.classList.add('is-invalid');
                isValid = false;
            } else {
                subjectInput.classList.remove('is-invalid');
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
            }
            
            // Show result
            if (isValid) {
                // Success message
                formMessage.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="bi bi-check-circle-fill"></i> 
                        <strong>Thank you, ${nameInput.value.trim()}!</strong> 
                        Your message has been sent successfully. I'll get back to you soon!
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                
                // Reset form
                contactForm.reset();
                
                // Clear any invalid states
                inputs.forEach(input => {
                    if (input) input.classList.remove('is-invalid');
                });
                
                // Auto-dismiss after 5 seconds
                setTimeout(() => {
                    const alert = formMessage.querySelector('.alert');
                    if (alert) {
                        alert.classList.remove('show');
                        setTimeout(() => {
                            formMessage.innerHTML = '';
                        }, 300);
                    }
                }, 5000);
                
            } else {
                // Error message
                formMessage.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <i class="bi bi-exclamation-circle-fill"></i>
                        <strong>Oops!</strong> Please fill in all fields correctly before submitting.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                
                // Scroll to first error
                const firstInvalid = contactForm.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
    }

    // ========================================
    // FEATURE 3: SMOOTH SCROLLING (Bonus)
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // FEATURE 4: YEAR IN FOOTER (Auto-update)
    // ========================================
    const yearElements = document.querySelectorAll('.footer-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    console.log('✅ Luxon Osoro Portfolio loaded successfully!');
    console.log('📧 Contact: luxonosoro01@gmail.com');
});