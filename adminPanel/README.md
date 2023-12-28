# Nader Express Admin Panel

## This is the dashboard where the admin(s) can edit/add new products/categories, track the customers' orders, and check the revenue.

# Tech used:

#### Next.JS 14 server actions, Prisma with MongoDB, Next-Auth (Auth.js), NextUI, Tailwind CSS and Typescript.

# Design Principles:

#### I followed the `SOLID` principles as much as possible.

# Folder Structure:

#### There are 2 grouped routes

- (Public) contains public pages like the login.
- (Protected) contains the rest of the pages.

#### The components folder in the root contains the components that are used in different places.

#### The components that are used in one place are placed in a `_components` folder in the route where they're needed. like the product gallery that is used on the product page only.

#### Every form has its hook that is responsible for managing the form states and submitting to the database.

# Authorization:

#### There's currently only one way to log in (Google)

#### In my database I have a list of emails that are allowed to access the website.

#### Whenever someone tries to access the website, I check if his email is in my database, if so return a session, otherwise, get the hell outta here.

# Admin privileges:

#### The admins that are allowed to access the dashboard have access to:

- View, edit, and add new products/categories

- See all the orders details (the products ordered, the address it was shipped to, the payment method, order placement, and completion `dates`)

- The ability to mark orders as complete.

- View all the comments on the products.

- View all the website users and their details (their names, emails, all the addresses and payment methods they added, all their orders, and comments on products).

- The ability to ban users from the website.

- The ability to delete/add new admins.

---

#### Another thing I'd like to share, when a new order is placed, the admin gets a Whatsapp message with a summary of the order, this ensures faster fulfillment.

![message screenshot](https://res.cloudinary.com/dqkyatgoy/image/upload/v1703711280/Frame_26_hag6un.png)
