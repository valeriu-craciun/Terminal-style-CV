body {
    background-color: #1e1e1e;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.terminal {
    border: 2px solid #00ff00;
    width: 80%;
    height: 80%;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
}

#content {
    white-space: pre-wrap;
    height: 100%;
    display: flex;
    flex-direction: column;
}

#terminal-output {
    flex: 1;
}

#terminal-input {
    background: none;
    border: none;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1em;
    outline: none;
    width: 100%;
}

