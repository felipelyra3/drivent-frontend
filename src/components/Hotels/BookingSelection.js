import { Hotels, HotelsWrapper, Rooms } from './HotelsSelectionWrapper';
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
  const { getrooms } = useRooms();
  useEffect(() => {
    if(selected) {
      getrooms(selected)
        .then((resp) => {const obj = sorted(resp); setRoomdata(obj);});
    }
  }, [selected]);
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
        <Rooms>
          {roomdata?roomdata.Rooms.map((el, index) => <RoomTemplate key={index} id={el.id} name={el.name} capacity={el.capacity} hotelId={el.hotelId} setRoomdata={setRoomdata} roomdata={roomdata}/>):null}
        </Rooms>
        :null}
    </HotelsWrapper>
  );
}

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;
