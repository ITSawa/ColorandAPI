# Color Generator API

A simple API to generate random colors in different formats (HEX, RGB, RGBA).

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/color-generator-api.git
Install dependencies:
bash

npm install
Usage
Run the server:
bash

node server.js
Access the API at http://localhost:3030.
API Endpoints
GET /api?type={hex|rgb|rgba}
Generate a random color.

Success Response (200):

json

{ "color": "#a3e12f" }
Error Responses:

Invalid type:
json

{ "error": "Invalid type. Use 'hex', 'rgb', or 'rgba'." }
Rate Limit Exceeded (429):
json

{ "error": "Too many requests. Try again later." }
Rate Limiting
500 requests per IP per hour.
