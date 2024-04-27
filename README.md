## Getting Started

### Requirements

### Env File Configuration

```
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=fatihtuzlu
DB_PASSWORD=fatihtuzlu123
DB_DATABASE=booking

```

- Docker
- Docker Compose

```bash
docker-compose up -d
```

- Postman Link

```bash
https://www.postman.com/dark-station-425448/workspace/e-adam-book/request/20110215-1c4d0651-210f-4324-83e3-0ccd27e6aba3
```

# Usage

### Listing Books

`GET /books/findAllBooks`

#### Parameters

- `page`: Optional, the number of the page to return (default: 1)
- `take`: Optional, the number of items to show per page (default: 10)
- `searchTitle`: Optional, a keyword to search titles

#### Example Usage

```bash
curl -X GET "http://localhost:3000/books/findAllBooks?page=1&take=10&searchTitle=Harry%20Potter" -H "accept: application/json"
```

### Listing Books in a Bookstore

`GET /books/findAllBookstoreBooks/:bookStoreId`

#### Parameters

- `page`: Optional, the number of the page to return (default: 1)
- `take`: Optional, the number of items to show per page (default: 10)
- `searchTitle`: Optional, a keyword to search titles

#### Example Usage

```bash
curl -X GET "http://localhost:3000/books/findAllBookstoreBooks/1?page=1&take=10&searchTitle=Harry%20Potter" -H "accept: application/json"
```

### Creating a Book

`POST /books/create/:bookStoreId`

#### Parameters

- `bookStoreId`: The ID of the bookstore to which the book will be added
- `title`: The title of the book
- `author`: The author of the book
- `quantity`: The quantity of the book

#### Example Usage

```bash
curl -X POST "http://localhost:3000/books/create/1" -H "accept: application/json" -H "Content-Type: application/json" -d '{"title":"Harry Potter","author":"J.K. Rowling","quantity":10}'
```

#### Updating Book Quantity

`PUT /books/updateQuantity/:id`

##### Parameters

- `id`: The ID of the book to update
- `quantity`: The new quantity of the book

##### Example Usage

```bash
curl -X PUT "http://localhost:3000/books/updateQuantity/1" -H "accept: application/json" -H "Content-Type: application/json" -d '{"quantity":15}'
```

#### Deleting a Book

`DELETE /books/delete/:id`

##### Parameters

`id`: The ID of the book to delete

##### Example Usage

```bash
curl -X DELETE "http://localhost:3000/books/delete/1" -H "accept: application/json"
```

#### Listing Bookstores

`GET /bookstores/list`

##### Parameters

`page`: Optional, the number of the page to return (default: 1)
`take`: Optional, the number of items to show per page (default: 10)

##### Example Usage

```bash
curl -X GET "http://localhost:3000/bookstores/list" -H "accept: application/json"
```
