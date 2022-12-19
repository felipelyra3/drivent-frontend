import Typography from '@material-ui/core/Typography';
import { Hotel } from './HotelsSelectionWrapper';
import styled from 'styled-components';

export default function HotelTemplade({ image, name, id, selected, setSelected }) {
  return(
    <Hotel selected={selected === id} onClick={() => setSelected(id)}>
      <img src={image} alt={name}/>
      <StyledTypography variant="h2">{name}</StyledTypography>

      <h4 >Tipos de acomodação:</h4>
      <h3>Single e Double</h3>
      <h4>Vagas disponíveis:</h4>
      <h3>103</h3>
    </Hotel>
  );
}

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;
