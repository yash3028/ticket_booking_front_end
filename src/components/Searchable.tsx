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
  const [date, setDate] = useState<Dayjs | null>(null);
  const [cities, setCities] = useState<city[]>([]);

  const handleSearch = () => {
    console.log("Search clicked for:", date);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8081/locations", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authentication"),
        },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setCities(response.data);
        } else {
          console.warn("Unexpected response format:", response.data);
          setCities([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
        setCities([]);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        disablePortal
        options={cities}
        getOptionLabel={(option) => option.city || ""}
        isOptionEqualToValue={(option, value) =>
          option.city === value.city && option.city_code === value.city_code
        }
        renderInput={(params) => <TextField {...params} label="From" />}
      />
      <Autocomplete
        disablePortal
        options={cities}
        getOptionLabel={(option) => option.city || ""}
        isOptionEqualToValue={(option, value) =>
          option.city === value.city && option.city_code === value.city_code
        }
        renderInput={(params) => <TextField {...params} label="To" />}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Travel Date"
          onChange={(newValue) => setDate(newValue)}
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
