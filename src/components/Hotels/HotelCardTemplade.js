import Typography from '@material-ui/core/Typography';
import { Hotel } from './HotelsSelectionWrapper';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useHotel from '../../hooks/api/useHotelById';
import useHotelVacancies from '../../hooks/api/useHotelVacancies';

export default function HotelTemplade({ image, name, id, selected, setSelected, endselection, roomdata }) {
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
  }, [endselection]);

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
  if(endselection) {
    return(
      <Hotel selected={selected === id} onClick={() => setSelected(id)}>
        <img src={image} alt={name}/>
        <StyledTypography variant="h2">{name}</StyledTypography>
  
        <h4 >Quarto reservado</h4>
        {<h3>{roomdata.name} ({roomdata.capacity===1?'Single':(roomdata.capacity===2?'Double':'Triple')})</h3>}
        <h4>Pessoas no seu quarto</h4>
        <h3>Você {roomdata.occupied>0?`e mais ${roomdata.occupied}`:null}</h3>
      </Hotel>
    );
  } else {
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
}

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;
