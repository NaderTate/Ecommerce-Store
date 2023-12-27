# Nader Express Store

## This is the store front where users can browse the products and place orders.

# Tech used:

#### Next.JS 14 server actions, Prisma accelerate with MongoDB, Tailwind css, NextUI, and Typescript

# Design Priciples:

#### I followed the `SOLID` principles as much as possible.

# Folder Structure:

#### There are 3 grouped routes:

- (auth) for the sign in / sign up pages
- (public) for the public pages that don't require login like the product / categories page.
- (protected) for the pages that require login like the account, cart, checkout, etc...

#### The components folder in the root contains the components that are used in different places.

#### The components that are used in one place are placed in a `_components` folder in the route where they're needed. like the product gallery that is used in the product page only.

#### Same for any hooks and utility functions, the `hooks` folder at the root contains only 1 hook that is used in both the `search` page to get the search results and the `category` page to get the category products.

#### Any forms like the user details or the user address forms have separate hooks in a `_hooks` folder at the same level.

#### These hooks are resposible for managing the form states and submitting to the database, this way the form component only contains the form elements, making the code way cleaner.

#### Any utility functions are placed in **`utils`** file where they're needed.

# Server Actions:

#### I placed the main server actions like adding items to cart, placing orders, updating the wishlist, etc... in the **`actions`** folder at the project root.

#### Other functions that are more specific like getting related products or checking if the user has bought a product are placed in a `utils` file in the route where they're used.

# Webhooks:

#### Only 1 webhook is used here to sync `Clerk` data with my database.

#### Meaning, whenever a new user signs up, a new record is created at `Clerk` database, but I want to create another record in my own database with the user's `name`, `email`, and `image`, and whenever the user adds an item to the cart or places an order, this will be stored in my database.

#### The way this webhook works is that it listens to the `user.created` event from `clerk`, and whenever this event occurs, a server action is executed to submit the user's data in my DB.
