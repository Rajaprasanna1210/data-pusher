# data-pusher
Nodejs interview assessment
# Data Pusher - Node.js Developer Assessment

This is an Express.js application that receives JSON data via POST and forwards it to multiple configured destinations per account using webhooks. It uses a SQLite database with raw SQL queries (no ORM).

---

## Features

- Account Management (CRED)
- Destination Management (CRED)
- JSON Data Handler with Token Authentication
- SQLite DB with auto schema + sample data
- Auto-forward JSON payloads to configured webhooks
- Minimal dependencies, lightweight setup

---

## Project Structure

data-pusher/
db/
 database.js # SQLite connection + table + sample data
controllers/ # Business logic
  accountController.js
  destinationController.js
  dataHandlerController.js
routes/ # REST API routes
 accountRoutes.js
 destinationRoutes.js
 dataHandler.js
.env # Environment config
package.json
 Utilities #- POSTMAN collection
server.js # Entry point


---

## Setup Instructions

1. **Clone the repository:**
terminal
   git clone https://github.com/Rajaprasanna1210/data-pusher.git
   cd data-pusher
Install dependencies:
npm install
Set up environment variables:
Create a .env file based on the template below.
Run the application:
node server.js
Your server will be running at: http://localhost:3000


## Utilities

This project includes a `utilities/` folder that contains helpful tools for testing the APIs.

### Postman Collection

- File: `utilities/DataPusher.postman_collection.json`
- Description: A ready-to-import Postman collection with all available endpoints, sample headers, and request bodies.
- How to Use:
  1. Open Postman.
  2. Click on **Import**.
  3. Select the `DataPusher.postman_collection.json` file.
  4. Run the requests in the collection as needed.

This helps you test:
- Account and Destination CRED operations
- Fetching destinations for an account
- Posting to `/server/incoming_data` with proper headers and payload
