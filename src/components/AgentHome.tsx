import { useEffect, useState } from "react";
import { busdetail } from "../models/Agent.model";
import { get_request, post_request } from "../services/Request";
import "../styles/agenthome.css";
import { LocalizationProvider, MobileTimePicker, TimeField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
function AgentHome() {
  const [cities,setCities] = useState<{id:number;city_code:string}[]>([]);
  const [departureTime, setDepartureTime] = useState<Dayjs | null>(dayjs());
  const [arrivalTime, setArrivalTime] = useState(dayjs());
  useEffect(() => {
    (async () => {
      try {
        const res = await get_request("/api/master/locations");
        setCities(
          res.data.map((c: { id: number; city_code: string }) => ({
            id: c.id,
            city_code: c.city_code,
          }))
        );
      } catch (err) {
        console.error("Cannot load cities", err);
      }
    })();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const operator_name = (e.target as HTMLFormElement).elements.namedItem(
      "name"
    ) as HTMLInputElement;
    const bus_no = (e.target as HTMLFormElement).elements.namedItem(
      "busNo"
    ) as HTMLInputElement;
    const From = (e.target as HTMLFormElement).elements.namedItem(
      "from"
    ) as HTMLInputElement;
    const To = (e.target as HTMLFormElement).elements.namedItem(
      "to"
    ) as HTMLInputElement;
    const d_date = (e.target as HTMLFormElement).elements.namedItem(
      "d_date"
    ) as HTMLInputElement;
    const departure = (e.target as HTMLFormElement).elements.namedItem(
      "departure"
    ) as HTMLInputElement;
    const arrival = (e.target as HTMLFormElement).elements.namedItem(
      "arrival"
    ) as HTMLInputElement;
    const seats = (e.target as HTMLFormElement).elements.namedItem(
      "seats"
    ) as HTMLInputElement;
    const fare = (e.target as HTMLFormElement).elements.namedItem(
      "price"
    ) as HTMLInputElement;
    console.log(departure)
    const details: busdetail = {
      operator_name: operator_name.value,
      bus_no: bus_no.value,
      fromLocation: From.value,
      toLocation: To.value,
      departureDate: d_date.value,
      departure_time: departure.value,
      arrival_time: arrival.value,
      seats_available: seats.value,
      price: fare.value,
    };
    const response = await post_request("/api/agent/save_bus", details);
    console.log(response);
  };
  return (
    <div className="agent-home">
      <h2>Agent Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Operator Name:
          <input type="text" className="input-field" name="name" required />
        </label>
        <label>
          Bus No:
          <input type="text" className="input-field" name="busNo" required />
        </label>
        <label>
          From:
          <select className="input-field" name="from" required>
          <option value="">
            Select From
          </option>
          {cities.map(c=>(
            <option key={c.id} value={c.city_code}>{c.city_code}</option>
          ))}
          </select>
        </label>
        <label>
          To:
           <select className="input-field" name="to" required>
          <option value="">
            Select To
          </option>
          {cities.map(c=>(
            <option key={c.id} value={c.city_code}>{c.city_code}</option>
          ))}
          </select>
        </label>
        <label>
          Departure Date:
          <input type="date" className="input-field" name="d_date" required />
        </label>

       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label>
        Departure Time:
        <MobileTimePicker
          label="Departure Time"
          value={departureTime}
          name="departure"
          onChange={(newValue) => setDepartureTime(newValue)}
          openTo="minutes" 
          views={["hours", "minutes"]} 
          ampm={false} 
          slotProps={{
            textField: { fullWidth: true },
          }}
        />
      </label>
    </LocalizationProvider>
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <label>
        Arrival Time:
        <MobileTimePicker
          label="Departure Time"
          name="arrival"
          value={arrivalTime}
          onChange={(newValue) => setDepartureTime(newValue)}
          openTo="minutes" 
          views={["hours", "minutes"]} 
          ampm={false} 
          slotProps={{
            textField: { fullWidth: true },
          }}
        />
      </label>
    </LocalizationProvider>

        <label>
          Seats Available:
          <input type="number" className="input-field" name="seats" required />
        </label>
        <label>
          Price:
          <input type="number" className="input-field" name="price" required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default AgentHome;
