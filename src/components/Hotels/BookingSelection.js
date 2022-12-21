import { Hotels, HotelsWrapper, Rooms, Selectroom } from './HotelsSelectionWrapper';
import HotelTemplade from './HotelCardTemplade';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import useRooms from '../../hooks/api/useRooms';
import RoomTemplate from './RoomTemplate';

function sorted(data) {
  let aux = data.Rooms;
  aux = aux.sort(function(a, b) {
    let keya = Number(a.name);
    let keyb = Number(b.name);
    if(keya < keyb) return -1;
    if(keya > keyb) return 1;
    return 0;
  });
  const obj = data;
  obj.Rooms = aux;
  return obj;
}

export default function BookingSelection({ data }) {
  const [selected, setSelected] = useState(null);
  const [roomdata, setRoomdata] = useState(null);
  const [selectedroom, setSelectedroom] = useState(-1);
  const { getrooms } = useRooms();

  useEffect(() => {
    if(selected) {
      getrooms(selected)
        .then((resp) => {const obj = sorted(resp); setRoomdata(obj);});
    }
  }, [selected]);
  //console.log(roomdata); //occupied = vagas do quarto ocupadas
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
      {selected?
        <>
          <StyledTypography variant="h2">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
          <Rooms>
            {roomdata?roomdata.Rooms.map((el, index) => {  
              if(el.capacity === 1 && roomdata.single == null) {
                roomdata.single = true;
                setRoomdata(roomdata);
              }else if(el.capacity === 2 && roomdata.double == null) {
                roomdata.double = true;
                setRoomdata(roomdata);
              }else if(el.capacity === 3 && roomdata.triple == null) {
                roomdata.triple = true;
                setRoomdata(roomdata);
              };return <RoomTemplate key={index} id={el.id} name={el.name} capacity={el.capacity} hotelId={el.hotelId} occupied={el.occupied} selectedroom={selectedroom} setSelectedroom={setSelectedroom}/>;}):null}
          </Rooms>
          <Selectroom>Reservar Quarto</Selectroom>
        </>
        :null}
    </HotelsWrapper>
  );
}

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;
