# News Web App
This News Reader Website is made using Next Js, Node Js, Tailwind CSS and Firbase. It contains Authentication and Sign Up Functionality and displays the latest news fetched from `https://newsapi.org/` It also let's you add your favourite news and stores it so that you can read it the next time you login. You can get your News API key for free from `https://newsapi.org/`

## This has been deployed on Vercel but the News API only allows to fetch information from it on the local machine and hence that is why it is not fetching News articles on the Vercel deployed link. 
`https://news-web-app-six.vercel.app`

# Getting Started 
Follow these instructions to set up and run the website on your local machine.

# Prerequisites
Make sure you have the following packages installed: 

- Node Js (Latest Version)
- Next Js
- Tailwind Css
- Firebase

# Installation 
1. Clone this repository to your local machine:

`git clone https://github.com/Aryankax/News-Web-App.git`

2. Navigate to the project directory:
`cd News-Web-App`

3. Instal the required dependencies:
`npm install`

4. Now you have to set up the environment variables:
make a `.env.local` file inside your main folder (News-Web-App) and add the following env variables to run the website
- `NEXT_PUBLIC_FIREBASE_API_KEY = Your Firebase API Key goes Here`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = Your Firebase auth domain goes here`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID = Firebase Project ID goes here`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET =  Firebase storage bucket goes here`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = Firebase Messaging Sender ID goes here`
- `NEXT_PUBLIC_FIREBASE_API_ID = Firebase API ID goes here`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = Firebase Measurement ID goes here`
- `NEXT_PUBLIC_NEWS_API_KEY = Your News API Key goes here`

5. Run the website using:
`npm run dev`

6. Keep your port 3000 free as it will run on that:
`localhost:3000`

The website should be now up and running locally.

# Screenshots of the website
- Welcome page (First page)
<img width="960" alt="image" src="https://github.com/Aryankax/News-Web-App/assets/113718466/3d54d499-c531-4483-8a3e-25933575ae3e">
- Sign Up Page
<img width="960" alt="image" src="https://github.com/Aryankax/News-Web-App/assets/113718466/56a6185e-6333-4207-a79d-d5fdcea09cf6">
- Sign In Page
<img width="960" alt="image" src="https://github.com/Aryankax/News-Web-App/assets/113718466/ea7ce68d-87ba-43e4-8cfe-8974b293616a">
- Main Home Page
<img width="942" alt="image" src="https://github.com/Aryankax/News-Web-App/assets/113718466/c9e89996-4b26-4de4-b863-22e2f77978f9">
<img width="941" alt="image" src="https://github.com/Aryankax/News-Web-App/assets/113718466/2fe842b0-29d9-41de-bd09-03b011ff66a6">
- Favourites
<img width="941" alt="image" src="https://github.com/Aryankax/News-Web-App/assets/113718466/ad699717-9739-4067-abb2-ce495c2a61a8">












