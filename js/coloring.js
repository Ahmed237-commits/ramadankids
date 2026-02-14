// ===================================
// COLORING PAGE JAVASCRIPT
// Canvas-based coloring functionality
// ===================================

let canvas, ctx;
let currentColor = '#FF6B6B';
let isDrawing = false;
let currentTemplate = null;

const colors = [
    '#FF6B6B', '#FFA500', '#FFD700', '#90EE90',
    '#87CEEB', '#9370DB', '#FF69B4', '#F5DEB3',
    '#8B4513', '#000000', '#FFFFFF', '#C0C0C0'
];

// Select template and initialize canvas
function selectTemplate(template) {
    currentTemplate = template;

    document.getElementById('templatesGrid').style.display = 'none';
    document.getElementById('canvasContainer').style.display = 'block';

    initializeCanvas();
    drawTemplate();
}

// Back to templates
function backToTemplates() {
    document.getElementById('templatesGrid').style.display = 'grid';
    document.getElementById('canvasContainer').style.display = 'none';
    currentTemplate = null;
}

// Initialize canvas
function initializeCanvas() {
    canvas = document.getElementById('coloringCanvas');
    ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 600;
    canvas.height = 600;

    // Create color palette
    const colorGrid = document.querySelector('.color-grid');
    colorGrid.innerHTML = colors.map(color => `
        <div class="color-option ${color === currentColor ? 'selected' : ''}" 
             style="background-color: ${color};" 
             onclick="selectColor('${color}')">
        </div>
    `).join('');

    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch support
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
}

// Draw template outline
function drawTemplate() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    if (currentTemplate === 'lantern') {
        drawLantern();
    } else if (currentTemplate === 'moon') {
        drawMoon();
    } else if (currentTemplate === 'mosque') {
        drawMosque();
    } else if (currentTemplate === 'family') {
        drawFamily();
    }
}

// Template drawings
function drawLantern() {
    ctx.beginPath();
    // Top handle
    ctx.arc(300, 100, 20, 0, Math.PI * 2);
    ctx.stroke();

    // Top cap
    ctx.beginPath();
    ctx.moveTo(250, 130);
    ctx.lineTo(350, 130);
    ctx.lineTo(340, 160);
    ctx.lineTo(260, 160);
    ctx.closePath();
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.moveTo(260, 160);
    ctx.lineTo(240, 400);
    ctx.lineTo(360, 400);
    ctx.lineTo(340, 160);
    ctx.closePath();
    ctx.stroke();

    // Decorative lines
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(240 + i * 30, 200);
        ctx.lineTo(240 + i * 30, 380);
        ctx.stroke();
    }

    // Bottom
    ctx.beginPath();
    ctx.moveTo(240, 400);
    ctx.lineTo(230, 430);
    ctx.lineTo(370, 430);
    ctx.lineTo(360, 400);
    ctx.stroke();

    // Flame
    ctx.beginPath();
    ctx.moveTo(300, 250);
    ctx.bezierCurveTo(280, 230, 280, 200, 300, 180);
    ctx.bezierCurveTo(320, 200, 320, 230, 300, 250);
    ctx.stroke();
}

function drawMoon() {
    // Draw crescent moon
    ctx.beginPath();
    ctx.arc(300, 300, 150, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(340, 280, 130, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    // Stars
    const starPositions = [
        [150, 150], [450, 180], [480, 400], [120, 450], [200, 500]
    ];

    starPositions.forEach(([x, y]) => {
        drawStar(x, y, 25, 5);
    });
}

function drawStar(cx, cy, radius, points) {
    const step = Math.PI / points;
    ctx.beginPath();
    for (let i = 0; i < 2 * points; i++) {
        const r = i % 2 === 0 ? radius : radius / 2;
        const angle = i * step - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
}

function drawMosque() {
    // Dome
    ctx.beginPath();
    ctx.arc(300, 200, 100, Math.PI, 0);
    ctx.stroke();

    // Crescent on top
    ctx.beginPath();
    ctx.arc(300, 100, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(310, 95, 17, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    // Main building
    ctx.strokeRect(220, 200, 160, 250);

    // Door
    ctx.beginPath();
    ctx.arc(300, 450, 30, Math.PI, 0);
    ctx.lineTo(330, 450);
    ctx.lineTo(330, 420);
    ctx.lineTo(270, 420);
    ctx.lineTo(270, 450);
    ctx.stroke();

    // Windows
    ctx.strokeRect(240, 250, 40, 60);
    ctx.strokeRect(320, 250, 40, 60);
}

function drawFamily() {
    // Table
    ctx.strokeRect(150, 350, 300, 20);
    ctx.strokeRect(140, 370, 20, 80);
    ctx.strokeRect(440, 370, 20, 80);

    // Simplified family figures
    // Dad
    ctx.beginPath();
    ctx.arc(220, 280, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeRect(200, 310, 40, 60);

    // Mom
    ctx.beginPath();
    ctx.arc(300, 280, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeRect(280, 310, 40, 60);

    // Child
    ctx.beginPath();
    ctx.arc(380, 290, 25, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeRect(365, 315, 30, 55);

    // Food items on table
    ctx.beginPath();
    ctx.arc(200, 360, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(250, 360, 10, 0, Math.PI * 2);
    ctx.stroke();
}

// Select color
function selectColor(color) {
    currentColor = color;
    document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Drawing functions
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

// Clear canvas
function clearCanvas() {
    if (confirm('Clear your drawing and start over?')) {
        drawTemplate();
    }
}

// Download image
function downloadImage() {
    const link = document.createElement('a');
    link.download = `ramadan-${currentTemplate}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    playSound('success');
}

// Finish coloring
function finishColoring() {
    const alreadyColored = localStorage.getItem(`coloring_${currentTemplate}`);

    if (!alreadyColored) {
        localStorage.setItem(`coloring_${currentTemplate}`, 'true');
        addStars(1);
    } else {
        alert('✅ You already earned a star for this coloring page!\n\nBut you can color it again for fun! 🎨');
    }
}
