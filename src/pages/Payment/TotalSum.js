export default function TotalSum(ticketPresential, ticketOnline, ticketWithoutHoel, ticketWithHotel, presential, online, withoutHotel, withHotel) {
  if(ticketOnline) {
    return online;
  }
  if(ticketPresential && ticketWithoutHoel) {
    return presential + withoutHotel;
  }
  if(ticketPresential && ticketWithHotel) {
    return presential + withHotel;
  }
  if(ticketOnline && ticketWithoutHoel) {
    return online + withoutHotel;
  }
  if(ticketOnline && ticketWithHotel) {
    return online + withHotel;
  }
}
