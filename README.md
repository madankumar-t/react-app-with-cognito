# react-app-with-cognito

Step-by-Step: Deploy React App with Cognito to S3 + CloudFront

🧱 Prerequisites
Your React app is built (npm run build)

You have a Cognito User Pool + App Client

Amplify config in src/aws-exports.js is correctly set

Cognito Hosted UI redirect URIs include your domain (e.g., https://app.example.com/)

🔨 Step 1: Build the App
```
npm install
npm run build
``
This creates the static files under /build.

📁 Step 2: Create a Private S3 Bucket

aws s3 mb s3://my-react-ui-bucket

Then:

Block all public access

Uncheck “Static website hosting” (this is private)

🌍 Step 3: Upload React Build to S3
aws s3 sync build/ s3://my-react-ui-bucket --delete

Make sure:

index.html and assets are uploaded

No public access needed

🧭 Step 4: Create CloudFront Distribution
Go to AWS Console → CloudFront → Create Distribution
Origin domain: your S3 bucket (select from dropdown)

Viewer protocol policy: Redirect HTTP to HTTPS

Origin access:

Create OAC (Origin Access Control)

Grant read access to your private S3 bucket

Default root object: index.html

Enable caching, if needed

✅ Note the CloudFront domain it gives you:
E.g. https://d123abcd.cloudfront.net

🌐 Step 5: (Optional) Add Custom Domain + SSL
Register your domain or use Route 53

Request an ACM certificate (in N. Virginia if using CloudFront)

Add your custom domain to CloudFront

Update your Cognito App Client settings:

Add your CloudFront/custom domain to:

✅ Callback URL(s)

✅ Sign out URL(s)

🔐 Step 6: Secure API Gateway with Cognito Authorizer (if not done)
Use the steps I shared earlier to add a Cognito authorizer to all API routes

Use Auth.currentSession() in React to send token


✅ Done! Test Your App
https://your-cloudfront-domain/

You should:

See the Amplify login screen

Log in → be redirected to your app

Access secured /lock, /unlock, etc. via Cognito token

