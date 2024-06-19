const commands = {
    help: 'Available commands:\n - help\n - whoami\n - education\n - experience\n - skills\n - contact\n - clear',
};

const terminalPrompt = `${window.location.hostname}:$> `;

function fetchAndDisplay(command, filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(text => {
            const outputElement = document.getElementById('terminal-output');
            const commandOutput = document.createElement('div');
            commandOutput.innerHTML = `<div class="prompt-line"><span class="prompt">${terminalPrompt}</span>${command}</div><div>${text}</div><br/>`;
            outputElement.appendChild(commandOutput);
            document.getElementById('content').scrollTop = document.getElementById('content').scrollHeight;
        })
        .catch(error => console.error('Error fetching file:', error));
}

const asciiArtTrain = `
          =====       _________                ___________ 
      _D _|  |_______/        \\\\__I_I_____===__|_________| 
     |(_)---  |   H\\\\________/ |   |        =|_____/     |
     /     |  |   H  |  |     |   |         | | |    ___ |
    |      |  |   H  |__--------------------| | |____/   |
    | ________|___H__/__|_____/[][]~\\\\______| | |        |
    |/ |   |-----------I_____I [][] []  D   |_____/|  |  |
    / =| o |=-~~\\\\  /~~\\\\  /~~\\\\  /~~\\\\ ____Y____________|
    |___/        \\\\_/   \\\\_/   \\\\_/   \\\\_/         \\\\_/    
`;

function displayAsciiArtTrain() {
    const outputElement = document.getElementById('terminal-output');
    const trainElement = document.createElement('div');
    trainElement.className = 'train';
    trainElement.style.whiteSpace = 'pre';
    trainElement.style.position = 'absolute';
    trainElement.style.left = '100%';
    trainElement.style.top = '50%';
    trainElement.style.transform = 'translateY(-50%)';
    trainElement.innerHTML = `<pre>${asciiArtTrain}</pre>`;
    outputElement.appendChild(trainElement);

    let position = 100; // Start from the right edge
    const intervalTime = 75; // Adjust this value to change the speed of the train
    const interval = setInterval(() => {
        position -= 2; // Move left
        trainElement.style.left = `${position}%`;

        // Remove the train after it goes off screen
        if (position < -100) {
            clearInterval(interval);
            trainElement.remove();
        }
    }, intervalTime); // Interval time in milliseconds
}

function showHiddenCommandMessage() {
    const outputElement = document.getElementById('terminal-output');
    const messageElement = document.createElement('div');
    messageElement.className = 'hidden-command-message';
    messageElement.innerHTML = `<div style="display: flex; align-items: center;">
                                    <svg width="24" height="24"><use href="#cup-icon"></use></svg>
                                    <span style="margin-left: 10px;">!!! 🏆 Just discovered a hidden command 🏆 !!!</span>
                                </div>`;
    outputElement.appendChild(messageElement);

    // Fade out the message after 3 seconds
    setTimeout(() => {
        messageElement.style.transition = 'opacity 1s';
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.remove();
            displayAsciiArtTrain(); // Display the train after the message fades out
        }, 1000);
    }, 2000);
}

function handleCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim().substr(terminalPrompt.length);
        const outputElement = document.getElementById('terminal-output');
        const commandOutput = document.createElement('div');

        switch (input) {
            case 'clear':
                outputElement.innerHTML = '<div>Welcome to my resume (Valeriu Craciun). Type \'help\' for a list of commands.</div><br/>';
                break;
            case 'help':
                commandOutput.innerHTML = `<div class="prompt-line"><span class="prompt">${terminalPrompt}</span>${input}</div><div>${commands[input]}</div><br/>`;
                outputElement.appendChild(commandOutput);
                break;
            case 'whoami':
                fetchAndDisplay(input, `data/${input}.txt`)
                    .then(() => {
                        const img = document.createElement('img');
                        img.src = 'data/me.jpg';
                        img.alt = 'Me';
                        img.style.width = '100px';
                        img.style.height = 'auto';
                        outputElement.appendChild(img);
                    });
                break;
            case 'education':
            case 'experience':
            case 'skills':
            case 'contact':
                fetchAndDisplay(input, `data/${input}.txt`);
                break;
            case 'sl':
                showHiddenCommandMessage();
                break;
            default:
                commandOutput.innerHTML = `<div class="prompt-line"><span class="prompt">${terminalPrompt}</span> ${input}</div><div>Command not found. Type 'help' for a list of commands.</div><br/>`;
                outputElement.appendChild(commandOutput);
        }

        event.target.value = '';
        document.getElementById('content').scrollTo({ top: document.getElementById('content').scrollHeight, behavior: 'smooth' });
        document.getElementById("terminal-input").value = `${terminalPrompt}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('terminal-output');
    document.getElementById("terminal-input").value = `${terminalPrompt}`;
    outputElement.innerHTML = '<div>Welcome to my resume (Valeriu Craciun). Type \'help\' for a list of commands.</div><br/>';
});
