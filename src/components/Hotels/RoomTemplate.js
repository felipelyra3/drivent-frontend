import { Room, Vacancies } from './HotelsSelectionWrapper';
import { Person, PersonFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { useEffect } from 'react';

export default function RoomTemplate({ id, name, capacity, hotelId, occupied, selectedroom, setSelectedroom }) {
  const [arrperson, setArrperson] = useState([]);

  useEffect(() => {
    const aux = [];
    for(let i=1; i<=capacity; i++) {
      if(i === capacity-occupied && selectedroom===id) {
        aux.push(<PersonFill key={i} size={27} color="#FF4791"/>);
      }else if(i<=capacity-occupied) {
        aux.push(<Person key={i} size={27}/>);
      }else if(capacity===occupied) {
        aux.push(<PersonFill key={i} size={27} color="#9D9D9D"/>);
      }else {
        aux.push(<PersonFill key={i} size={27}/>);
      }
    }
    setArrperson(aux);
  }, [selectedroom, hotelId]);
  return(
    <Room invalid={capacity===occupied? 'true' : 'false'} select={selectedroom===id? 'true':'false'} onClick={() => { if(capacity!==occupied) { setSelectedroom(id);} }}>
      <p invalid={capacity===occupied? 'true':'false'}>{name}</p>
      <Vacancies>
        {arrperson}
      </Vacancies>
    </Room>
  );
}
