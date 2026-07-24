# MindSpace Frontend

This is the frontend for **MindSpace**, a task manager application. It's built with React and Vite, and supports email/password authentication as well as Google and GitHub OAuth login, backed by the [MindSpace Backend](#) API. <!-- replace with your actual backend repo link -->

## Features

- Email/password signup and login
- Google OAuth login
- GitHub OAuth login
- Centralized authentication state and logic via `AuthContext`
- Persistent sessions using `localStorage`
- Light/dark theme support

## Tech Stack

- React (Vite)
- React Router
- Axios
- Tailwind CSS
- `@react-oauth/google`
- `react-icons`

## Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx     # centralized auth state and logic (signup, login, Google, GitHub, logout)
│   └── ThemeProvider.jsx   # light/dark theme handling
├── component/
│   ├── NavTab.jsx
│   └── FootTab.jsx
├── pages/
│   ├── SignIn.jsx
│   └── SignUp.jsx
├── App.jsx
└── main.jsx
```

## Environment Variables

Create a `.env` file in the root with:

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

> Note: Vite only exposes environment variables prefixed with `VITE_` to frontend code, and only reads `.env` values at startup — restart the dev server after any changes.

## Getting Started

```bash
npm install
npm run dev
```

Make sure your `.env` file points `VITE_API_BASE_URL` to your running backend (local or deployed).

## Authentication

All authentication logic lives in `AuthContext.jsx` and is available anywhere in the app via the `useAuth()` hook:

```javascript
const { user, token, loading, signup, signin, googleLogin, githubLogin, logout } = useAuth();
```

- `signup(formData)` / `signin(formData)` — email/password auth, calls the backend and stores the returned token/user.
- `googleLogin()` — triggers the Google OAuth popup, sends the resulting access token to the backend.
- `githubLogin()` — redirects to GitHub's authorization page; the resulting `code` is picked up automatically on redirect and exchanged with the backend.
- `logout()` — clears the stored token and user state.

## OAuth Setup Notes

### Google

1. Create OAuth 2.0 credentials in [Google Cloud Console](https://console.cloud.google.com/).
2. Add your frontend URLs to **Authorized JavaScript origins** (both local and deployed), e.g.:
   - `http://localhost:5173`
   - `https://your-frontend-url.vercel.app`
3. `App` must be wrapped in `GoogleOAuthProvider` in `main.jsx`:
   ```jsx
   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
     <AuthProvider>
       <App />
     </AuthProvider>
   </GoogleOAuthProvider>
   ```

### GitHub

1. Create an OAuth App under GitHub **Settings → Developer settings → OAuth Apps**.
2. Set the **Authorization callback URL** to match your frontend's URL (e.g. `https://your-frontend-url.vercel.app`).
3. Make sure this matches the `redirect_uri` used in `githubLogin()` inside `AuthContext.jsx`.

## Deployment

Deployed on [Vercel](https://vercel.com). Remember to add all `VITE_` environment variables in Vercel's dashboard under **Settings → Environment Variables**, then trigger a redeploy — env changes are baked in at build time and won't apply retroactively.

## Roadmap

- [ ] Finish remaining pages
- [ ] Task filtering and search UI
- [ ] Due date reminders/notifications UI
- [ ] Forgot password flow

## License

Currently unlicensed / for personal and educational use.