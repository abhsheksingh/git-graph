
# Git Graph — Visualize Your Repo Structure
Automatically generate and embed a visual folder structure graph in your README.md file using GitHub Actions.
<br>
<br>
<img width="718" height="600" alt="509636533-a11d443a-11f1-451d-af2d-ee85a1a1e5c5" src="https://github.com/user-attachments/assets/7452f558-2e9f-44ab-84d4-9e5a769b49c1" />
<br>


🚀 Features

- Generates a JSON representation of your repo's folder structure
- Renders a visual graph using D3.js
- Captures a screenshot with Puppeteer
- Updates your README.md with the latest structure image
- Supports customization: image size, depth level, and folder/file exclusions

🧩 Inputs<p>
```folder-path: '.'  # Root folder; change if you want to target a subfolder```

## Requirement
Your README.md must include the following placeholder comment:
```yaml
<!-- STRUCTURE-GRAPH -->
```
This comment acts as a target for the action to replace with the path to the generated folder structure image.


## Usage:
<!-- start usage -->
```yaml
name: Graph Action

permissions:
  contents: write  # Required to commit the updated image

on:
  push:            # Triggers on every push
    branches:
      - main       # You can change this to any branch you want
jobs:
  generate-graph:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Generate folder structure graph
        uses: abhsheksingh/git-graph@v1
        with:
          folder-path: '.'  # Root folder; change if you want to target a subfolder
```
<!-- end usage -->

### What This Does
- Triggers on every push to main
- Checks out the repo
- Runs action to:
  - Generate a git repo's structure JSON
  - Render the structure as an interactive HTML graph using D3.js.
  - Capture a screenshot of the graph using Puppeteer.
  - Save the image as .github/rgraph/structure.png (this file will be created or updated in your repo).
  - Update the README.md by replacing the placeholder comment `<!-- STRUCTURE-GRAPH -->` with the latest structure image.
 
## Example of generated repo graph image

<!-- STRUCTURE-GRAPH -->
<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/a11d443a-11f1-451d-af2d-ee85a1a1e5c5" />
<p>**Green circle node is for python files and grey for others<p>

### 🎬 Demo

Here’s how the Git Graph Action works in real time:

![Git Graph Demo](assets/demo.gif)
