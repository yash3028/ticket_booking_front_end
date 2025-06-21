import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const CitiesList = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [cities, setCities] = useState<city[]>([]);
  const [fromCity, setFromCity] = useState<city | null>(null);
  const [toCity, setToCity] = useState<city | null>(null);

  useEffect(() => {
    axios
      .get("/api/master/locations", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
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

  const handleSearch = () => {
    if (!fromCity || !toCity || !date) {
      console.error("Please select From, To, and Date");
      return;
    }
    const requestData = { 
      from: fromCity.city_code,
      to: toCity.city_code,
      departureDate: dayjs(date).format("YYYY-MM-DD"),
    };
    axios
      .post("/api/master/search-buses", requestData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          alert("true");
          navigate("/bus-result", {
            state: { buses: response.data },
          });
        } else {
          alert("false");
        }
      })
      .catch((error) => {
        console.error("Error searching for buses:", error);
      });
  };
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        disablePortal
        options={cities}
        value={fromCity}
        onChange={(event, newValue) => setFromCity(newValue)}
        getOptionLabel={(option) => option.city || ""}
        isOptionEqualToValue={(option, value) =>
          option.city === value.city && option.city_code === value.city_code
        }
        renderInput={(params) => <TextField {...params} label="From" />}
      />
      <Autocomplete
        disablePortal
        options={cities}
        value={toCity}
        onChange={(event, newValue) => setToCity(newValue)}
        getOptionLabel={(option) => option.city || ""}
        isOptionEqualToValue={(option, value) =>
          option.city === value.city && option.city_code === value.city_code
        }
        renderInput={(params) => <TextField {...params} label="To" />}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Travel Date"
          value={date}
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
