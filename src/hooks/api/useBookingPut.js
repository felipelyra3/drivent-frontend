import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBookingPut() {
  const token = useToken();
  
  const {
    data: bookingPut,
    loading: bookingPutLoading,
    error: bookingPutError,
    act: putbooking
  } = useAsync((body, bookingId) => bookingApi.putBooking(body, bookingId, token));

  return {
    bookingPut,
    bookingPutLoading,
    bookingPutError,
    putbooking
  };
}
