# this is the MIS Project

1. run admin first
    - in terminal cd into admin directory
    - run command: npm run dev
    - this will run server

2. run strip cli
    - open another terminal 
    - run command: stripe listen --forward-to localhost:3000/api/webhook
    - this will check for payments

3. run store 
    - in another terminal cd into store directory
    - run command: npm run dev
    - this will run frontend