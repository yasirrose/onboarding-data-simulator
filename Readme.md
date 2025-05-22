# Onboarding Data Simulator

This project simulates customer onboarding data and provides SQL queries to analyze this information.

## Installation and Usage

### Prerequisites
- Node.js (version >= 12)
- npm or yarn package manager

### Setup Instructions
1. Clone the repository:
   ```bash
   cd onboarding-data-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Running the server:
   - For production:
     ```bash
     npm start
     ```
   - For development (with auto-restart):
     ```bash
     npm run dev
     ```

4. The server will start on the port defined in the config/constants.js file.

## Database Setup

### Creating the Customer Table

```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Populating with Sample Data

```sql
INSERT INTO customers (firstName, lastName, email, created_at) VALUES
('John', 'Doe', 'john.doe@gmail.com', '2025-01-15 09:30:00'),
('Jane', 'Smith', 'jane.smith@outlook.com', '2025-02-20 14:45:00'),
('Alex', 'Johnson', 'alex.j@gmail.com', '2025-03-05 11:20:00'),
('Maria', 'Garcia', 'maria.g@yahoo.com', '2025-03-12 16:10:00'),
('Ahmed', 'Hassan', 'ahmed.h@gmail.com', '2025-01-30 08:15:00'),
('Amanda', 'Lee', 'amanda.lee@gmail.com', '2025-04-18 13:25:00'),
('Robert', 'Williams', 'rob.w@company.com', '2025-02-05 10:05:00'),
('Alice', 'Brown', 'alice.b@gmail.com', '2025-04-22 15:40:00'),
('David', 'Miller', 'david.m@outlook.com', '2025-01-10 09:50:00'),
('Anna', 'Taylor', 'anna.t@yahoo.com', '2025-05-01 12:30:00'),
('James', 'Anderson', 'james.a@gmail.com', '2025-03-25 14:15:00'),
('Sarah', 'Wilson', 'sarah.w@gmail.com', '2025-05-10 16:55:00'),
('Michael', 'Thomas', 'michael.t@company.com', '2025-02-28 11:40:00'),
('Lisa', 'Martin', 'lisa.m@gmail.com', '2025-04-05 09:20:00'),
('Andrew', 'Clark', 'andrew.c@outlook.com', '2025-05-15 10:35:00'),
-- Sample with duplicate email
('John', 'Smith', 'john.doe@gmail.com', '2025-05-18 17:10:00');
```

## Analysis Queries

### 1. Retrieve 10 Most Recently Onboarded Customers

Displays the most recently added customers in descending order by creation date.

```sql
SELECT 
    id,
    firstName, 
    lastName, 
    email, 
    created_at 
FROM customers
ORDER BY created_at DESC
LIMIT 10;
```

### 2. Filter Customers with Gmail Addresses

Lists all customers who use Gmail as their email provider.

```sql
SELECT 
    id, 
    firstName, 
    lastName, 
    email, 
    created_at
FROM customers
WHERE email LIKE '%@gmail.com'
ORDER BY lastName, firstName;
```

### 3. Count Customers Created Per Month in 2025

Generates a monthly breakdown of customer registrations throughout 2025.

```sql
SELECT 
    EXTRACT(MONTH FROM created_at) AS month,
    TO_CHAR(created_at, 'Month') AS month_name,
    COUNT(*) AS customer_count
FROM customers
WHERE created_at BETWEEN '2025-01-01' AND '2025-12-31'
GROUP BY EXTRACT(MONTH FROM created_at), TO_CHAR(created_at, 'Month')
ORDER BY month;
```

### 4. Find Duplicate Email Addresses

Identifies email addresses that appear more than once in the database.

```sql
SELECT 
    email,
    COUNT(*) AS occurrence_count
FROM customers
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY occurrence_count DESC, email;
```

### 5. Find Customers with First Name Starting with "A"

Retrieves all customers whose first name begins with the letter "A".

```sql
SELECT 
    id,
    firstName,
    lastName,
    email,
    created_at
FROM customers
WHERE firstName LIKE 'A%'
ORDER BY lastName, firstName;
```