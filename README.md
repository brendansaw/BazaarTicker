# BazaarTicker

[BazaarTicker](https://bazaarticker.tk) is a website that tracks product data from Hypixel's API, displays data, and emails users when user-defined price conditions are met. This website serves as a visual interface for the virtual in-game stock prices in the Hypixel Skyblock Bazaar market.

## Motivation
This project was created as a personal project by students, to develop skills in PHP, JS, HTML, and CSS and to familiarize ourselves with technologies such as AWS and MySQL. This website is currently being hosted using Amazon Web Services, using a LAMP stack (Amazon Linux).

## Technologies
Last working build with:
* Bootstrap 3
* PHP 7.4.1
* jQuery 1.2.1
* CSS 3
* HTML
* Javascript

## Features
#### Live graphing 
* 200+ items available
* One week of price history
#### Email Tracking
* Can request an email upon an item being sold or bought at a threshold

#### Table of live info
* Precise, to-date buy and sell information:
  * Quantity
  * Price
  * Orders
  
## Code 
* `main.js` contains all code regarding the resizing of display depending on screen size, the search box and which items are shown in the dropdown, the picture display under the graph and the buy and sell information tables.
* `graph.js` contains all code on the display of data in the centre graph
* `validation.js` contains all code on the email form on the right side of the page and sending its data to `serverside/formToServer.php`
* `serverside/`
  * `formToServer.php` contains code that writes information received by `validation.js` to a MySQL database
  * `checkEmails.php` is run every 2 minutes with a cron job set up in the EC2 server to check through any emails in the database to see if their requirements are met and then are sent to the specified email using SMTP from PHPMailer.
  * `getDataFromServer.php` is called by `graph.js` to obtain past information and put it into the graph since Hypixel's Bazaar API does not provide any past data.
  * `tracker.php` is run infinitely in a loop to get data from the Hypixel API and store the data received in a database

## Inspiration
This app is inspired by other Hypixel API trackers like (https://stonks.gg)

## Screenshot
![](https://user-images.githubusercontent.com/52841128/93009946-9468e780-f53b-11ea-98c1-3ff551a6e213.png "bazaarticker.tk screenshot Sep 12, 2020")
