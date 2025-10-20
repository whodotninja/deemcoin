const parts = ['Q1J','FTU','FUS','U9O'];
const b64 = parts.join('');
const password = atob(b64);
const prefilled = 3;
const totalChars = password.length;
const messageEl = document.getElementById('message');
const linkEl = document.getElementById('link');
const inputGroup = document.getElementById('inputGroup');
for (let i = 0; i < totalChars; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = '1';
    input.dataset.index = i;
    if (i < prefilled) {
        input.value = password[i];
        input.disabled = true;
    }
    input.addEventListener('input', (e) => {
        const value = e.target.value.toUpperCase();
        e.target.value = value;
        if (value && i < totalChars - 1) {
            document.querySelector(`input[data-index="${i + 1}"]`).focus();
        }
        checkPassword();
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && i > prefilled) {
            document.querySelector(`input[data-index="${i - 1}"]`).focus();
        }
    });
    inputGroup.appendChild(input);
}
function checkPassword() {
    const inputs = document.querySelectorAll("input[type='text']");
    let currentPassword = '';
    inputs.forEach((input) => {
        currentPassword += input.value;
    });
    if (currentPassword.length === totalChars) {
        if (currentPassword === password) {
            messageEl.textContent = 'correct';
            messageEl.className = 'success';
            linkEl.classList.add('active');
        } else {
            messageEl.textContent = 'incorrect';
            messageEl.className = 'error';
            linkEl.classList.remove('active');
        }
    } else {
        messageEl.textContent = '';
        linkEl.classList.remove('active');
    }
}
document.querySelector(`input[data-index="${prefilled}"]`).focus();
