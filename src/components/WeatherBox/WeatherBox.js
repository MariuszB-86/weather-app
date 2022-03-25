import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useState, useCallback } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=47301639df1827b2cd6b74ac82e2ee58&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
        .then(data => {
          setPending(false);
        
          setWeather({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main
          });
        });
        } else {
          setError(true);
          setPending(false);
        }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      { weather && <WeatherSummary {...weather} /> }
      { pending && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;

