# Zoom Link Expiry

This project is a lightweight Express server that manages a Zoom meeting link. It checks the elapsed time since the link was created and redirects users to the Zoom link if it is still valid. If the link has expired, it informs the user that the link is no longer valid.

## Project Structure

```
zoom-link-expiry
├── src
│   ├── server.js       # Entry point of the application
├── package.json        # npm configuration file
└── README.md           # Project documentation
```

## Getting Started

To set up and run the server, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd zoom-link-expiry
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then run:
   ```
   npm install
   ```

3. **Run the server**:
   Start the server with the following command:
   ```
   npm start
   ```

4. **Access the application**:
   Open your web browser and navigate to:
   ```
   http://localhost:3000/join
   ```

## Usage

- When you access the `/join` route, the server checks how long it has been since the Zoom link was created.
- If the link is still valid (less than 2 hours), you will be redirected to the Zoom meeting.
- If the link has expired, you will see a message indicating that the link is no longer valid.

## License

This project is licensed under the MIT License.