let isSpinning = false;

function spinWheel() {
    if (isSpinning) return;
    
    const textarea = document.getElementById('names');
    let names = textarea.value.trim().split('\n').filter(name => name.trim() !== '');
    
    if (names.length < 2) {
        alert("Please add at least 2 names!");
        return;
    }

    isSpinning = true;
    const wheel = document.getElementById('wheel');
    const resultDiv = document.getElementById('result');
    
    // Random spins
    const spins = 5 + Math.floor(Math.random() * 5);
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = spins * 360 + extraDegrees;
    
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    
    // Trigger reflow
    void wheel.offsetWidth;
    
    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${totalRotation}deg)`;
    
    // Show result after spinning
    setTimeout(() => {
        const winnerIndex = Math.floor(Math.random() * names.length);
        const winner = names[winnerIndex];
        resultDiv.textContent = `Winner: ${winner}`;
        isSpinning = false;
    }, 4200);
}

function addExample() {
    document.getElementById('names').value = "Alice\nBob\nCharlie\nDavid\nEmma\nFrank";
}

function clearAll() {
    document.getElementById('names').value = "";
    document.getElementById('result').textContent = "";
}