import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import { resolve } from 'url';
import { rejects } from 'assert';
var request = require('request');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    'getWeather' () {
      // Construct the API URL
      var cityId = Meteor.settings.cityId;
      var apiKey = Meteor.settings.apiKey;
      var apiUrl = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=imperial&APPID=" + apiKey;

      const promise = new Promise((resolve, reject) => {
        request(apiUrl, { json: true },  function(error, response) {
            if (error) {
              reject(error);
            } else {
              resolve(response.body);
            }
          });
        })
        .catch((e) => {
          throw new Meteor.Error('500', e.message);
        });
      
      return promise.await();
    },
  });
}