# 📚 Mini Library API

A RESTful API for a small library, built with **Node.js, Express, Mongoose and MongoDB**.

The project manages **authors, books, members and borrowing**. It is intentionally small and easy to follow, yet it covers most of what Mongoose offers: schema types and validation, CRUD with update operators, virtuals, JSON transformation, hooks, methods, statics, population, and (as a bonus) aggregation.

---

## ✨ Features

- **Authors, Books, Users and Borrows** with relations between them (One-to-Many and Many-to-Many)
- **Rich schemas** using many Mongoose types: `String`, `Number`, `Boolean`, `Date`, `ObjectId`, `Array`, `Map`, `Mixed`, `Decimal128`, nested objects and subdocuments
- **Validation**: `required`, `min` / `max`, `minlength` / `maxlength`, `enum`, `match` (regex) and custom validators
- **Full CRUD**: `create`, `insertMany`, `find`, `findOne`, `findById`, `updateOne`, `findByIdAndUpdate`, `save`, soft delete, hard delete and `deleteMany`
- **Query features**: filtering, search, sorting, pagination, field selection and `countDocuments`
- **Update operators**: `$push`, `$pull`, `$addToSet`, `$inc`
- **Virtuals**: `fullName`, `age`, `avgRating`, `inStock`, `isOverdue`, plus a populate virtual for an author's books
- **Transformations**: custom `toJSON`, getters / setters, pre / post hooks, instance methods, static methods and query helpers
- **Population**: simple, array, nested, inside subdocuments and virtual populate
- **Business logic**: borrowing rules, return flow and automatic fine calculation
- **Centralized error handling** with consistent responses and correct HTTP status codes
- **Aggregation (bonus)**: books per genre, most borrowed books, average rating per author

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js (ES modules) | Runtime |
| Express | Web framework |
| MongoDB (Atlas or local) | Database |
| Mongoose | ODM |
| dotenv | Environment variables |
| bcrypt *(optional)* | Password hashing |
| nodemon *(optional)* | Development auto-reload |
| Postman | API testing |
| MongoDB Compass | Viewing the data |

---

## 📁 Project Structure

```
library-api/
├── main.js
├── .env
├── package.json
└── src/
    ├── config/
    │   └── env.js
    ├── common/
    │   ├── errorHandler.js
    │   ├── asyncHandler.js
    │   └── utils
    ├── db/
    │   ├── connection.js
    │   └── models/
    │       ├── author.model.js
    │       ├── book.model.js
    │       ├── user.model.js
    │       └── borrow.model.js
    └── module/
        ├── author/    (author.controller.js, author.routes.js)
        ├── book/
        ├── user/
        └── borrow/
```

---

## 🗺️ Data Model

```
Author  1 ──── N  Book  1 ──── N  Borrow  N ──── 1  User
                  ▲                                  │
                  └────────── N : M (favorites) ─────┘
```

- An **Author** has many **Books** (`Book.author` → `Author`).
- A **Book** can be borrowed many times (`Borrow.book` → `Book`).
- A **User** can have many **Borrows** (`Borrow.user` → `User`).
- **Users ↔ Books** is Many-to-Many through `User.favoriteBooks` (an array of `ObjectId`s).

### Author

| Field | Type | Rules |
|---|---|---|
| `name` | String | required, trim, minlength 3, maxlength 60 |
| `bio` | String | optional, maxlength 500 |
| `birthDate` | Date | custom validator: cannot be in the future |
| `nationality` | String | default `"Egyptian"` |
| `socialLinks` | Map of String | e.g. `website`, `facebook` |
| `createdAt` / `updatedAt` | Date | schema `timestamps` option |
| *virtual* `books` | – | populate virtual (books of the author) |
| *virtual* `age` | – | calculated from `birthDate` |

### Book

| Field | Type | Rules |
|---|---|---|
| `title` | String | required, trim, minlength 2 |
| `isbn` | String | required, unique, 13 digits (regex), immutable |
| `author` | ObjectId | required, `ref: Author` |
| `genres` | [String] | enum: `fiction`, `science`, `history`, `tech`, `kids`; at least one |
| `price` | Number | required, min 0, setter rounds to 2 decimals |
| `pages` | Number | min 1, max 5000 |
| `publishedAt` | Date | default `Date.now` |
| `copies` | Number | default 1, min 0 (available copies) |
| `tags` | [String] | lowercase, trim |
| `details` | Nested Object | `language` (with default), `publisher`, `edition` |
| `reviews` | [Subdocument] | `{ user (ref), rating 1..5, comment, createdAt }` |
| `meta` | Mixed | free-form data |
| `isDeleted` | Boolean | default `false` (soft delete) |
| *virtual* `avgRating` | – | calculated from `reviews` |
| *virtual* `inStock` | – | `copies > 0` |

