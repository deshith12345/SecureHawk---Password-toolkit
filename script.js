// Password Strength Checker
const passwordCheckInput = document.getElementById('password-check');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const analysisResults = document.getElementById('analysis-results');
const analysisList = document.getElementById('analysis-list');

// Common weak password patterns
const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567',
    'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine',
    'ashley', 'bailey', 'passw0rd', 'shadow', '123123', '654321', 'superman',
    'qazwsx', 'michael', 'football'
];

const keyboardPatterns = [
    'qwerty', 'asdfgh', 'zxcvbn', '1qaz2wsx', 'qwertyuiop', 'asdfghjkl'
];

// Event listener for password strength checking
if (passwordCheckInput) {
    passwordCheckInput.addEventListener('input', function() {
        const password = this.value;
        if (password.length === 0) {
            resetStrengthChecker();
            return;
        }
        analyzePassword(password);
    });
}

function analyzePassword(password) {
    const analysis = {
        length: password.length,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSymbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        hasSequential: hasSequentialChars(password),
        hasKeyboardPattern: hasKeyboardPattern(password),
        isCommon: isCommonPassword(password),
        hasRepeatingChars: hasRepeatingChars(password)
    };

    const strength = calculateStrength(password, analysis);
    const entropy = calculateEntropy(password);
    const crackTime = estimateCrackTime(entropy);

    updateStrengthMeter(strength);
    displayAnalysis(password, analysis, entropy, crackTime);
}

function calculateStrength(password, analysis) {
    let score = 0;
    
    // Length scoring
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (password.length >= 20) score += 1;

    // Character variety
    if (analysis.hasUppercase) score += 1;
    if (analysis.hasLowercase) score += 1;
    if (analysis.hasNumbers) score += 1;
    if (analysis.hasSymbols) score += 1;

    // Penalties
    if (analysis.isCommon) score -= 3;
    if (analysis.hasSequential) score -= 1;
    if (analysis.hasKeyboardPattern) score -= 1;
    if (analysis.hasRepeatingChars) score -= 1;

    // Determine strength level
    if (score <= 2) return 'very-weak';
    if (score <= 4) return 'weak';
    if (score <= 6) return 'fair';
    if (score <= 8) return 'good';
    return 'strong';
}

function calculateEntropy(password) {
    let poolSize = 0;
    
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

    return Math.log2(Math.pow(poolSize, password.length));
}

function estimateCrackTime(entropy) {
    const guessesPerSecond = 1e9; // 1 billion guesses per second
    const totalGuesses = Math.pow(2, entropy);
    const seconds = totalGuesses / guessesPerSecond / 2; // Divide by 2 for average

    if (seconds < 1) return 'Instant';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    return 'Centuries';
}

function hasSequentialChars(password) {
    const sequential = ['0123456789', 'abcdefghijklmnopqrstuvwxyz'];
    const lowerPass = password.toLowerCase();
    
    for (let seq of sequential) {
        for (let i = 0; i < seq.length - 2; i++) {
            if (lowerPass.includes(seq.substring(i, i + 3))) {
                return true;
            }
        }
    }
    return false;
}

function hasKeyboardPattern(password) {
    const lowerPass = password.toLowerCase();
    return keyboardPatterns.some(pattern => lowerPass.includes(pattern));
}

function isCommonPassword(password) {
    return commonPasswords.includes(password.toLowerCase());
}

function hasRepeatingChars(password) {
    return /(.)\1{2,}/.test(password);
}

function updateStrengthMeter(strength) {
    strengthBar.className = 'strength-bar ' + strength;
    
    const strengthLabels = {
        'very-weak': 'Very Weak - Easily cracked',
        'weak': 'Weak - Not recommended',
        'fair': 'Fair - Could be better',
        'good': 'Good - Decent security',
        'strong': 'Strong - Excellent security'
    };
    
    strengthText.textContent = strengthLabels[strength];
    strengthText.className = 'strength-text ' + strength;
}

