import { getPaymentByTicketId } from '../../services/paymentApi';
import { getTicketById } from '../../services/ticketApi';

export default async function VerifyIfPaymentExists(userId, token, setPayed) {
  const ticket = await getTicketById(token);
  const payment = await getPaymentByTicketId(userId, ticket.id, token);
  if(payment) setPayed(true);
}
