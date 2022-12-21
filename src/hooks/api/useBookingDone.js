import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBookingDone() {
  const token = useToken();
  
  const {
    data: bookingDone,
    loading: bookingDoneLoading,
    error: bookingDoneError,
    act: getbooking
  } = useAsync(() => bookingApi.getBooking(token));

  return {
    bookingDone,
    bookingDoneLoading,
    bookingDoneError,
    getbooking
  };
}
