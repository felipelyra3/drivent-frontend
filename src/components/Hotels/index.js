import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import useHotels from '../../hooks/api/useHotels';
import useTicket from '../../hooks/api/useTicket';

import CannotListHotelsMessage from './cannotListHotelsError';

export default function Hotels() {
  const { gethotels } = useHotels();
  const { getTicket } = useTicket();
  const [data, setData] = useState([]);
  const [paymentRequired, setPaymentRequired] = useState(true);
  const [cannotListHotels, setCannotListHotels] = useState(false);

  useEffect(() => {
    gethotels()
      .then((resp) => {
        const hotelsData = resp.data;
        setData(hotelsData);
      })
      .catch((err) => {
        setCannotListHotels(true);
      });
    getTicket()
      .then(resp => {
        if(resp.TicketType.isRemote) {setPaymentRequired(false);}
      })
      .catch(err => {/*TODO: A pessoa ainda não tem ticket */});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return( 
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {cannotListHotels? <CannotListHotelsMessage paymentRequired={paymentRequired}/> : <p>Hotel: Em breve!</p>}
    </>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
