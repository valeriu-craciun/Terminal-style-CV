const commands = {
    help: 'Available commands:\n - help\n - about\n - education\n - experience\n - skills\n - contact\n - clear',
};

function fetchAndDisplay(command, filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(text => {
            const outputElement = document.getElementById('terminal-output');
            const commandOutput = document.createElement('div');
            commandOutput.innerHTML = `<div class="prompt-line"><span class="prompt">$></span> ${command}</div><div>${text}</div><br/>`;
            outputElement.appendChild(commandOutput);
            document.getElementById('content').scrollTop = document.getElementById('content').scrollHeight;
        })
        .catch(error => console.error('Error fetching file:', error));
}

function handleCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim();
        const outputElement = document.getElementById('terminal-output');
        const commandOutput = document.createElement('div');

        switch (input) {
            case 'clear':
                outputElement.innerHTML = '';
                break;
            case 'help':
                commandOutput.innerHTML = `<div class="prompt-line"><span class="prompt">$></span> ${input}</div><div>${commands[input]}</div><br/>`;
                outputElement.appendChild(commandOutput);
                break;
            case 'about':
                fetchAndDisplay(input, 'data/about.txt')
                    .then(() => {
                        const img = document.createElement('img');
                        img.src = 'data/me.jpg'; // Replace with the path to your image file
                        img.alt = 'Me';
                        img.style.width = '100px'; // Set the width of the image
                        img.style.height = 'auto'; // Automatically adjust the height to maintain the aspect ratio
                        outputElement.appendChild(img);
                        document.getElementById('content').scrollTop = document.getElementById('content').scrollHeight;
                    });
                break;
            case 'education':
                fetchAndDisplay(input, 'data/education.txt');
                break;
            case 'experience':
                fetchAndDisplay(input, 'data/experience.txt');
                break;
            case 'skills':
                fetchAndDisplay(input, 'data/skills.txt');
                break;
            case 'contact':
                fetchAndDisplay(input, 'data/contact.txt');
                break;
            default:
                commandOutput.innerHTML = `<div class="prompt-line"><span class="prompt">$></span> ${input}</div><div>Command not found. Type 'help' for a list of commands.</div><br/>`;
                outputElement.appendChild(commandOutput);
        }

        event.target.value = '';
        document.getElementById('content').scrollTop = document.getElementById('content').scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('terminal-output');
    outputElement.innerHTML = '<div>Welcome to my CV terminal (Valeriu Craciun). Type \'help\' for a list of commands.</div><br/>';
});
