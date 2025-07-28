CREATE DATABASE FlipkartClone;
GO
USE FlipkartClone;
GO

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
  Items NVARCHAR(MAX), -- JSON string of cart items
  Total DECIMAL(10,2),
  CreatedAt DATETIME DEFAULT GETDATE()
);

INSERT INTO Products (Name, Price, Description, ImageUrl, Category, Stock) VALUES
('Sample Product 1', 499.99, 'A great product', 'https://via.placeholder.com/150', 'Electronics', 10),
('Sample Product 2', 299.99, 'Another great product', 'https://via.placeholder.com/150', 'Books', 20); 