import { useEffect, useState } from "react";

import axios from "axios";

interface IUserLocation {
  latitude: number | null;
  longitude: number | null;
}

export default function GetUserLocation() {
  // Prepare a constant `ip` with empty data by default
  const [userLocation, setUserLocation] = useState<IUserLocation>({
    latitude: null,
    longitude: null,
  });

  const getIp = async () => {
    axios.get("https://ipapi.co/json/").then((resp) => {
      setUserLocation({
        latitude: resp.data.latitude,
        longitude: resp.data.longitude,
      });
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          getIp();
        }
      );
    } else {
      getIp();
    }
  }, []);

  return userLocation;
}
