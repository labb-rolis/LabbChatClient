# LCC - Labb Chat Client

Chat client to interact with the LCH (Labb Chat Hook) using websockets.

# How to use it.

1. Create an account on render.com (or any other 'free' hosting platform)
2. Create a webservice and select `Build and deploy from a Git repository`
3. Paste this repo URL and go to the next step
4. Fill in the following details:
- Give it a name
- Select a region
- Select the `main` branch
- leave `Root directory` empty
- Runtime should be `Node`
- Build command should be `yarn`
- Start command should be `yarn start`
- Select the `Free` option
5. Pay special attention to `Environment variables`. This can easily be changed later on when the service is setup and deployed. Once it's changed, the service will automatically restart and the new environment variables will be in place.
- Key: LCH_URL - Value of the URL to the LCH (Labb Chat Hook)

# What does it do
The application is responsible for handling the chat functionality with LCH using WebSockets.

A WebSocket connection is established with the server using the `io` function from `socket.io-client`. The URL for the server is retrieved from the environment variables.

The `handleOptionChange`, `handleKeyDown`, and `handleRadioButtonClick` functions are event handlers for different user interactions. The `handleOptionChange` function is called when the selected option in the dropdown changes. The `handleKeyDown` function is called when enter is pressed in the input field. If the key is 'Enter', it sends the message. The `handleRadioButtonClick` function is called when a radio button is clicked.

The `useEffect` hooks are used to perform side effects in the component. The first `useEffect` is used to automatically scroll the chat window to the bottom whenever a new message is added to the chat. The second `useEffect` is used to handle incoming server messages.

The `sendMessageToServer` function is a general function for sending messages, while the other functions are for specific types of messages that will use this function to post it back to the server via the socket.

- `sendMessage` is used to form a text/chat message
- `postBack` is used to reply and select a menu item (work queue selection).
- `endConversation` is used when the conversation is ended by the client

Finally, the `return` statement renders the JSX for the component. It includes the dropdown for selecting a customer, the chat window, and the input field for sending messages. The chat window maps over the `chat` state variable to render each message. If the `typing` state variable is true, it also renders a typing indicator.