## 1. What is bcrypt?

bcrypt is a password hashing function.
It is used to securely store passwords in databases.
It is not encryption; it’s hashing, which means it’s a one-way function. Once hashed, you cannot get the original password back.
It adds salt (random data) automatically, which helps protect against rainbow table attacks.
It’s designed to be slow, making brute-force attacks harder.

## 2. How bcrypt works

bcrypt works in three main steps:

# Step 1: Salting
A salt is a random string added to the password before hashing.
Password: mypassword
Salt: a1b2c3d4
Combined: mypassworda1b2c3d4
Even if two users have the same password, their hashes will be different because of unique salts.

# Step 2: Hashing
bcrypt uses a key setup algorithm called Eksblowfish (based on Blowfish cipher).
The password + salt is hashed multiple times (configurable cost factor).
Input: mypassword + salt
Hash output: $2b$12$KIXl1n1N6e1R7Flxg6C6hOEb6Lw6W0GHJ9VRkIx4KzpC0nN8J6K9O

# Step 3: Storing

The hash contains:
Version ($2b$)
Cost factor (12) – determines how slow hashing is
Salt + hash (the rest)
Example:
$2b$12$KIXl1n1N6e1R7Flxg6C6hOEb6Lw6W0GHJ9VRkIx4KzpC0nN8J6K9O

# Step 4: Verification
When a user logs in, bcrypt doesn’t decrypt the hash.
It takes the entered password, combines it with the stored salt, hashes it, and compares it to the stored hash.
If they match → password is correct.

# 3. Features of bcrypt
Slow hashing: configurable work factor (cost) makes brute-force attacks harder.
Automatic salting: no need to manage salts manually.
Adaptive: over time, you can increase the cost factor to maintain security.
Resistant to rainbow table attacks and dictionary attacks.



# example
## how it hashesh
# 1. Registration: Hashing the password
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(password, salt);

Generate salt
const salt = await bcrypt.genSalt(10);
genSalt(10) generates a random string (salt).
# 10 is the cost factor, meaning bcrypt will perform 2^10 (1024) hashing rounds.

Purpose: even if two users have the same password, the hash will be different because the salt is random.
Password: "mypassword123"
Salt generated: $2b$10$H9vKjT5sW6dZxFqU9aP9aO
Hash the password with salt
const hashPassword = await bcrypt.hash(password, salt);
bcrypt combines the password + salt, then applies multiple rounds of hashing.
Result is a secure hashed password stored in your database.
Example hash stored in DB:
$2b$10$H9vKjT5sW6dZxFqU9aP9aOq1Jp0QkXfQ8YfL3t6kPZq9D7FZk1Qy




## how it compare 
# const isMatch = await bcrypt.compare(password, doctor.password);

password → the plain text password entered by the user at login.
Example: "mypassword123"

doctor.password → the hashed password stored in the database.
Example: $2b$10$H9vKjT5sW6dZxFqU9aP9aOq1Jp0QkXfQ8YfL3t6kPZq9D7FZk1Qy

What bcrypt.compare() does internally:
Extracts the salt and cost factor from doctor.password (the stored hash).
From $2b$10$H9vKjT5sW6dZxFqU9aP9aOq1Jp0QkXfQ8YfL3t6kPZq9D7FZk1Qy:
Cost factor: 10

Salt: $2b$10$H9vKjT5sW6dZxFqU9aP9aO
Hashes the entered password ("mypassword123") using the same salt and cost factor.
Compares the newly generated hash with the stored hash (doctor.password).
If the hashes are identical → password is correct.

If the hashes are different → password is wrong.
Important:
The comparison is NOT plain text vs. hash.
It’s hashed password vs. stored hash.
bcrypt handles the salting and hashing internally during compare