// Registration form handler
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const login = document.getElementById('login').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, nickname })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Display seed phrases
            displaySeedPhrases(data.seed_phrases);
        } else {
            alert(data.error || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
});

function displaySeedPhrases(seedPhrases) {
    const seedContainer = document.getElementById('seedPhraseContainer');
    const seedPhrasesDiv = document.getElementById('seedPhrases');
    const form = document.getElementById('registerForm');
    
    // Format seed phrases with numbers
    const seeds = seedPhrases.split(' ');
    let formattedSeeds = '';
    seeds.forEach((seed, index) => {
        formattedSeeds += `${index + 1}. ${seed}\n`;
    });
    
    seedPhrasesDiv.textContent = formattedSeeds;
    seedContainer.style.display = 'block';
    form.style.display = 'none';
}

function copySeedPhrases() {
    const seedText = document.getElementById('seedPhrases').textContent;
    navigator.clipboard.writeText(seedText).then(() => {
        alert('Seed phrases copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

function proceedToLogin() {
    window.location.href = '/login';
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const login = document.getElementById('login').value.trim();
    const seedPhrases = document.getElementById('seedPhrases').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, seed_phrases: seedPhrases })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            window.location.href = '/messenger';
        } else {
            errorDiv.textContent = data.error || 'Login failed';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = 'An error occurred during login';
        errorDiv.style.display = 'block';
    }
});

async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('seedPhrases').value = text.trim();
    } catch (err) {
        console.error('Failed to paste:', err);
        alert('Failed to paste from clipboard. Please paste manually.');
    }
}
