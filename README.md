# TodoTab Extension

![TodoTab Logo](icons/icon128.png)

## Overview

**TodoTab** is a minimalist Chrome extension that transforms your new tab page into a simple, distraction-free to-do list. Every time you open a new tab, you’re greeted with your tasks—making it easy to add, complete, or remove items and stay organized throughout your day.

## Features

- **Quick Add:** Instantly add new tasks from the new tab page.
- **Mark as Complete:** Check off tasks as you finish them; completed tasks are visually distinguished.
- **Delete Tasks:** Easily remove tasks you no longer need.
- **Persistent Storage:** Your tasks are saved using Chrome’s Sync Storage, so they’re available across all your devices.
- **Minimalist Design:** Clean, intuitive interface focused on productivity.


## Project Structure

```
todotab-extension/
│
├── icons/           # Extension icons
├── src/
│   ├── index.html   # Main new tab page
│   ├── script.js    # JavaScript logic
│   └── styles.css   # CSS styles
├── manifest.json    # Chrome Extension manifest (v3)
└── README.md
```

## Technologies Used

- **HTML5** and **CSS3** for the user interface
- **Vanilla JavaScript** for functionality
- **Chrome Extension APIs** (`storage`, `chrome_url_overrides`)
- **Chrome Sync Storage** for cross-device persistence

## Contributing

Contributions, suggestions, and bug reports are welcome! Feel free to open an issue or submit a pull request.

---

**TodoTab** – Simplify your productivity, one tab at a time!
