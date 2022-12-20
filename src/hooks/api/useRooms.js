import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomsApi from '../../services/roomsApi';

export default function useRooms() {
  const token = useToken();
  
  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getrooms
  } = useAsync((hotelId) => roomsApi.getRoomsInformations(hotelId, token));

  return {
    rooms,
    roomsLoading,
    roomsError,
    getrooms
  };
}
