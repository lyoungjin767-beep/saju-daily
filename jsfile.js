document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('productForm');
    const resetBtn = document.getElementById('resetBtn');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    // Theme Handling
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeUI('dark');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeUI('light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeUI('dark');
        }
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
        }
    }
    
    // Inputs
    const inputs = {
        name: document.getElementById('productName'),
        price: document.getElementById('productPrice'),
        description: document.getElementById('productDescription'),
        image: document.getElementById('productImage')
    };

    // Preview Elements
    const preview = {
        name: document.getElementById('previewName'),
        price: document.getElementById('previewPrice'),
        description: document.getElementById('previewDescription'),
        image: document.getElementById('previewImage')
    };

    const DEFAULT_IMAGE = 'https://via.placeholder.com/300x200?text=Product+Image';

    // Event Listeners for Live Preview
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', updatePreview);
    });

    // Handle Form Reset
    resetBtn.addEventListener('click', () => {
        form.reset();
        updatePreview();
    });

    // Handle Form Submit (Simulation)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const productData = {
            name: inputs.name.value,
            price: parseFloat(inputs.price.value),
            description: inputs.description.value,
            image: inputs.image.value || DEFAULT_IMAGE,
            createdAt: new Date().toISOString()
        };

        console.log('Product Created:', productData);
        alert('Product saved successfully! (Check console for data)');
    });

    // Update Logic
    function updatePreview() {
        // Name
        preview.name.textContent = inputs.name.value || 'Product Name';
        
        // Price
        const priceValue = parseFloat(inputs.price.value);
        preview.price.textContent = isNaN(priceValue) 
            ? '$0.00' 
            : `$${priceValue.toFixed(2)}`;
        
        // Description
        preview.description.textContent = inputs.description.value || 'Product description will appear here...';
        
        // Image
        if (inputs.image.value && isValidUrl(inputs.image.value)) {
            preview.image.src = inputs.image.value;
            preview.image.onerror = () => {
                preview.image.src = DEFAULT_IMAGE;
            };
        } else {
            preview.image.src = DEFAULT_IMAGE;
        }
    }

    // Helper: Simple URL validation
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
});