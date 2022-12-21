import Typography from '@material-ui/core/Typography';
import { Hotel } from './HotelsSelectionWrapper';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useHotel from '../../hooks/api/useHotelById';
import useHotelVacancies from '../../hooks/api/useHotelVacancies';

export default function HotelTemplade({ image, name, id, selected, setSelected }) {
  const { gethotel } = useHotel();
  const { gethotelVacancies } = useHotelVacancies();
  const [Rooms, setRooms] = useState([]);
  const [vacancies, setVacancies] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect (() => {
    if(id) {gethotel(id)
      .then((resp) => {
        setRooms(resp.Rooms);
      });
    gethotelVacancies(id).then(resp => setVacancies(resp));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(Rooms.length>0) {
      let aux = [];
      const capacities = Rooms.map(el => el.capacity);
      if(capacities.includes(1)) {
        aux.push('Single');
      }
      if(capacities.includes(2)) {
        aux.push('Double');
      }
      if(capacities.includes(3)) {
        aux.push('Triple');
      };
      if(aux.length > 1) {
        aux.splice(aux.length-1, 0, ' e ');
      }
      if(aux.length > 3) {
        aux.splice(1, 0, ', ');
      }
      const aux2 = aux.reduce((acc, cur, i, arr) => {
        return (acc+cur);
      }, ' ');  
      setOptions(aux2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Rooms]);

  return(
    <Hotel selected={selected === id} onClick={() => setSelected(id)}>
      <img src={image} alt={name}/>
      <StyledTypography variant="h2">{name}</StyledTypography>

      <h4 >Tipos de acomodação:</h4>
      {<h3>{options}</h3>}
      <h4>Vagas disponíveis:</h4>
      <h3>{vacancies?vacancies.vacancies:null}</h3>
    </Hotel>
  );
}

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;
