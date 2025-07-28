# Flipkart Clone Backend

## Setup

1. Ensure SQL Server Express is running and a database named `FlipkartClone` exists.
2. Create the required tables:

```
CREATE TABLE Products (
  Id INT PRIMARY KEY IDENTITY,
  Name NVARCHAR(100),
  Price DECIMAL(10,2),
  Description NVARCHAR(255),
  ImageUrl NVARCHAR(255),
  Category NVARCHAR(50),
  Stock INT
);

CREATE TABLE Orders (
  Id INT PRIMARY KEY IDENTITY,
  Items NVARCHAR(MAX),
  Total DECIMAL(10,2),
  CreatedAt DATETIME DEFAULT GETDATE()
);
```

## Run

```
cd backend
node server.js
```

API Endpoints:
- `GET /api/products` - List all products
- `POST /api/orders` - Place an order 