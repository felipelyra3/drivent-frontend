import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import useHotels from '../../hooks/api/useHotels';
import useTicket from '../../hooks/api/useTicket';

import CannotListHotelsMessage from './cannotListHotelsError';
import BookingSelection from './BookingSelection';

export default function Hotels() {
  const { gethotels } = useHotels();
  const { getTicket } = useTicket();
  const [data, setData] = useState(null);
  const [paymentRequired, setPaymentRequired] = useState(true);
  const [cannotListHotels, setCannotListHotels] = useState(false);

  useEffect(() => {
    gethotels()
      .then((resp) => {
        setData(resp);
      })
      .catch((err) => {
        setCannotListHotels(true);
        setCannotListHotels(true);
      });
    getTicket()
      .then(resp => {
        if(resp.TicketType.isRemote) {setPaymentRequired(false);}
      })
      .catch(err => {/*TODO: A pessoa ainda não tem ticket */});
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
      {cannotListHotels? <CannotListHotelsMessage paymentRequired={paymentRequired}/> : <BookingSelection data={data}/>}
    </>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
