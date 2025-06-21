export interface booking{
  id: number;
  busId: {
    operator_name: string;
    bus_no: number;
    fromLocation: string;
    toLocation: string;
    departureDate: string;
    departure_time: string;
    arrival_time: string;
  };
  seatsBooked: number;
  price: number;
  totalPrice: number;
  createdTime: string;

}