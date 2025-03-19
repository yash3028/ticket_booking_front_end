import { useEffect, useState } from "react";
import axios from "axios";
import { city } from "../models/Locations.model";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const CitiesList = () => {
  const [cities, setCities] = useState<city[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/master_data/locations", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authentication"),
        },
      })
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Autocomplete
      disablePortal
      options={cities}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
};

export default CitiesList;
