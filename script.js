document.getElementById('tacticForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamName = document.getElementById('teamName').value.trim();
    const year = document.getElementById('year').value;
    
    if (!teamName || !year) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch('/api/generate-tactic', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({teamName, year: parseInt(year)})
        });
        
        if (!response.ok) throw new Error('Erro ao gerar tática');
        const tactic = await response.json();
        displayTactic(tactic);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao gerar tática. Tente novamente.');
        showLoading(false);
    }
});

function displayTactic(tactic) {
    const tacticResult = document.getElementById('tacticResult');
    const html = `
        <h3>${tactic.teamName} (${tactic.year})</h3>
        <div class="tactic-section"><strong>📐 Formação:</strong>${tactic.formation}</div>
        <div class="tactic-section"><strong>⚔️ Estilo:</strong>${tactic.style}</div>
        <div class="tactic-section"><strong>🎯 Ataque:</strong>${tactic.attack}</div>
        <div class="tactic-section"><strong>🛡️ Defesa:</strong>${tactic.defense}</div>
        <div class="tactic-section"><strong>⚡ Especiais:</strong>${tactic.special}</div>
        <div class="tactic-section"><strong>💡 Dica:</strong>${tactic.tip}</div>
    `;
    tacticResult.innerHTML = html;
    document.querySelector('.form-section').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    showLoading(false);
}

function resetForm() {
    document.getElementById('tacticForm').reset();
    document.querySelector('.form-section').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
}

function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'block' : 'none';
    if (show) document.querySelector('.form-section').style.display = 'none';
}