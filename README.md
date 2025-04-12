# Chestnut Hill - Creative Social Media Platform

Chestnut Hill is a creative-first social media platform built with Laravel. It emphasizes psychological well-being, inspiration, and collaboration—combining the best of Twitter, Tumblr, and Pinterest. This README outlines the backend API endpoints built in **Phase 1** of the project.

---

## Technologies Used

-   Laravel 10
-   PHP 8.x
-   Laravel Sanctum for authentication
-   MySQL / MariaDB (or compatible)
-   Postman for API testing

---

## 🚀 Getting Started (Local Setup)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/chestnut-hill.git
cd chestnut-hill
composer install
cp .env.example .env
php artisan key:generate
```

### 2. Set Up Database

You can use MySQL, MariaDB, or run XAMPP for local development. TablePlus is recommended for managing your database.

**Set your `.env` file:**

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=chestnuthill
DB_USERNAME=root
DB_PASSWORD=
```

Then run migrations:

```bash
php artisan migrate
```

### 3. Serve Locally

```bash
php artisan serve
```

App will be accessible at `http://127.0.0.1:8000`

---

## Authentication & User Endpoints

### Register a new user

`POST /api/register`

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password",
    "password_confirmation": "password"
}
```

### Login and get token

`POST /api/login`

```json
{
    "email": "john@example.com",
    "password": "password"
}
```

Response includes a `token` you must include in future requests as a Bearer token.

### Logout

`POST /api/logout` (Requires Bearer token)

### Get authenticated user

`GET /api/user`

### Update user profile

`PUT /api/profile`

```json
{
    "name": "New Name",
    "bio": "Creative developer and artist."
}
```

### Upload avatar image

`POST /api/profile/avatar` (form-data)

-   `avatar` → File (image/png, image/jpeg, etc.)

---

## Posts

### Get all posts

`GET /api/posts`

### Create a post

`POST /api/posts` (form-data)

-   `content`: string (required)
-   `image`: file (optional)

### View a post by ID

`GET /api/posts/{id}`

### Update a post

`PUT /api/posts/{id}` (form-data)

-   Only if you are the owner

### Delete a post

`DELETE /api/posts/{id}`

### Hide a post (instead of deleting)

`POST /api/posts/{id}/hide`

### Unhide a post

`POST /api/posts/{id}/unhide`

### Search posts

`GET /api/posts/search?q=keyword`

---

## Comments

### Add comment to a post

`POST /api/posts/{post}/comments`

```json
{
    "content": "This is great!"
}
```

### Delete a comment

`DELETE /api/comments/{id}`

---

## Likes

### Like a post

`POST /api/posts/{id}/like`

### Unlike a post

`DELETE /api/posts/{id}/like`

---

## Saved Posts

### Save or unsave a post

`POST /api/posts/{id}/save` (toggles)

### View all saved posts

`GET /api/saved-posts`

---

## User Interactions

### Follow a user

`POST /api/follow/{id}`

### Unfollow a user

`DELETE /api/unfollow/{id}`

### Toggle follow (optional)

`POST /api/toggle-follow/{id}`

---

## Search

### Search users

`GET /api/users/search?q=john`

### Search posts

`GET /api/posts/search?q=artwork`

---

## Feed

### Get posts from followed users

`GET /api/feed`

---

## 🔐 Postman Collection & Environments

Use the provided Postman collection (exported from your Postman workspace).

### ✅ Environment Variable Tips:

-   Create a new environment in Postman with:

```env
base_url = http://127.0.0.1:8000/api
token = (value returned from /login)
```

-   Set your `Authorization` type to `Bearer Token`, and use `{{token}}`.

---

## 📘 Future Enhancements

### Phase 2

-   Badge system for engagement
-   Tagging, portfolios, multiple image posts
-   Curated feeds, event-based badges, notifications

### Phase 3

-   AI/ML auto-tagging and moderation
-   Personalized feed algorithm
-   Python for stress testing, AI suggestions
-   Optional Node.js or Elixir services
-   Accessibility improvements and multilingual support

---

## API Security Notes

-   Graceful error handling (404s, validation, unauthorized)
-   No SQL schema leaks in error responses
-   Future hardening planned with observability tooling (e.g., Datadog)

---

## About the Project

Chestnut Hill is an evolving platform to explore healthier digital communities. Initially built with Laravel and PHP, it’s structured to grow into a cross-stack platform with TypeScript, Python, Elixir, and scalable cloud services.

---

🌱 Built with love and care for the creative community.