function displayAnalysis(password, analysis, entropy, crackTime) {
    analysisResults.style.display = 'block';
    analysisList.innerHTML = '';

    const feedback = [];

    // Positive feedback
    if (analysis.length >= 12) {
        feedback.push({ type: 'positive', text: `Good length (${analysis.length} characters)` });
    } else {
        feedback.push({ type: 'negative', text: `Too short - use at least 12 characters (currently ${analysis.length})` });
    }

    if (analysis.hasUppercase) {
        feedback.push({ type: 'positive', text: 'Contains uppercase letters' });
    } else {
        feedback.push({ type: 'negative', text: 'Add uppercase letters (A-Z)' });
    }

    if (analysis.hasLowercase) {
        feedback.push({ type: 'positive', text: 'Contains lowercase letters' });
    } else {
        feedback.push({ type: 'negative', text: 'Add lowercase letters (a-z)' });
    }

    if (analysis.hasNumbers) {
        feedback.push({ type: 'positive', text: 'Contains numbers' });
    } else {
        feedback.push({ type: 'negative', text: 'Add numbers (0-9)' });
    }

    if (analysis.hasSymbols) {
        feedback.push({ type: 'positive', text: 'Contains special symbols' });
    } else {
        feedback.push({ type: 'negative', text: 'Add special symbols (!@#$%^&*)' });
    }

    // Negative patterns
    if (analysis.isCommon) {
        feedback.push({ type: 'negative', text: 'This is a common password - avoid it!' });
    }

    if (analysis.hasSequential) {
        feedback.push({ type: 'negative', text: 'Contains sequential characters (123, abc)' });
    }

    if (analysis.hasKeyboardPattern) {
        feedback.push({ type: 'negative', text: 'Contains keyboard patterns (qwerty, asdf)' });
    }

    if (analysis.hasRepeatingChars) {
        feedback.push({ type: 'negative', text: 'Contains repeating characters (aaa, 111)' });
    }

    feedback.forEach(item => {
        const li = document.createElement('li');
        li.className = item.type;
        li.innerHTML = item.type === 'positive' 
            ? `<i class="fas fa-check-circle"></i> ${item.text}`
            : `<i class="fas fa-times-circle"></i> ${item.text}`;
        analysisList.appendChild(li);
    });

    // Update stats
    document.getElementById('stat-length').textContent = analysis.length;
    document.getElementById('stat-entropy').textContent = entropy.toFixed(1) + ' bits';
    document.getElementById('stat-crack').textContent = crackTime;
}

function resetStrengthChecker() {
    strengthBar.className = 'strength-bar';
    strengthText.textContent = 'Enter a password to check its strength';
    strengthText.className = 'strength-text';
    analysisResults.style.display = 'none';
}

