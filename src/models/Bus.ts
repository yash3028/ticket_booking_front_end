export interface Bus {
  id: number;
  operator_name: string;
  bus_no: string;
  fromLocation: string;
  toLocation: string;
  departureDate: string
  departure_time: string;
  seats_available: number;
  arrival_time: string;
  price: number;
  aid: number;
  logo: String
}