### User

| Field | Type | Rules |
|---|---|---|
| `firstName` / `lastName` | String | required, trim |
| `email` | String | required, unique, lowercase, regex |
| `password` | String | required, minlength 8, `select: false` |
| `phone` | String | Egyptian number (`01xxxxxxxxx`), regex |
| `age` | Number | min 12, max 100 |
| `role` | String | enum: `member`, `admin`; default `member` |
| `address` | Nested Object | `{ city, street }` |
| `favoriteBooks` | [ObjectId] | `ref: Book` (Many-to-Many) |
| `isActive` | Boolean | default `true` |
| *virtual* `fullName` | – | getter and setter |

### Borrow

| Field | Type | Rules |
|---|---|---|
| `user` | ObjectId | required, `ref: User` |
| `book` | ObjectId | required, `ref: Book` |
| `borrowedAt` | Date | default: now |
| `dueDate` | Date | required, custom validator: must be after `borrowedAt` |
| `returnedAt` | Date | optional |
| `status` | String | enum: `borrowed`, `returned`, `overdue` |
| `fine` | Number / Decimal128 | default 0, min 0 |
| *virtual* `isOverdue` | – | `dueDate` passed and not returned yet |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (a recent LTS version)
- A MongoDB database: [MongoDB Atlas](https://www.mongodb.com/atlas) or a local installation
  *(Transactions require a replica set; Atlas provides one by default.)*

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mohamed20186/library-api.git
cd library-api

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/library
```

For Atlas, use your connection string for `MONGO_URI`.

### Run the Server

```bash
# plain Node
node main.js

# or with auto-reload (if nodemon is installed)
npx nodemon main.js
```

The server starts only after the database connection succeeds.

---

## 📡 API Endpoints

### Authors

| Method | Path | Description |
|---|---|---|
| POST | `/authors` | Create an author |
| GET | `/authors` | List authors + search by name + pagination |
| GET | `/authors/:id` | Author with their books (virtual populate) |
| PATCH | `/authors/:id` | Update an author |
| DELETE | `/authors/:id` | Delete an author (blocked if they have books) |

### Books

| Method | Path | Description |
|---|---|---|
| POST | `/books` | Create a book |
| POST | `/books/bulk` | Add many books (`insertMany`) |
| GET | `/books` | List with filtering, search, sorting, pagination and populate |
| GET | `/books/:id` | Book details with author and reviews |
| PATCH | `/books/:id` | Update a book |
| PATCH | `/books/:id/reviews` | Add a review (`$push`) |
| DELETE | `/books/:id/reviews/:reviewId` | Remove a review (`$pull`) |
| DELETE | `/books/:id` | Soft delete |
| DELETE | `/books/:id/hard` | Hard delete |

### Users

| Method | Path | Description |
|---|---|---|
| POST | `/users/signup` | Register a new member |
| GET | `/users` | List users |
| GET | `/users/:id` | User with populated favorite books |
| PATCH | `/users/:id` | Update a user |
| POST | `/users/:id/favorites/:bookId` | Add a book to favorites (`$addToSet`) |
| DELETE | `/users/:id/favorites/:bookId` | Remove a book from favorites (`$pull`) |
| DELETE | `/users/:id` | Delete a user |

### Borrows

| Method | Path | Description |
|---|---|---|
| POST | `/borrows` | Borrow a book |
| PATCH | `/borrows/:id/return` | Return a book and calculate the fine |
| GET | `/borrows` | All borrows (nested populate) |
| GET | `/borrows/overdue` | Overdue borrows only |
| GET | `/users/:id/borrows` | Borrows of a specific user |

### Stats (Bonus)

| Method | Path | Description |
|---|---|---|
| GET | `/stats/books-per-genre` | Number of books per genre |
| GET | `/stats/top-borrowed` | Top 5 most borrowed books |
| GET | `/stats/rating-avg` | Average rating per author |

---

## 🔍 Query Parameters for `GET /books`

| Parameter | Example | Description |
|---|---|---|
| `genre` | `?genre=fiction,history` | Filter by genre (`$in`) |
| `minPrice` / `maxPrice` | `?minPrice=100&maxPrice=300` | Price range (`$gte` / `$lte`) |
| `search` | `?search=cairo` | Case-insensitive title search (`$regex`) |
| `sort` | `?sort=-price` | Sort ascending, or descending with `-` |
| `page` / `limit` | `?page=2&limit=10` | Pagination (`skip` + `limit`) |
| `fields` | `?fields=title,price` | Select specific fields |
| `populate` | `?populate=author` | Include author data |

The response includes `total`, `page` and `totalPages`.

---

## 📋 Business Rules

**Borrowing a book**

- The book must exist and have `copies > 0`.
- The user must be active.
- A user can have at most **3** books borrowed at the same time.
- On success, the book's `copies` is decreased by 1 using `$inc`.

**Returning a book**

- `returnedAt` is recorded and `status` is updated.
- The book's `copies` is increased by 1.
- The fine is **5 EGP per day** of delay.

**Deleting**

- Books are soft-deleted by default (`isDeleted: true`) and hidden from all queries.
- An author who still has books cannot be deleted.

---

## ⚠️ Error Handling

All errors are handled by a single middleware and share one response shape:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

| Case | Status |
|---|---|
| Validation error (e.g. negative price, invalid enum, bad email or phone) | `400` |
| Invalid ID format (`CastError`, e.g. `/books/abc`) | `400` |
| Business rule violated (no copies left, borrow limit reached, author has books) | `400` |
| Duplicate key (e.g. duplicate ISBN, error code `11000`) | `409` |
| Valid ID but document not found | `404` |

---

## 🧪 Sample Requests

**Create an author** — `POST /authors`

```json
{
  "name": "Naguib Mahfouz",
  "bio": "Egyptian novelist",
  "birthDate": "1911-12-11",
  "nationality": "Egyptian",
  "socialLinks": { "website": "https://example.com" }
}
```

**Create a book** — `POST /books`

```json
{
  "title": "Cairo Trilogy",
  "isbn": "9780385264662",
  "author": "<AUTHOR_ID>",
  "genres": ["fiction", "history"],
  "price": 250.5,
  "pages": 1313,
  "copies": 3,
  "tags": ["Classic", " Egypt "],
  "details": { "language": "Arabic", "publisher": "AUC Press" }
}
```

**Sign up a user** — `POST /users/signup`

```json
{
  "firstName": "Ahmed",
  "lastName": "Ali",
  "email": "Ahmed@Test.com",
  "password": "12345678",
  "phone": "01012345678",
  "age": 25,
  "address": { "city": "Cairo", "street": "Tahrir" }
}
```

**Borrow a book** — `POST /borrows`

```json
{
  "user": "<USER_ID>",
  "book": "<BOOK_ID>",
  "dueDate": "2026-11-15"
}
```

Replace `<AUTHOR_ID>`, `<USER_ID>` and `<BOOK_ID>` with the IDs returned by your database.

---

## ✅ Negative Test Cases

| Case | Expected result |
|---|---|
| Book with a duplicate `isbn` | `409 Conflict` |
| Negative `price`, or a genre outside the enum | `400` + validation message |
| Invalid ID in the URL (`/books/abc`) | `400` (CastError), not `500` |
| Valid ID that does not exist | `404 Not Found` |
| Bad email format or non-Egyptian phone | `400` |
| Updating `isbn` after creation | Ignored / blocked (`immutable`) |
| Borrowing a book with `copies = 0` | `400` |
| Borrowing a 4th book for the same user | `400` (limit is 3) |
| `dueDate` before `borrowedAt` | `400` (custom validator) |
| Adding the same favorite twice | No duplicates (`$addToSet`) |
| Deleting an author who has books | `400` with a clear message |

---

## 📖 What This Project Demonstrates

- Mongoose schema design: types, validators, defaults, `immutable`, `select: false`, `timestamps`
- Differences between `save()`, `create()`, `insertMany()`, `updateOne()` and `findOneAndUpdate()`, especially regarding validators and hooks
- Why `runValidators: true` and `new: true` matter in update queries
- `unique` is an index (error code `11000`), not a validator
- Virtuals: how they appear in JSON (`toJSON: { virtuals: true }`) and why they cannot be queried
- `lean()` vs regular documents, and `toObject` vs `toJSON`
- Population in all its forms, including what happens when a reference points to a deleted document

---

## 🔮 Possible Improvements

- JWT authentication and role-based access (block `member` from admin endpoints)
- Text and compound indexes on book titles, checked with `explain()`
- Book cover upload with `multer`
- Automated tests with `jest` and `supertest`
- Rate limiting and request validation with `joi` or `zod`
- MongoDB transactions (`withTransaction`) for the borrow flow

---

## 👤 Author

**Mohamed** — [@Mohamed20186](https://github.com/Mohamed20186)

---

## 📄 License

This project is for learning and practice purposes.