// Password Breach Checker
async function checkBreach() {
    const passwordInput = document.getElementById('password-breach');
    const resultsDiv = document.getElementById('breach-results');
    const password = passwordInput.value;

    if (!password) {
        resultsDiv.style.display = 'block';
        resultsDiv.className = 'breach-results error';
        resultsDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter a password to check.';
        return;
    }

    resultsDiv.style.display = 'block';
    resultsDiv.className = 'breach-results';
    resultsDiv.innerHTML = '<i class="fas fa-spinner loading"></i> Checking password against breach database...';

    try {
        // Hash the password using SHA-1
        const hash = await sha1(password);
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);

        // Query HIBP API with k-Anonymity
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();

        // Parse the response
        const hashes = data.split('\n');
        let found = false;
        let count = 0;

        for (let line of hashes) {
            const [hashSuffix, frequency] = line.split(':');
            if (hashSuffix.toLowerCase() === suffix.toLowerCase()) {
                found = true;
                count = parseInt(frequency);
                break;
            }
        }

        if (found) {
            resultsDiv.className = 'breach-results compromised';
            resultsDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <strong>WARNING: This password has been compromised!</strong><br>
                This password has appeared <strong>${count.toLocaleString()}</strong> times in data breaches.<br>
                <strong>You should NOT use this password!</strong>
                <div class="info-box" style="margin-top: 1rem;">
                    <h4><i class="fas fa-shield-alt"></i> Recommended Actions:</h4>
                    <ul>
                        <li>Change this password immediately if you're using it</li>
                        <li>Use the Password Generator to create a strong, unique password</li>
                        <li>Enable two-factor authentication on all accounts</li>
                        <li>Never reuse passwords across different websites</li>
                    </ul>
                </div>
            `;
        } else {
            resultsDiv.className = 'breach-results safe';
            resultsDiv.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <strong>Good news!</strong> This password has not been found in any known data breaches.<br>
                However, ensure it's strong and unique for each account.
            `;
        }
    } catch (error) {
        resultsDiv.className = 'breach-results error';
        resultsDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            Unable to check password at this time. Please try again later.<br>
            <small>Error: ${error.message}</small>
        `;
        console.error('Breach check error:', error);
    }
}

// SHA-1 hashing function
async function sha1(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// Password Generator
function updateLengthValue(value) {
    document.getElementById('length-value').textContent = value;
}

function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    const excludeAmbiguous = document.getElementById('exclude-ambiguous').checked;

    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('Please select at least one character type!');
        return;
    }

    const options = {
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        excludeAmbiguous
    };

    const password = createPassword(options);
    displayGeneratedPassword(password);
}

function createPassword(options) {
    let charset = '';
    
    if (options.includeUppercase) {
        charset += options.excludeAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    if (options.includeLowercase) {
        charset += options.excludeAmbiguous ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    }
    
    if (options.includeNumbers) {
        charset += options.excludeAmbiguous ? '23456789' : '0123456789';
    }
    
    if (options.includeSymbols) {
        charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }
    
    let password = '';
    const chars = new Array(options.length);
    
    // Use crypto for secure randomness
    const getRandomIndex = (max) => {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0] % max;
    };
    
    for (let i = 0; i < options.length; i++) {
        chars[i] = charset[getRandomIndex(charset.length)];
    }
    
    password = chars.join('');
    
    // Ensure at least one character from each selected type
    if (options.includeUppercase && !/[A-Z]/.test(password)) {
        const upperChars = options.excludeAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        chars[0] = upperChars[getRandomIndex(upperChars.length)];
    }
    
    if (options.includeLowercase && !/[a-z]/.test(password)) {
        const lowerChars = options.excludeAmbiguous ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
        chars[1] = lowerChars[getRandomIndex(lowerChars.length)];
    }
    
    if (options.includeNumbers && !/[0-9]/.test(password)) {
        const numChars = options.excludeAmbiguous ? '23456789' : '0123456789';
        chars[2] = numChars[getRandomIndex(numChars.length)];
    }
    
    if (options.includeSymbols && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        chars[3] = symbolChars[getRandomIndex(symbolChars.length)];
    }
    
    // Shuffle using Fisher-Yates with crypto randomness
    for (let i = chars.length - 1; i > 0; i--) {
        const j = getRandomIndex(i + 1);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    return chars.join('');
}

function displayGeneratedPassword(password) {
    const container = document.getElementById('generated-password-container');
    const display = document.getElementById('generated-password');
    
    display.textContent = password;
    container.style.display = 'block';
    
    // Store password for copying
    container.dataset.password = password;
}

function copyPassword() {
    const container = document.getElementById('generated-password-container');
    const password = container.dataset.password;
    const feedback = document.getElementById('copy-feedback');
    
    navigator.clipboard.writeText(password).then(() => {
        feedback.classList.add('show');
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 2000);
    }).catch(err => {
        alert('Failed to copy password');
        console.error('Copy error:', err);
    });
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Tab Navigation System
document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});