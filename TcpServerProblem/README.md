
This project illustrates a problem with accepting sockets using the react-native-tcp library.
When the example is run on an Android device, it works fine. In iOS, the example fails.

The example consists of a simple react native example which shows the number of connections 
and the server state (listening).

1. Installation

npm install

2. Start server

start by running react-native run-android and run-ios. 
For Android It works best if you run on a real device.

3. Run client

npm run start-client <ip-address>

If the example runs successfully, you should see this output:

npm run start-client 192.168.0.21

Add connection  
Add connection  
Add connection  
Add connection  
Add connection  
Destroy clients  
Socket closed  
Socket closed  
Socket closed  
Socket closed  
Socket closed  
Add connection  
Add connection  
Add connection  
Add connection  
Add connection  

When you run it against the ioS simulator, the example fails:

npm run start-client localhost

> TcpServerProblem@0.0.1 start-client /Users/jamescowan/github/react-native-examples/TcpServerProblem
> node ./bin/ExampleTcpClient.js "localhost"

Add connection  
Add connection  
Add connection  
Add connection  
Add connection  
Destroy clients  
Socket closed  
Socket closed  
Socket closed  
Socket closed  
Socket closed  
Socket cannot connect  
Socket cannot connect  
Socket cannot connect  
Socket closed  
Socket closed  
Socket closed  
Socket cannot connect  
Socket closed  
Socket cannot connect  
Socket closed  

4.The problems in iOS

a) Listening fails

The problem seems to be that when a client connection ends, the Tcp server stops listening.

This was fixed by react-native-tcp 3.0.5

b) socket close event not raised in iOS

The socket.on("close") listen on line 14 of ExampleTcpServer.js is not triggered in iOS but works in android:

let server = net.createServer((socket) => {
            console.log("New client");
            bus.sendMessage({ messageType: MessageType_1.default.CONNECTION_OPENED });
            socket.on("data", (data) => {
            });
            socket.on("close", () => {
                console.log("close client ");
                bus.sendMessage({ messageType: MessageType_1.default.CONNECTION_CLOSED });
            });
        }).listen(port);

This was fixed by react-native-tcp 3.0.6




