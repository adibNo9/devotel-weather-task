import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [errorLocation, setErrorLocation] = useState("");

  const success = useCallback((pos: any) => {
    var crd = pos.coords;

    setUserLocation({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
  }, []);
  const errors = useCallback((err: any) => {
    toast.error(
      "Geolocation is not supported by this browser. We using ip for location.",
      { duration: 4000 }
    );
    getIp();
  }, []);
  const options = useMemo(
    () => ({
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0,
    }),
    []
  );

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
        setErrorLocation(error.message);
      });
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
              //If granted then you can directly call your function here
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
              //If prompt then the user will be asked to give permission
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
              getIp();
            }
          });
      } else {
        getIp();
      }
    };

    getLocation();
  }, [success, errors, options]);

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
    errorLocation,
  };
};
