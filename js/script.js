const commands = {
    help: 'Available commands:\n - help\n - whoami\n - education\n - experience\n - skills\n - contact\n - clear\n - sl',
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
      _D _|  |_______/        \\__I_I_____===__|_________| 
     |(_)---  |   H\\________/ |   |        =|_____/     |
     /     |  |   H  |  |     |   |         | | |    ___ |
    |      |  |   H  |__--------------------| | |____/   |
    | ________|___H__/__|_____/[][]~\\______| | |        |
    |/ |   |-----------I_____I [][] []  D   |_____/|  |  |
    / =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y____________|
    |___/        \\_/   \\_/   \\_/   \\_/         \\_/    
`;

function displayAsciiArtTrain() {
    const outputElement = document.getElementById('terminal-output');
    const trainElement = document.createElement('div');
    trainElement.className = 'train';
    trainElement.style.whiteSpace = 'pre';
    trainElement.style.left = '100%';
    trainElement.innerHTML = `<pre>${asciiArtTrain}</pre>`;
    outputElement.appendChild(trainElement);

    let position = outputElement.clientWidth; // Start from the right edge
    const intervalTime = 20; // Adjust this value to change the speed
    const interval = setInterval(() => {
        position -= 2; // Move left
        trainElement.style.left = `${position}px`;

        // Remove the train after it goes off screen
        if (position < -trainElement.clientWidth) {
            clearInterval(interval);
            trainElement.remove();
        }
    }, 50); // Adjust the speed by changing the interval time
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
                displayAsciiArtTrain();
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
