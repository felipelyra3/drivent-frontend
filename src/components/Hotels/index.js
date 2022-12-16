import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import useHotels from '../../hooks/api/useHotels';

import { ErrorMessageWrapper } from './ErrorMessageWrapper';

export default function Hotels() {
  const { gethotels } = useHotels();
  const [data, setData] = useState([]);
  const [paymentRequired, setPaymentRequired] = useState(false);

  useEffect(() => {
    gethotels()
      .then((resp) => {
        const hotelsData = resp.data;
        setData(hotelsData);
      })
      .catch((err) => {
        if(err.message === 'Request failed with status code 402') {setPaymentRequired(true);}
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return( 
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {paymentRequired? <ErrorMessageWrapper><div><p>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</p></div></ErrorMessageWrapper>: <p>Hotel: Em breve!</p>}
    </>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
