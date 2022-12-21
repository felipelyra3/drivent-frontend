export default function GetTicketTypeId(ticketPresential, ticketOnline, ticketWithoutHotel, ticketWithHotel, ticketTypes) {
  if(ticketOnline) {
    for(let i = 0; i < ticketTypes.length; i++) {
      if(ticketTypes[i].includesHotel === false && ticketTypes[i].isRemote === true) {
        return ticketTypes[i].id;
      }
    }
  } else if(ticketPresential && ticketWithoutHotel) {
    for(let i = 0; i < ticketTypes.length; i++) {
      if(ticketTypes[i].includesHotel === false && ticketTypes[i].isRemote === false) {
        return ticketTypes[i].id;
      }
    }
  } else if(ticketPresential && ticketWithHotel) {
    for(let i = 0; i < ticketTypes.length; i++) {
      if(ticketTypes[i].includesHotel === true && ticketTypes[i].isRemote === false) {
        return ticketTypes[i].id;
      }
    }
  }
}
