# LCC - Labb Chat Client

Chat client to interact with the LCH (Labb Chat Hook) using websockets.

# Prerequisites
The `Labb Chat Hook` should be deployed first. https://github.com/labb-rolis/LabbChatHook/ 

# How to use it.

1. Install/update Node
2. Clone repo and run npm install
3. Start with using the following command
- On Mac/Linux run the following command in a terminal `LCH_URL=https://link-to-your-hook npm start`
- On Windows (cmd.exe) `set LCH_URL=https://link-to-your-hook && npm start`
- On Windows (Powershell) ($env:LCH_URL = "https://link-to-your-hook") -and (npm start)

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
