export default function OrganizeTicketTypes(ticketTypes) {
  const organizedTicketTypes = [];

  for(let i = 0; i < ticketTypes.length; i++) {
    if(ticketTypes[i].includesHotel === false && ticketTypes[i].isRemote === false) {
      organizedTicketTypes.push({
        id: ticketTypes[i].id,
        name: 'Ticket Without Hotel',
        includesHotel: false,
        isRemote: false
      });
    } else if(ticketTypes[i].includesHotel === true && ticketTypes[i].isRemote === false) {
      organizedTicketTypes.push({
        id: ticketTypes[i].id,
        name: 'Ticket With Hotel',
        includesHotel: true,
        isRemote: false
      });
    } else if(ticketTypes[i].includesHotel === false && ticketTypes[i].isRemote === true) {
      organizedTicketTypes.push({
        id: ticketTypes[i].id,
        name: 'Ticket Online Without Hotel',
        includesHotel: false,
        isRemote: true
      });
    }
  }

  return organizedTicketTypes;
}
