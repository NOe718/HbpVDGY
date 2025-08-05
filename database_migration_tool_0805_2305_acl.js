// 代码生成时间: 2025-08-05 23:05:54
// Import necessary modules
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

// Define the migration tool class
class DatabaseMigrationTool {

    // Constructor
    constructor(databasePath) {
        this.db = new sqlite3.cached.Database(databasePath);
    }

    // Function to run migrations
    async migrate() {
        try {
            // Open the database connection
            await new Promise((resolve) => {
                this.db.open();
                resolve();
            });

            // Read migration scripts from the migrations folder
            const migrationFiles = fs.readdirSync('./migrations').filter(file => file.endsWith('.sql'));
            for (const file of migrationFiles) {
                // Read the SQL script
                const sqlScript = fs.readFileSync(path.join('./migrations', file), 'utf8');
                // Execute the SQL script
                await new Promise((resolve, reject) => {
                    this.db.exec(sqlScript, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(`Migration ${file} applied successfully.`);
                            resolve();
                        }
                    });
                });
            }

        } catch (error) {
            console.error('An error occurred during migration:', error);
        } finally {
            // Close the database connection
            this.db.close();
        }
    }
}

// Usage
(async () => {
    try {
        const migrationTool = new DatabaseMigrationTool('./database.db');
        await migrationTool.migrate();
        console.log('Database migration completed.');
    } catch (error) {
        console.error('Failed to run database migration:', error);
    }
})();