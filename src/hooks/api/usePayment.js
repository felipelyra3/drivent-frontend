import useAsync from '../useAsync';

import * as paymentApi from '../../services/paymentApi';
import useToken from '../useToken';

export default function usePayment() {
  const token = useToken();
  const {
    loading: paymentLoading,
    error: paymentError,
    act: createPayment,
  } = useAsync((body) => paymentApi.createPayment(body, token));

  return {
    paymentLoading,
    paymentError,
    createPayment,
  };
}
