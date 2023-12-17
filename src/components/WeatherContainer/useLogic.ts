import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { useCurrentWeatherQuery } from "../../services/weather/current";

interface IUserLocation {
  latitude: number | null;
  longitude: number | null;
}

export const useLogic = () => {
  const [userLocation, setUserLocation] = useState<IUserLocation>({
    latitude: null,
    longitude: null,
  });

  const getIp = async () => {
    axios
      .get("https://ipapi.co/json/")
      .then((resp) => {
        setUserLocation({
          latitude: resp.data.latitude,
          longitude: resp.data.longitude,
        });
      })
      .catch((error) => {
        toast.error(`${error.message}`);
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
          toast.error(`${error.message} ,We using ip for user location.`);
          getIp();
        }
      );
    } else {
      toast.error(
        "Geolocation is not supported by this browser. We using ip for location."
      );
      getIp();
    }
  }, []);

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useCurrentWeatherQuery(
      { lat: userLocation?.latitude, lon: userLocation?.longitude },
      {
        enabled: !!userLocation.latitude,
      }
    );

  useEffect(() => {
    userLocation.latitude && refetch();
  }, [userLocation, refetch]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
