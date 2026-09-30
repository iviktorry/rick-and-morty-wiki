# Rick and Morty Wiki

A responsive single-page wiki for browsing characters, locations, and episodes from the Rick and Morty universe. The app uses the public [Rick and Morty API](https://rickandmortyapi.com/documentation) and provides a small client-side interface for searching, filtering, paging through results, and viewing related characters.

![Application Interface Screenshot](./src/assets/screenshot.png)

## 🔗 Links

**Live Demo:** [View Live Site](https://rick-and-morty-wiki-app.vercel.app/)  
**GitHub Repository:** [View Source Code](https://github.com/iviktorry/rick-and-morty-wiki!)

---

## Features

- **Home page:** entry points to the character, location, and episode sections, each with a local category image.
- **Character browser:** paged character cards with portrait, ID, name, status, gender, species, origin, and last known location.
- **Character search:** submit a name query to the API; the clear control resets the query and returns to page one.
- **Character filters:** combine status, gender, and species filters. Changing a filter or search starts again from the first results page.
- **Locations:** page through locations, choose one from the current page, and see its type and resident character cards.
- **Episodes:** page through episodes, choose one from the current page, and see its episode code, title, and character cards.
- **Pagination:** previous/next controls and a sliding window of up to five page numbers, with unavailable actions disabled.
- **Navigation and fallback:** React Router links between sections, active navigation styling, and a custom not-found page with a return-home link.
- **Loading and error feedback:** the character directory has loading, error, and empty-result states; location/episode detail components also define loading, error, and empty-resident states, with the empty-resident edge case noted below.
- **Responsive layout:** Tailwind breakpoints adjust navigation and data grids for smaller and larger screens.
- **Reduced motion:** the global stylesheet disables transitions when the user prefers reduced motion.
- **Page titles:** the document title is updated for the home page, data sections, and not-found route.

## Routes

| Path           | Page                                          |
| -------------- | --------------------------------------------- |
| `/`            | Home                                          |
| `/characters`  | Searchable and filterable character directory |
| `/locations`   | Location selector and resident characters     |
| `/episodes`    | Episode selector and episode characters       |
| Any other path | Not-found page                                |

## Tech Stack

### Application

- **React 19** (`react`, `react-dom`) — component-based UI and state/effect hooks.
- **React Router DOM 7** — browser history, links, and declarative route matching. `BrowserRouter` wraps the app in `src/main.jsx`.
- **Vite 8** — local development server and production bundler.
- **Tailwind CSS 4** — utility-first styles, imported in `src/index.css` with `@import "tailwindcss"`.
- **Rick and Morty API** — external source for all character, location, and episode data. The app has no custom backend or database.
- **Lucide React** — the search and clear (`Search`, `X`) icons in the character search form.
- **Google Fonts (Ubuntu)** — font loaded from Google Fonts in `index.html`; an internet connection is needed to fetch it.

### Developer tools

- **ESLint 10** — linting through the flat config in `eslint.config.js`, with the recommended JavaScript rules, React Hooks rules, and React Refresh/Vite rules.
- **Prettier Tailwind CSS plugin** (`prettier-plugin-tailwindcss`) — configured to sort Tailwind class names when Prettier runs.
- **Vercel rewrite** — `vercel.json` sends requests for app paths to `index.html`, allowing the client-side routes to load on a Vercel deployment.

## Getting Started

Install a current Node.js version and npm, then run:

```bash
npm install
npm run dev
```

## 👩‍💻 Developer Contacts & Socials

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/iviktorry)
[![Frontend Mentor](https://img.shields.io/badge/Frontend_Mentor-3F54A3?style=for-the-badge&logo=frontendmentor&logoColor=white)](https://www.frontendmentor.io/profile/iviktorry)
[![Telegram](https://img.shields.io/badge/Telegram-229ED9?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/@wsxxdfv)
<!-- [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile) -->
