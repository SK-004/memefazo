document.addEventListener('DOMContentLoaded', () => {
    const logoImg = document.querySelector('.logo-img');
    logoImg.src = config.logo.path;
    logoImg.alt = config.logo.altText;
    
    const uploadBtn = document.getElementById('uploadBtn');
    const imageInput = document.getElementById('imageInput');
    const editorSection = document.getElementById('editorSection');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('textInput');
    const colorPicker = document.getElementById('colorPicker');
    const processBtn = document.getElementById('processBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const mottoElement = document.querySelector('.header-main p');

    let originalImage = null;

    uploadBtn.addEventListener('click', () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                originalImage = new Image();
                originalImage.onload = () => {
                    editorSection.style.display = 'block';
                    canvas.width = originalImage.width;
                    canvas.height = originalImage.height;
                    ctx.drawImage(originalImage, 0, 0);
                };
                originalImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    processBtn.addEventListener('click', async () => {
        if (!originalImage) return;

        const text = textInput.value;
        if (!text) {
            alert('Please enter some text');
            return;
        }

        // Reset canvas with original image
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;

        // Initial text properties
        ctx.fillStyle = colorPicker.value;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        
        // Calculate initial font size based on image dimensions
        const verticalSize = canvas.height / 3;
        const horizontalSize = (canvas.width * 2) / 3;
        let fontSize = Math.min(verticalSize, horizontalSize);

        // Function to measure and adjust text size
        const fitTextToWidth = (text, maxWidth) => {
            let currentFontSize = fontSize;
            ctx.font = `${currentFontSize}px Bungee`;
            let metrics = ctx.measureText(text);
            
            // Adjust font size until text fits
            while (metrics.width > maxWidth && currentFontSize > 1) {
                currentFontSize *= 0.9;  // Reduce by 10% each iteration
                ctx.font = `${currentFontSize}px Bungee`;
                metrics = ctx.measureText(text);
            }
            return currentFontSize;
        };

        // Split text into words and create lines of max 3 words
        const words = text.split(' ');
        const lines = [];
        
        for (let i = 0; i < words.length; i += 3) {
            const lineWords = words.slice(i, i + 3);
            lines.push(lineWords.join(' '));
        }

        // Find the longest line and adjust fontSize
        let longestLine = '';
        lines.forEach(line => {
            if (ctx.measureText(line).width > ctx.measureText(longestLine).width) {
                longestLine = line;
            }
        });
        
        // Adjust fontSize based on the longest line
        fontSize = fitTextToWidth(longestLine, canvas.width * 0.9);
        ctx.font = `${fontSize}px Bungee`;

        // Add shadow properties
        ctx.shadowColor = 'black';
        ctx.shadowBlur = fontSize / 15;
        ctx.shadowOffsetX = fontSize / 30;
        ctx.shadowOffsetY = fontSize / 30;

        // Draw the lines with borders
        const lineHeight = fontSize * 1.2;  // Add some spacing between lines
        const startY = canvas.height - (canvas.height * 0.05);

        // Function to draw text with border and shadow
        const drawTextWithBorderAndShadow = (text, x, y, borderColor) => {
            const borderWidth = fontSize / 15;  // Proportional border width
            
            // Set shadow for both border and fill
            ctx.shadowColor = 'black';
            ctx.shadowBlur = fontSize / 15;
            ctx.shadowOffsetX = fontSize / 30;
            ctx.shadowOffsetY = fontSize / 30;
            
            // Draw border
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = borderColor;
            ctx.lineJoin = 'round';
            ctx.miterLimit = 2;
            ctx.strokeText(text, x, y);
            
            // Keep shadow for main text
            ctx.fillText(text, x, y);
        };

        lines.forEach((line, index) => {
            const y = startY - (lines.length - 1 - index) * lineHeight;
            
            // Determine border color based on text color
            const textColor = colorPicker.value.toLowerCase();
            const borderColor = textColor === '#000000' ? '#ffffff' : '#000000';

            // Draw text with border and shadow
            drawTextWithBorderAndShadow(line, canvas.width / 2, y, borderColor);
        });

        // Reset shadow and composite operation for image drawing
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw the original image on top
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(originalImage, 0, 0);

        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'memefazo-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Function to get random motto
    const getRandomMotto = () => {
        const randomIndex = Math.floor(Math.random() * config.mottos.length);
        return config.mottos[randomIndex];
    };
    
    // Function to update motto with animation
    const updateMotto = () => {
        mottoElement.style.opacity = '0';
        mottoElement.style.transform = 'rotate(-4deg) translateY(-10px)';
        
        setTimeout(() => {
            mottoElement.textContent = getRandomMotto();
            mottoElement.style.opacity = '1';
            mottoElement.style.transform = 'rotate(-4deg) translateY(0)';
        }, 300);
    };
    
    // Update motto every 5 seconds
    setInterval(updateMotto, 5000);
    
    // Initial random motto
    mottoElement.textContent = getRandomMotto();

    const dropZone = document.getElementById('dropZone');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropZone.classList.add('drag-over');
    }

    function unhighlight(e) {
        dropZone.classList.remove('drag-over');
    }

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0 && files[0].type.startsWith('image/')) {
            imageInput.files = files;
            const event = new Event('change');
            imageInput.dispatchEvent(event);
        }
    }

    // Add touch event handling
    function initTouchEvents() {
        const uploadSection = document.querySelector('.upload-section');
        
        uploadSection.addEventListener('touchstart', (e) => {
            e.preventDefault();
            // Handle touch start
        }, { passive: false });
        
        uploadSection.addEventListener('touchmove', (e) => {
            e.preventDefault();
            // Handle touch move
        }, { passive: false });
        
        // Make buttons more responsive on touch devices
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', () => {
                button.style.transform = '';
            });
        });
    }

    // Add resize handling for canvas
    function handleResize() {
        const canvas = document.getElementById('canvas');
        const container = canvas.parentElement;
        
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                const height = entry.contentRect.height;
                
                // Maintain aspect ratio and update canvas size
                canvas.width = width * window.devicePixelRatio;
                canvas.height = height * window.devicePixelRatio;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                
                // Redraw canvas content
                redrawCanvas();
            }
        });
        
        resizeObserver.observe(container);
    }

    // Initialize dynamic features
    document.addEventListener('DOMContentLoaded', () => {
        initTouchEvents();
        handleResize();
    });
});

// Add your ad integration code here
function initAds() {
    // Example: Google AdSense code would go here
    // Replace with your actual ad integration code
} 