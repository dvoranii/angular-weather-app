import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData:any;
  Time:any;

  constructor() { }

  ngOnInit(): void {
    this.WeatherData = {
      main : {},
      isDay: true
    }
   //this.getWeatherData();
   console.log(this.WeatherData);
  }

  getWeatherData(city: string){ 

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=09f2b589e0cc1dcd8e494e89fec44fe7')
    .then(response=>response.json()).then(data=>{this.setWeatherData(data);})

     // this.setWeatherData(data);
  }

  setWeatherData(data:any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celsius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    
  
  }


}
