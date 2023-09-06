**Fuber (Fairfield Uber) - Academic Project**

Fuber is a React Native-based academic project that replicates the functionality of a ride-sharing application like Uber. It utilizes various technologies and APIs to provide a comprehensive user experience. This README file will guide you through the project's features, setup, and usage.

**Features**
Fuber offers the following key features:

User Authentication: Fuber uses JWT (JSON Web Tokens) for secure user authentication, ensuring that only registered users can access its services.

Real-Time Location Tracking: Fuber incorporates websockets to enable real-time communication with the location and cab request services. Users can track the location of their cab in real-time as it approaches their pickup point.

Google Maps Integration: Google Maps APIs are integrated to provide users with a visual representation of available cabs, estimated ride fares, and the ability to select pickup and drop-off locations on the map.

Cab Booking and Management: Users can request cabs, view available drivers, and manage their bookings directly from the app.

Payment Processing: Although not implemented in this academic project, Fuber can be extended to include payment processing, allowing users to pay for their rides securely.

**Technologies Used**
Fuber is developed using the following technologies:

React Native: A popular JavaScript framework for building mobile applications that ensures cross-platform compatibility.

Google Maps APIs: Integration of Google Maps APIs for mapping and location services.

Websockets: WebSocket technology for real-time communication with the location and cab request services.

JWT (JSON Web Tokens): JWT is used for user authentication, ensuring secure access to the app.

**Installation**
To set up and run Fuber on your local machine, follow these steps:

Clone this repository to your local machine:

git clone https://github.com/bodibileg/sa-project-uber

Navigate to the project directory:

cd Uber

Install the required dependencies using npm or yarn:

npm install
# or
yarn install

Configure the necessary environment variables for Google Maps API keys and other credentials.

Start the React Native development server:

npm react-native run-ios
# or
yarn react-native run-ios

Connect your mobile device or emulator to run the app.

**Usage**
Once you have the Fuber app up and running, you can:

Register and log in to your account.
Use the map interface to select your pickup and drop-off locations.
Request a cab and track its real-time location.
Manage your ride bookings.
