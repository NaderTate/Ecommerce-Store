![](https://res.cloudinary.com/dqkyatgoy/image/upload/v1703721059/Nader_Express_m5yeva.png)

# Next.JS 14 Full E-commerce store.

## A fully functioning E-commerce store using Next.JS 14, MongoDB, tailwind css, and Typescript.

# Tech Used:

#### Next.JS 14 server actions, Prisma accelerate with MongoDB, Tailwind css, NextUI, and Typescript.

#### For the Authentication, I went with **Next-Auth** for the admin panel and **Clerk** for the store because I wanted to try Clerk.

# How to install and run the project on your machine.

1. Clone the project to your machine using

   `git clone https://github.com/NaderTate/Ecommerce-Store`

2. Go to the store folder and create a new `.env` file and paste the following variables

   ```
   DATABASE_URL=

   WHATSAPP_API_KEY=

   ADMIN_PHONE_NUMBER=

   CLERK_SECRET_KEY=

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

   WEBHOOK_SECRET=
   ```

## Here's how to obtain your own variables:

- **DATABASE_URL:** This is the connection string to your database.

  I'm using Prisma accelerate here, so you must provide the connection string that Prisma gives you, here's how setup prisma accelerate [Docs](https://www.prisma.io/docs/accelerate/getting-started).

  You simply go to [console.prisma.io](https://www.console.prisma.io), create a new project, submit the regular connection string that MongoDB provides you, and use the new string that Prisma will give you.

  You'll need to update the prisma configuration in the project to support caching, but I've already done that.

- **WHATSAPP_API_KEY:** Simply save this number to your phone `+34 644 21 78 06` (the name doen't matter).

  Then send this message to the number on WhatsApp:

  ```
  I allow callmebot to send me messages
  ```

  You will then receive your API key. 🎉

- **ADMIN_PHONE_NUMBER:** This is your mobile number which you got the API for, this is needed because whenever a new order is placed, the Admin (you in this case) will get a WhatsApp message with a summary of the order, and a link to view the rest of the order details on the admin panel.

- **CLERK_SECRET_KEY:** Head to [Clerk.com](https://www.Clerk.com), create a new project, you will get your **CLERK_SECRET_KEY** and **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**.
- **WEBHOOK_SECRET:** In your clerk dashboard, you'll find Webhooks on the left panel, select it and create a new Endpoint.

  paste the following url as the endpoint:

  ```
  https://url/api/webhooks/users
  ```

  #### Note: on localhost, you'll nedd ngrok to get a public link for the project, in production, you can use the site url.

  Select the event `user.created` and click create.

  You'll find on the right `Signing secret`, copy and paste it.

3. Go to the adminPanel folder and create a `.env` file and paste the following:

   ```
   DATABASE_URL=

   GOOGLE_ID=

   GOOGLE_SECRET=

   CLOUDINARY_URL=

   NEXTAUTH_SECRET=
   ```

## How to get your variables:

- **DATABASE_URL:** This isn't the same as the one in the `store`, I'm not using prisma accelerate in the admin panel, so you should use the regular connection string that you get from MongoDB after creating a new project.

- **GOOGLE_ID** , **GOOGLE_SECRET**, I assume you're familiar with this, if not a simple google search will do the job, simply head to [Google console](https://console.cloud.google.com) => `APIs and Services` => `OAuth 2.0 Client IDs`, you'll find `Client ID` and `Client secret` on the right.
- **CLOUDINARY_URL:** This is used for uploading products' and categories' images.

  To obtain this, simply create a [cloudinary](https://cloudinary.com/users/login) account, on the bottom left of the screen you'll find `Product Environment`, copy it and replace the `XXXXX` in this url with the key you just copied

  ```
  https://api.cloudinary.com/v1_1//XXXXX/image/upload
  ```

- **NEXTAUTH_SECRET:** Just a random key that you can generate. eg: 123deeznuts69.

  #### Now you're almost ready to go but you're missing one thing. **DATA**.

  The database that you created is obviously empty, so I put together all my database files, you can download them [Here](https://drive.google.com/file/d/1dUsrMsY8iGC5fwuzExKEgqAV66g_NEX1/view?usp=drive_link), they include all the products, and categories that I added.

  Simply unzip the file and upload all the JSON files inside to your database.

  **NOTE:** make sure to go inside the **Admin** JSON file and add your email address manually to be able to access to admin panel, once you're in, you can add other emails through the admins form.

## Issues that I'm aware of:

- No payment processor added.
  I think I've done the hard part which is building the store itself, there are dozens of tutorials on how to implement stripe, paypal, etc...
- The project is split into 2 separate projects, this is not convenient as any change that I make in a schema, I'll have to make it in both projects.

  don't do this, you can check [Radio Scoop](https://github.com/NaderTate/radioscoop) where I implented both the front and admin dashboard in one project.

- Search autocomplete isn't the best, I tried to optimize it by only fetching the results when the user stops typing for 500ms, but still in some cases a fetch race might occur.

  If there's a way to abort signal in prisma like in the normal api fetch, that would be great.

- Some of the data on the admin dashboard is hard coded and not real.

  I don't have enough "real" data to make a profit graph over the last few months, so I just shoved some random numbers.

---

### You can find additional info about each project (the store, and admin panel) in their own folders.
