import api from './api';

export async function getPaymentByTicketId(userId, ticketId, token) {
  const response = await api.get(`/payments?userId=${userId}&ticketId=${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createPayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
