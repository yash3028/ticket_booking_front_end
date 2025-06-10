export interface Requests{
        id: number;
        operator_name: string,
        bus_no: number,
        fromLocation: string,
        toLocation: string,
        departureDate: string,
        departure_time: string,
        arrival_time: string,
        seats_available: number,
        price: number,
}