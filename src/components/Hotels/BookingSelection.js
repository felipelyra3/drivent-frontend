import { Hotels, HotelsWrapper } from './HotelsSelectionWrapper';
import HotelTemplade from './HotelCardTemplade';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

export default function BookingSelection({ data }) {
  const [selected, setSelected] = useState(null);

  return (
    <HotelsWrapper>
      <StyledTypography variant="h2">Primeiro, escolha seu hotel</StyledTypography>
      <Hotels>
        {
          data?.map((el, i) => 
            <HotelTemplade image={el.image} name={el.name} id={el.id} key={i} selected={selected} setSelected={setSelected}/>
          )
        }
      </Hotels>
    </HotelsWrapper>
  );
}

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;
