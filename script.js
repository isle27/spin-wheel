const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
let names = [];
let isSpinning = false;

function drawWheel() {
    const numSegments = names.length || 1;
    const angle = (2 * Math.PI) / numSegments;
    
    ctx.clearRect(0, 0, 300, 300);
    
    for (let i = 0; i < numSegments; i++) {
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#ff6b6b' : '#4ecdc4';
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 140, i * angle, (i + 1) * angle);
        ctx.fill();
        ctx.stroke();
        
        // Add text
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(i * angle + angle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 16px Arial";
        ctx.fillText(names[i] || "?", 110, 5);
        ctx.restore();
    }
}

function spin() {
    if (isSpinning) return;
    
    const textarea = document.getElementById('names');
    names = textarea.value.trim().split('\n').filter(n => n.trim() !== '');
    
    if (names.length < 2) {
        alert("Please enter at least 2 names!");
        return;
    }

    isSpinning = true;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = "";

    let rotation = 0;
    const spins = 8 + Math.random() * 6;
    const finalAngle = Math.random() * 360;
    const totalRotation = spins * 360 + finalAngle;

    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        rotation = totalRotation * eased;
        
        canvas.style.transform = `rotate(${rotation}deg)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Show winner
            const winnerIndex = Math.floor((360 - (finalAngle % 360)) / (360 / names.length)) % names.length;
            resultDiv.textContent = `🎉 Winner: ${names[winnerIndex]}`;
            isSpinning = false;
        }
    }
    
    animate();
}

function addExample() {
    document.getElementById('names').value = "Alice\nBob\nCharlie\nDavid\nEmma\nFrank\nGrace";
    names = ["Alice","Bob","Charlie","David","Emma","Frank","Grace"];
    drawWheel();
}

function clearNames() {
    document.getElementById('names').value = "";
    document.getElementById('result').textContent = "";
    names = [];
    drawWheel();
}

// Initial draw
drawWheel();