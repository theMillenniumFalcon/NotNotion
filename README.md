# notNotion

A bare minimum notion clone

## original idea
The credit for the original idea and implementation goes to [Konstantin Münster](https://github.com/konstantinmuenster/notion-clone)

## Tech and major tools used in this project:

- JavaScript
- Express
- MongoDB
- Sass
- React beautiful dnd
- Multer

## Features
- **Slash Commands** (Type `/` to turn the block into different content types)
- **HTML Support** (Use regular HTML tags like `<a>` in text blocks)
- **Image Support** (Upload images by using the `/image` command)
- **Drag And Drop** (Reorder blocks easily by drag and drop)
- **Guest Editing** (Anyone can create public pages and share them via link)
- **User Management** (Create an account to create private pages)
- **Scheduled Jobs** (Delete inactive pages and accounts automatically)

## Checklist

- [x] <s>developing a MVP</s>
- [ ] making the turn into feature work directly from the action menu
- [ ] adding checkbox and toggle components

## Config / Secrets environment variables

Copy `.env.example` from the server and client folders to `.env` and `.env.local` repectively and add your private information

*Note: never commit this file, it should be ignored by Git*

### Server
```
PORT=
DATABASE_URI=
CLIENT_URL=
JWT_KEY=
DOMAIN=
```

### Client
```
NEXT_PUBLIC_API=
```

## Installation

### SSH

```bash
git clone git@github.com:theMillenniumFalcon/NotNotion.git
```

### GitHub CLI

```bash
gh repo clone theMillenniumFalcon/NotNotion
```

### HTTPS

```bash
git clone https://github.com/theMillenniumFalcon/NotNotion && cd server && npm install && cd .. && cd client && npm install
```

## Running the app

### server
```bash
# development
npm run dev
```

### client
```bash
# development
npm run dev
```

## Project Structure

### client
    .
    ├── components              # components for building the UI
    ├── context                 # react context setup
    ├── hooks                   # custom react hooks
    ├── images                  # svg files
    ├── pages                   # nextJS pages
    ├── public                  # default nextJS assets 
    ├── shared                  # global sass files
    ├── utils                   # util functions
    └── ...

### server
    .
    ├── controllers             # mongoose controllers
    ├── database                # database connection file
    ├── images                  # folder to store multer images
    ├── jobs                    # jobs that are meant run in background
    ├── middleware              # middleware functions
    ├── models                  # mongoose models 
    ├── routes                  # API routes
    └── index.js                # starting file    

### I have another question!

Feel free to ask us on [Twitter](https://twitter.com/nishankstwt)! You can also email me at nishankpr2002@gmail.com.

### Dev team

- [Nishank Priydarshi](https://themillenniumfalcon.github.io)