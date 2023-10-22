# wakey-wakey
Wakey Wakey is an accountability ninja server built for the sole purpose of checking up on other servers, waking them up if the need be, and notifying their master of their downtime.

## Development Dependencies & Their Software Version
• Nodejs (v18.12.1) <br>
• Express (^4.18.2) <br> 
• Dotenv (^16.3.1) <br>
• Express Async Errors (^3.1.1) <br>
• Pino (^8.16.0) <br>
• Nodemailer (^6.9.6) <br>
• Axios (^1.5.1) <br>

## How to Install And Run Code
• Download the zip or clone repository and open terminal. <br>
• Use npm install to install all dependencies. <br>
• Use the guide.txt and the .env.example to set up your .env file<br>
• Use npm run dev to run the program.

## Deployment Guide
• Configure your build command to "npm run build"
• Configure your start command to "npm start"
• Copy your health route which should be "https://example.com/health" where example.com is your server url.
• Copy out your redeploy hook.
• Create a second service using the same repo and fill in the environmental variables of SERVERS and DEPLOYHOOKS with the health route and deploy hook of the first service.
• Fill in the other environmental variables using guide.txt.
• Copy out the health route and deploy hook of the second service and fill in the first service's environmental variable too.
• Fill in the other environmental variables using guide.txt.
• Deploy both services to keep each other running.
• Finally, copy the health route and deploy hook of your main service or any other service you deploy going forward and fill it in the SERVERS and DEPLOTHOOKS environmental variables of either of the services and deploy your server.

Wakey wakey, those requests won't get themselves to the database and send back a response.