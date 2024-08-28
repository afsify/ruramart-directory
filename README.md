# Ruramart Directory

Ruramart is a comprehensive e-commerce platform designed to list and manage shops in rural areas. It aims to bridge the gap between rural shops and potential customers by providing an online presence for these shops, showcasing their products, and offering an easy way for customers to find, review, and purchase products. The platform includes features for user registration and management, product listings, reviews, cart management, and order processing.

## Features

- **User Authentication:** Registration, authentication, and role-based access control for users, sellers, and admins.
- **Shop and Product Management:** Detailed listings of shops and their products, including descriptions, prices, and availability.
- **Review System:** Allow users to leave ratings and comments on products.
- **Live Chat:** Engage in real-time conversations with other users and sellers through the live chat feature.
- **Order and Cart Management:** Enable users to add products to their cart, place orders, and track order statuses.
- **Responsive Design:** The platform is designed to provide a seamless experience across various devices.
- **Modular Architecture:** Embrace a modular architecture that enhances flexibility and scalability for future development.

## Tools and Technologies

### Client-Side Libraries

- **React.js:** A JavaScript library for building user interfaces.
- **Redux.js:** A predictable state container for JavaScript apps.
- **TailwindCSS:** A utility-first CSS framework for rapidly building custom designs.
- **Ant Design:** A design system for enterprise-level products.

**HTTP Client:**

- **Axios:** A promise-based HTTP client for making requests to APIs. Axios is used to interact with the server-side API.

### Server-Side Technologies

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A minimal and flexible Node.js web application framework.
- **Socket.io:** Real-time bidirectional event-based communication.
- **MongoDB (Mongoose):** A NoSQL database used to store and retrieve data.
- **JWT Token:** JSON Web Token for user authentication.

## Access the live project

The live project can be accessed at [https://ruramart.vercel.app](https://ruramart.vercel.app)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/afsify/ruramart-directory.git
   ```

2. **Set up environment variables:**

    Create a `.env` file in the root directory or rename the current `.env.sample` file and configure necessary variables for client and server sides.

    **Client ENV**

   ```bash
   VITE_STRIPE_KEY = stripe-payment-key
   VITE_GOOGLE_ID = google-auth-id
   VITE_JITSI_ID = jitsi-meeting-id
   VITE_USER_URL = user-backend-url
   VITE_ADMIN_URL = admin-backend-url
   VITE_CLOUD_NAME = cloudinary-upload-name
   VITE_CHAT_PRESET = cloudinary-chat-preset
   VITE_CLOUD_PRESET = cloudinary-upload-preset
   VITE_PROFILE_PRESET = cloudinary-profile-preset
   ```

    **Server ENV**

   ```bash
   STRIPE_KEY = stripe-secret-key
   MONGO_URL =  mongo-atlas-url
   JWT_SECRET = jwt-secret-code
   GMAIL_USER = smtp-gmail-email
   GMAIL_PASS = smtp-gmail-password
   CLIENT_URL = react-frontend-url
   PRIME_GROUP = prime-group-id
   ```

3. **Navigate to the client directory:**

    Open a terminal in Visual Studio Code and split it into two terminals. In the first terminal, navigate to the client directory:

    ```bash
    cd client
    ```

4. **Install client side dependencies:**

    ```bash
    npm install
    ```

5. **Start the client-side application:**

    ```bash
    npm start
    ```

    The client-side application will be running on [http://localhost:3000](http://localhost:3000)

6. **Navigate to the server directory:**

    In the second terminal, navigate to the server directory:

    ```bash
    cd server
    ```

7. **Install server side dependencies:**

    ```bash
    npm install
    ```

8. **Start the server:**

    ```bash
    npm start
    ```

    The server will be running on [http://localhost:5000](http://localhost:5000)

## API Documentation

Detailed API documentation can be found in the [Ruramart_API_Documentation.docx](https://docs.google.com/document/d/1Xub1hOzsOH57fbqLDgvqjA53btxdjotfpdEZtRpPnu4/edit?usp=sharing)

## Database Design

The database design can be viewed in [Ruramart_DB_Design.pdf](https://drive.google.com/file/d/1tlXYTMhN0ru3ZNhUiQD4RV83unqs5HEu/view?usp=sharing)

## Figma Prototype Design

The Figma prototype design can be viewed [Ruramart_UI](https://www.figma.com/design/4wfCAKoAJAILbrtaqvIl1T/Ruramart?node-id=0-1&t=NQlN96bSPgioJkUh-1)

## Module List

The list of modules can be found in the [Ruramart_Modules.docx](https://docs.google.com/document/d/1ZOPEifunGgwHVBSV_Tkxmlpm-s6_Z84EoV_lEOCU5MY/edit?usp=sharing)

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.
