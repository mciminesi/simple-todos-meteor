import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
var request = require('request');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Future = Npm.require('fibers/future');
  });

  Meteor.methods({
    'getWeather' () {
      // Construct the API URL
      var future = new Future();
      var apiKey = Meteor.settings.apiKey;
      var cityId = Meteor.settings.cityId;
      var apiUrl = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=imperial&APPID=" + apiKey;
      // query the API
      request(apiUrl, { json: true },  (error, response, body) => {
        if (error) { 
          return console.log(error); 
        }
      
        future["return"](response.body);
      });
      
      return future.wait();
    },
  });
}