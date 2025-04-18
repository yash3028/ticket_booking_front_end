import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { city } from "../models/Locations.model";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
const CitiesList = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, setDate] = useState<Dayjs | null>(null);
  const [cities, setCities] = useState<city[]>([]);

  const handleSearch = () => {
    console.log("Search button clicked");
    // Add your search logic here
  };

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
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        disablePortal
        options={cities.map((city) => city)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Place" />}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Travel Date"
          onChange={(newValue: Dayjs | null) => setDate(newValue)}
          slotProps={{ textField: { variant: "outlined", size: "medium" } }}
        />
      </LocalizationProvider>
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
};

export default CitiesList;
