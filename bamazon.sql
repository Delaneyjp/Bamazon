DROP DATABASE IF EXISTS Bamazon;


-- Create database: 'Bamazon'--
CREATE DATABASE Bamazon;
USE Bamazon;

-- Create table: 'products' --
CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(12,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Computer Desk L Shape', 'Furniture', 125, 25),
		('Mortal Combat Video Game', 'Electronics', 60, 75),
		('Simply Lemonade 20ox', 'Grocery', 3.99, 100),
		('Twinkies 8pack', 'Grocery', 2.50, 200),
		('Bananas', 'Produce', 0.35, 900),
		('Dry Erase Markers', 'Office Supplies', 8.99, 125),
		('Blue Poka Dot Shower Curtain', 'Home Decoration', 22.69, 42),
		('42in LCD Sony Television', 'Electronics', 499.99, 20),
		('Skittles Share Size Original', 'Grocery', 2.25, 10000),
		('12pack Assorted Mens Underwear Medium', 'Mens Clothing', 15.99, 200);
        
        SELECT * FROM products;
