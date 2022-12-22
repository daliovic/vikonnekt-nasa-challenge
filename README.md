# NASA Near Earth Objects App

Welcome to the NASA Near Earth Objects app! This app was built using React, with support for TypeScript. The project was initialized with Vite.

<br>

## :rocket: Getting Started

To get started, clone the repository and install the dependencies:

```
git clone https://github.com/daliovic/vkonnekt-nasa-challenge.git
cd vkonnekt-nasa-challenge
npm install
```
Once the dependencies are installed, you can start the development server by running:

```
npm run dev
```
This will start the development server and open the app in your default browser.

## :telescope: Features

The main feature of this app is the ability to fetch Near Earth Objects (NEOs) data from the NASA API using an async function **`useAxios`**, a custom hook that performs an HTTP GET request to the NASA's NEO API to retrieve today's NEOs. This hook is called in a **`useEffect`** hook, which allows the app to retrieve the data as soon as the component mounts.

**`formattedNEOs`** is an array of NEOs with their ***name***, ***min*** and ***max diameter***, and ***orbital body***.

**`filteredNEOs`** is a subset of **`formattedNEOs`** based on the selected orbital body in the filter form.

The app also includes a **`filter`** component with a select element that allows the user to filter the displayed NEOs by their orbital body. The options for this select element are generated by looping over the distinct values of the orbital bodies of the **`formattedNEOs`** array using the Set object and the map array method.

A simple checkbox has been added to toggle a table view of the data. This table view is created in a separate **`TableView`** component, allowing for easy reuse and customization of the table. If the checkbox is not checked, the data is displayed in a bar chart using the **`BarChart`** component.

The app also makes use of TypeScript, which provides static typing and helps to catch errors before the code is even run.

## :open_file_folder: Folder Structure
The project is organized into the following folders:

- **`src`**: Contains the source code for the app.
  - **`components`**: Contains the React components for the app.
  - **`hooks`**: Contains custom hooks used throughout the app.
  - **`utils`**: Contains utility functions used throughout the app.
