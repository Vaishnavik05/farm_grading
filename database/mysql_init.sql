-- Farm Produce Quality Grading & Wholesale Procurement Workflow System
-- MySQL 8.x initialization script

CREATE DATABASE IF NOT EXISTS farm_db;
USE farm_db;

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255),
    phone_number VARCHAR(20),
    role VARCHAR(30) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (role IN ('ADMIN', 'FARMER', 'QUALITY_INSPECTOR', 'PROCUREMENT_OFFICER'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS produce_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS farm_produce (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    quantity DECIMAL(12,2) NOT NULL,
    unit_type VARCHAR(20) NOT NULL,
    harvest_date DATE,
    produce_status VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_farm_produce_farmer FOREIGN KEY (farmer_id) REFERENCES users(id),
    CONSTRAINT fk_farm_produce_category FOREIGN KEY (category_id) REFERENCES produce_categories(id),
    CHECK (quantity > 0),
    CHECK (unit_type IN ('KG', 'QUINTAL', 'TON')),
    CHECK (produce_status IN ('SUBMITTED', 'UNDER_INSPECTION', 'GRADED', 'REJECTED'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quality_grades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    grade_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    min_score INT NOT NULL,
    max_score INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (min_score >= 0 AND max_score <= 100 AND min_score <= max_score)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quality_inspections (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    produce_id BIGINT NOT NULL,
    inspector_id BIGINT NOT NULL,
    quality_score INT NOT NULL,
    grade_id BIGINT,
    inspection_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inspection_status VARCHAR(20) NOT NULL DEFAULT 'ASSIGNED',
    CONSTRAINT fk_quality_inspections_produce FOREIGN KEY (produce_id) REFERENCES farm_produce(id),
    CONSTRAINT fk_quality_inspections_inspector FOREIGN KEY (inspector_id) REFERENCES users(id),
    CONSTRAINT fk_quality_inspections_grade FOREIGN KEY (grade_id) REFERENCES quality_grades(id),
    CHECK (quality_score BETWEEN 0 AND 100),
    CHECK (inspection_status IN ('ASSIGNED', 'INSPECTED', 'APPROVED', 'REJECTED'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS procurement_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    produce_id BIGINT NOT NULL,
    officer_id BIGINT NOT NULL,
    procurement_quantity DECIMAL(12,2) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    total_amount DECIMAL(14,2) GENERATED ALWAYS AS (procurement_quantity * unit_price) STORED,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(20) NOT NULL DEFAULT 'CREATED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_procurement_orders_produce FOREIGN KEY (produce_id) REFERENCES farm_produce(id),
    CONSTRAINT fk_procurement_orders_officer FOREIGN KEY (officer_id) REFERENCES users(id),
    CHECK (procurement_quantity > 0),
    CHECK (unit_price > 0),
    CHECK (order_status IN ('CREATED', 'APPROVED', 'COMPLETED', 'CANCELLED'))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS produce_inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    available_quantity DECIMAL(12,2) NOT NULL DEFAULT 0,
    last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    inventory_status VARCHAR(20) NOT NULL DEFAULT 'OUT_OF_STOCK',
    CONSTRAINT fk_produce_inventory_category FOREIGN KEY (category_id) REFERENCES produce_categories(id),
    CONSTRAINT uq_produce_inventory_category UNIQUE (category_id),
    CHECK (available_quantity >= 0),
    CHECK (inventory_status IN ('AVAILABLE', 'LOW_STOCK', 'OUT_OF_STOCK'))
) ENGINE=InnoDB;

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_farm_produce_farmer ON farm_produce(farmer_id);
CREATE INDEX idx_farm_produce_category ON farm_produce(category_id);
CREATE INDEX idx_farm_produce_status ON farm_produce(produce_status);
CREATE INDEX idx_quality_inspections_produce ON quality_inspections(produce_id);
CREATE INDEX idx_quality_inspections_inspector ON quality_inspections(inspector_id);
CREATE INDEX idx_quality_inspections_status ON quality_inspections(inspection_status);
CREATE INDEX idx_procurement_orders_produce ON procurement_orders(produce_id);
CREATE INDEX idx_procurement_orders_officer ON procurement_orders(officer_id);
CREATE INDEX idx_procurement_orders_status ON procurement_orders(order_status);

-- Seed mandatory grade ranges used by scoring workflow.
INSERT INTO quality_grades (grade_name, description, min_score, max_score)
VALUES
    ('Grade A', 'Excellent quality produce', 85, 100),
    ('Grade B', 'Good quality produce', 60, 84),
    ('Grade C', 'Below standard produce', 0, 59)
ON DUPLICATE KEY UPDATE
    description = VALUES(description),
    min_score = VALUES(min_score),
    max_score = VALUES(max_score);

INSERT INTO produce_categories (category_name, description)
VALUES
    ('Wheat', 'Cereal grain'),
    ('Rice', 'Staple grain'),
    ('Corn', 'Maize crop'),
    ('Tomato', 'Vegetable crop'),
    ('Potato', 'Root vegetable')
ON DUPLICATE KEY UPDATE
    description = VALUES(description);

-- Helpful report queries (run directly when needed)
-- 1) JOIN query: produce with latest inspection and assigned grade
-- SELECT fp.id AS produce_id, pc.category_name, fp.quantity, fp.unit_type, fp.produce_status,
--        qi.quality_score, qi.inspection_status, qg.grade_name
-- FROM farm_produce fp
-- JOIN produce_categories pc ON pc.id = fp.category_id
-- LEFT JOIN quality_inspections qi ON qi.produce_id = fp.id
-- LEFT JOIN quality_grades qg ON qg.id = qi.grade_id;

-- 2) Aggregate query: total procurement value per category
-- SELECT pc.category_name,
--        SUM(po.procurement_quantity) AS total_procured_qty,
--        SUM(po.total_amount) AS total_procurement_value
-- FROM procurement_orders po
-- JOIN farm_produce fp ON fp.id = po.produce_id
-- JOIN produce_categories pc ON pc.id = fp.category_id
-- GROUP BY pc.category_name
-- ORDER BY total_procurement_value DESC;
