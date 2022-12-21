import { Hotels, HotelsWrapper, Rooms, Selectroom } from './HotelsSelectionWrapper';
import HotelTemplade from './HotelCardTemplade';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import useRooms from '../../hooks/api/useRooms';
import RoomTemplate from './RoomTemplate';
import useBooking from '../../hooks/api/useBooking';
import useBookingDone from '../../hooks/api/useBookingDone';

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
  const [endselection, setEndselection] = useState(false);
  const { getrooms } = useRooms();
  const { postbooking } = useBooking();
  const { getbooking } = useBookingDone();

  useEffect(() => {
    getbooking()
      .then((resp) => {
        setEndselection(true);
        const room = Number(resp.Room.id);
        const hotel = Number(resp.Room.hotelId);
        setSelected(hotel);
        setSelectedroom(room);
      }).catch(() => {});
  }, []);

  useEffect(() => {
    if(selected) {
      getrooms(selected)
        .then((resp) => {const obj = sorted(resp); setRoomdata(obj);});
    }
  }, [selected]);

  function sendData() {
    if(selectedroom >= 0) {
      postbooking({ 'roomId': selectedroom })
        .then(() => {setEndselection(true);});
    }
  }
  return (
    <HotelsWrapper>
      {endselection&&roomdata?<>
        <StyledTypography variant="h2">Você já escolheu seu quarto:</StyledTypography>
        <Hotels>
          {
            data?.filter(el => el.id === selected).map((el, i) => 
              <HotelTemplade image={el.image} name={el.name} id={el.id} key={i} selected={selected} setSelected={setSelected} endselection={endselection} roomdata={roomdata.Rooms.filter(el => el.id === selectedroom)[0]}/>
            )
          }
        </Hotels>
        <Selectroom>Trocar de Quarto</Selectroom>
      </>:null}
      {!endselection?<>
        <StyledTypography variant="h2">Primeiro, escolha seu hotel</StyledTypography>
        <Hotels>
          {
            data?.map((el, i) => 
              <HotelTemplade image={el.image} name={el.name} id={el.id} key={i} selected={selected} setSelected={setSelected} endselection={endselection} roomdata={null}/>
            )
          }
        </Hotels>
      </>:null}
      {selected&&!endselection?
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
          <Selectroom onClick={sendData}>Reservar Quarto</Selectroom>
        </>
        :null}
    </HotelsWrapper>
  );
}

const StyledTypography = styled(Typography)`
  margin: 20px 0 !important;
`;
