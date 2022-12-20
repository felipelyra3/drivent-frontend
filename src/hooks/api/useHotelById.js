import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelsApi';

export default function useHotel() {
  const token = useToken();

  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: gethotel
  } = useAsync((id) => hotelsApi.getHotelById(token, id), false);

  return {
    hotel,
    hotelLoading,
    hotelError,
    gethotel
  };
}
