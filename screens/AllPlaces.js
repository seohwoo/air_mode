import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFoucsed = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFoucsed) {
      loadPlaces();
      //setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFoucsed]);
  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
