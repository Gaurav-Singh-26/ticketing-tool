# Ticketing Tool

A lightweight frontend ticket-management demo built with HTML, CSS, and vanilla JavaScript. It lets a user create support tickets, set priority, update ticket status, filter by status, and delete tickets.

## Features

- Create tickets with a title, description, and priority
- Track Open, In Progress, and Resolved tickets
- Filter the ticket list by status
- View summary counts for all tickets and each status
- Save tickets in browser `localStorage`
- Responsive layout for desktop and mobile

## Project structure

```text
ticketing-tool/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── README.md
└── .gitignore
```

## Run locally

No build tools or package installation are required.

1. Download or clone this repository.
2. Open `frontend/index.html` in a modern browser.

For a more consistent local development experience, use the Live Server extension in Visual Studio Code and open `frontend/index.html`.

## Technology stack

- HTML5
- CSS3
- JavaScript (ES6)
- Browser localStorage

## Notes and limitations

This is a frontend-only demo. It does not include a server, authentication, shared team data, or a production database. Tickets are saved in the current browser only.

## Future improvements

- Add a backend API and database
- Add authentication and user roles
- Add ticket search and sorting
- Add comments and assignment to support agents

## Author

Created as a learning project for a Full Stack Development internship task.
