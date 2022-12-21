import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelsApi';

export default function useHotelVacancies() {
  const token = useToken();

  const {
    data: hotelVacancies,
    loading: hotelVacanciesLoading,
    error: hotelVacanciesError,
    act: gethotelVacancies
  } = useAsync((id) => hotelsApi.getHotelVacancies(token, id), false);

  return {
    hotelVacancies,
    hotelVacanciesLoading,
    hotelVacanciesError,
    gethotelVacancies
  };
}
