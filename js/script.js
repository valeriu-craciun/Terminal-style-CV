const commands = {
    help: 'Available commands:\n - help\n - whoami\n - education\n - experience\n - skills\n - contact\n - clear',
};

function fetchAndDisplay(command, filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(text => {
            const outputElement = document.getElementById('terminal-output');
            const commandOutput = document.createElement('div');
            commandOutput.innerHTML = `<div class="prompt-line"><span class="prompt">cognitive.ro:$></span> ${command}</div><div>${text}</div><br/>`;
            outputElement.appendChild(commandOutput);
            document.getElementById('content').scrollTop = document.getElementById('content').scrollHeight;
        })
        .catch(error => console.error('Error fetching file:', error));
}

function handleCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim().substr(16); // Remove the "cognitive.ro:$> "
        const outputElement = document.getElementById('terminal-output');
        const commandOutput = document.createElement('div');

        switch (input) {
            case 'clear':
                //outputElement.innerHTML = '';
                outputElement.innerHTML = '<div>Welcome to my CV (Valeriu Craciun). Type \'help\' for a list of commands.</div><br/>';
                break;
            case 'help':
                commandOutput.innerHTML = `<div class="prompt-line"><span class="prompt">cognitive.ro:$></span> ${input}</div><div>${commands[input]}</div><br/>`;
                outputElement.appendChild(commandOutput);
                break;
            case 'whoami':
                fetchAndDisplay(input, 'data/whoami.txt')
                    .then(() => {
                        const img = document.createElement('img');
                        img.src = 'data/me.jpg'; // Replace with the path to your image file
                        img.alt = 'Me';
                        img.style.width = '100px'; // Set the width of the image
                        img.style.height = 'auto'; // Automatically adjust the height to maintain the aspect ratio
                        outputElement.appendChild(img);
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
        document.getElementById('content').scrollTo({ bottom: document.getElementById('content').scrollHeight, behavior: 'smooth' });
        document.getElementById("terminal-input").value = "cognitive.ro:$> ";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('terminal-output');
    document.getElementById("terminal-input").value = "cognitive.ro:$> ";
    outputElement.innerHTML = '<div>Welcome to my CV (Valeriu Craciun). Type \'help\' for a list of commands.</div><br/>';
});
