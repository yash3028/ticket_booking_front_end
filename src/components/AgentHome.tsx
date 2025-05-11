import { busdetail } from "../models/Agent.model";
import { post_request } from "../services/Request";
import "../styles/agenthome.css";
function AgentHome() {
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
          <input type="text" className="input-field" name="from" required />
        </label>
        <label>
          To:
          <input type="text" className="input-field" name="to" required />
        </label>
        <label>
          Departure Date:
          <input type="date" className="input-field" name="d_date" required />
        </label>
        <label>
          Departure Time:
          <input
            type="string"
            className="input-field"
            name="departure"
            required
          />
        </label>
        <label>
          Arrival Time:
          <input
            type="string"
            className="input-field"
            name="arrival"
            required
          />
        </label>
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
