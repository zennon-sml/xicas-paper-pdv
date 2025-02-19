-- Create table for administrators
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Password hash for security
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    barcode TEXT,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    cost NUMERIC(10, 2) NOT NULL,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for inventory
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

-- Create table for sales
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    admin_id INT,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_sale FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_admin_sale FOREIGN KEY (admin_id) REFERENCES admins (id)
);

-- create inventory on new product
CREATE FUNCTION create_inventory_entry() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO inventory (product_id, quantity) VALUES (NEW.id, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_product_insert
AFTER INSERT ON products
FOR EACH ROW
EXECUTE FUNCTION create_inventory_entry();

-- subtract invetory size on sale
CREATE FUNCTION update_inventory_on_sale() RETURNS TRIGGER AS $$
BEGIN
    UPDATE inventory
    SET quantity = quantity - NEW.quantity, updated_at = CURRENT_TIMESTAMP
    WHERE product_id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_sale_insert
AFTER INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION update_inventory_on_sale();

ALTER TABLE inventory ADD CONSTRAINT check_positive_quantity CHECK (quantity >= 0);