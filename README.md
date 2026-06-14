# AI Resume Scorer — Frontend

React and Vite frontend for the AI Resume Scorer. Users can upload their resume, get AI scores and feedback, view their history and download their files. Admins get an extra panel to manage users and see all uploaded resumes.

---

## What's inside

```
src/
├── components/
│   │
│   ├── RootLayout.jsx      wraps every page with Navbar and Footer
│   ├── AppLayout.jsx       wraps protected pages with the Sidebar
│   ├── Navbar.jsx          top bar, changes links based on login state
│   ├── Sidebar.jsx         Dashboard, History, Admin links + Logout
│   ├── Footer.jsx
│   ├── ui/
│   │   └── ProtectedRoute.jsx  redirects to login if not authenticated
│   └── resume/
│       ├── ResumeUpload.jsx    drag and drop zone + job description input
│       ├── ScoreCard.jsx       three score rings (Overall, ATS, Match)
│       ├── RadarChart.jsx      section breakdown as a radar chart
│       ├── AnalysisCard.jsx    strengths, weaknesses, suggestions, keywords
│       └── HistoryCard.jsx     single resume card used in the history list
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── HistoryPage.jsx
│   ├── EditProfilePage.jsx
│   ├── ChangePasswordPage.jsx
│   ├── AdminPage.jsx
│   ├── UnauthorizedPage.jsx
│   └── NotFoundPage.jsx
├── services/
│   └── api.js          every axios call in one place
├── store/
│   ├── authStore.js    login state with Zustand
│   └── resumeStore.js  upload loading state
├── styles/
│   └── theme.js        all Tailwind class strings as named exports
├── App.jsx             route definitions
└── main.jsx
```

---

## Pages

**HomePage** — landing page with a short description of what the app does, three feature cards and a button to register or go to the dashboard if already logged in.

**LoginPage / RegisterPage** — simple forms. Register lets you optionally upload a profile photo. After registering you get sent to login. After logging in you land on the dashboard.

**DashboardPage** — the main page. You upload a resume here (drag and drop or click to browse), optionally paste a job description, then hit Analyze. Once the backend responds you see three score rings, a radar chart showing how each section scored and a card with strengths, weaknesses, suggestions and keyword matches. The dashboard resets when you log out — nothing carries over between sessions.

**HistoryPage** — shows every resume you have uploaded. Click View Analysis on any card to see the full scores and feedback in a panel on the right. You can also download the original file or delete the resume entirely.

**EditProfilePage** — change your username or upload a new profile photo. Email is read-only.

**ChangePasswordPage** — three fields for current password, new password and confirm. Each field has a show/hide toggle. Validates that new and confirm match before submitting.

**AdminPage** — only visible to admins. Shows four stat cards at the top then two tabs — one for all users (with activate/deactivate and delete), one for all resumes across every user.

---

## Routes

```
/                        HomePage               public
/login                   LoginPage              public
/register                RegisterPage           public
/dashboard               DashboardPage          USER and ADMIN
/history                 HistoryPage            USER and ADMIN
/profile/edit            EditProfilePage        USER and ADMIN
/profile/change-password ChangePasswordPage     USER and ADMIN
/admin                   AdminPage              ADMIN only
/unauthorized            UnauthorizedPage       public
*                        NotFoundPage           public
```

---

## State

There are two stores, both using Zustand.

`authStore.js` holds the current user and login state. It exposes `login`, `register`, `logout`, `checkAuth` and `setUser`. `ProtectedRoute` waits for `checkAuth` to finish before deciding whether to redirect — this is what lets us on dashboard when you refresh the page.

`resumeStore.js` is minimal on purpose. It just holds a `loading` flag for the upload state. All resume data (scores, history, feedback) is fetched directly inside each page component and stored in local state — there is no global resume state.

---

## Theme

All Tailwind classes live in `src/styles/theme.js` as named exports. Components import what they need:

```javascript
import { btnPrimary, cardClass, textMuted } from "../styles/theme";
```

If you want to change the look of the whole app you only need to edit `theme.js`. The color palette is based on Tailwind slate and blue:

```
page background     slate-50
cards and navbar    white
primary             blue-600
borders             slate-200
text                slate-900
muted text          slate-500
success             green-600
warning             amber-500
danger              red-500
```
