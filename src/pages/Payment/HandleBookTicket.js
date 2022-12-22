import { toast } from 'react-toastify';
import { createTicket, getTicketTypes } from '../../services/ticketApi';
import GetTicketTypeId from './GetTicketTypeId';

export default async function HandleBookTicket(token, ticketPresential, ticketOnline, ticketWithoutHotel, ticketWithHotel, enrollment, setConfirmation, setTicketId) {
  const userId = enrollment.id;
  const ticketTypes = await getTicketTypes(token);
  const ticketTypeId = GetTicketTypeId(ticketPresential, ticketOnline, ticketWithoutHotel, ticketWithHotel, ticketTypes);
  const body = {
    userId,
    ticketTypeId
  };

  try {
    createTicket(body, token);
    setTicketId(ticketTypeId);
    setConfirmation(true);
  } catch (error) {
    toast('Erro!');
  } 
}
