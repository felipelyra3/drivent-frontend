import api from './api';

export async function getRoomsInformations(hotelId, token) {
  const response = await api.get(`/hotels/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const arr = response.data.Rooms;
  for(let i=0; i < arr.length; i++) {
    const resp = await api.get(`booking/${arr[i].id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    response.data.Rooms[i].occupied = resp.data?resp.data.length:0;
  }
  return response.data;
}
