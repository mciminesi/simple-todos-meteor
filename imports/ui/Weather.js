import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';

export default class Weather extends Component {
    constructor() {
        super();
        this.state = {
            weather_data: null
        };
    }

    componentDidMount() {
        Meteor.call('getWeather', (error, result) => {
            //console.log(result);
            this.setState({ weather_data: result });
        });
    }

    render() {
        const weather_data = this.state.weather_data;
        if (!weather_data) return <div><br></br>Loading...</div>
        console.log(this.state.weather_data);
        return(
            <div>
                <header className="headerReverse">
                    <h1>
                        {weather_data.name + " "}
                        {weather_data.weather[0].description.toUpperCase()}
                        <img src={"http://openweathermap.org/img/w/" + weather_data.weather[0].icon + ".png"}/>
                        {Math.round(weather_data.main.temp) + "°"}
                    </h1>
                </header>
            </div>
        );
    }
}