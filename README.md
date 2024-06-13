# Terminal-style CV

This project is a Terminal-style CV (Curriculum Vitae) Website that provides a command-line interface for displaying personal information and skills.
It is all static files, so you can just run an nginx, apache or just python in a container to display a simple page.

![image](https://github.com/valeriu-craciun/Terminal-style-CV/assets/35722502/62647169-83ea-4298-9fe3-b0c5d084b9a8)



![Demo](demo.gif)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Contributing](#contributing)
- [Usage](#usage)
- [License](#license)

## Features

- Command-line interface (CLI) for displaying CV information.
- Customizable layout and styling.
- Supports showcasing skills, projects, and personal information in a terminal-like environment.

## Installation
no installation required, just sync the repo and modify a few files


### Prerequisites

Before installation, ensure you have the following installed:

- python3

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/valeriu-craciun/Terminal-style-CV.git
2. Navigate into the project directory:
   ```bash
   cd Terminal-style-CV

3. To start the Terminal-style CV application, run:
   ```bash
   python3 -m http.server

This will launch the python http server in your terminal and you can access it directly in your local browser ( http://0.0.0.0:8000/ ).

### Usage
The content of the directory after syncing the repo is the following:
```bash
Terminal-style-cv/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── data/
    ├── me.jpg
    ├── about.txt
    ├── education.txt
    ├── experience.txt
    ├── skills.txt
    └── contact.txt
```

Edit the text files in the data subdirectory, I would say they have pretty explanatory names to not give it here. me.jpg represents the picture shown in about command.
Edit the index.html + script.js to modify the title and some of the content. Feel free to modify it to make more usable.
### Contributing

Contributions are welcome! Please follow these steps:

    1. Fork the repository.
    2. Create a new branch (git checkout -b feature/your-feature).
    3. Make your changes.
    4. Commit your changes (git commit -am 'Add new feature').
    5. Push to the branch (git push origin feature/your-feature).
    6. Create a new Pull Request.

Please ensure your Pull Request adheres to the code of conduct.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
