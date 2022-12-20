import api from './api';

export async function getRoomsInformations(hotelId, token) {
  const response = await api.get(`/hotels/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.Rooms);
  return response.data;
}
