import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomsApi from '../../services/roomsApi';

export default function useRooms(hotelId) {
  const token = useToken();
  
  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getrooms
  } = useAsync(() => roomsApi.getRoomsInformations(token, hotelId));

  return {
    rooms,
    roomsLoading,
    roomsError,
    getrooms
  };
}
