import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { city } from "../models/Locations.model";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Stack, Button, Snackbar, Box } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

const CitiesList = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [cities, setCities] = useState<city[]>([]);
  const [fromCity, setFromCity] = useState<city | null>(null);
  const [toCity, setToCity] = useState<city | null>(null);

  const isLoggedIn = () => {
    return !!localStorage.getItem("Authorization");
  };

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error" | "info" | "warning">("success");

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackOpen(false);
  };

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
          setCities([]);
        }
      })
      .catch(() => {
        setCities([]);
      });
  }, []);

  const handleSearch = () => {
     if (!isLoggedIn()) {
    showSnackbar("Please login to search buses", "warning");
    return;
  }
    if (!fromCity || !toCity || !date) {
      showSnackbar("Please select From, To, and Date", "warning");
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
          showSnackbar("Buses found!", "success");
          navigate("/bus-result", {
            state: { buses: response.data },
          });
        } else {
          showSnackbar("No buses available for the selected route/date.", "info");
        }
      })
      .catch(() => {
        showSnackbar("An error occurred while searching.", "error");
      });
  };

 
  return (
  <>
    {isLoggedIn() ? (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          bgcolor: "#fff",
          borderRadius: 4,
          boxShadow: 3,
          p: 3,
          mt: 5,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 1000,
          mx: "auto",
        }}
      >
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
          sx={{ minWidth: 200 }}
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
          sx={{ minWidth: 200 }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Travel Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{
              textField: { variant: "outlined", size: "medium" },
            }}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ height: 56, px: 4, bgcolor: "#d32f2f" }}
        >
          Search Buses
        </Button>
      </Box>
    ) : (
      <Stack spacing={2} sx={{ width: 300, mx: "auto", mt: 4 }}>
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
            slotProps={{
              textField: { variant: "outlined", size: "medium" },
            }}
          />
        </LocalizationProvider>

        <Button variant="contained" onClick={handleSearch}>
          Search 
        </Button>
      </Stack>
    )}

    <Snackbar
      open={snackOpen}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleCloseSnackbar}
        severity={snackSeverity}
        elevation={6}
        variant="filled"
      >
        {snackMessage}
      </MuiAlert>
    </Snackbar>
  </>
);

}

export default CitiesList;
