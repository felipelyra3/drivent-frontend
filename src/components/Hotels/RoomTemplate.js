import Typography from '@material-ui/core/Typography';
import { Room } from './HotelsSelectionWrapper';

export default function RoomTemplate({ id, name, capacity, hotelId, setRoomdata, roomdata }) {
  if(capacity === 1 && roomdata.single == null) {
    roomdata.single = true;
    setRoomdata(roomdata);
  }else if(capacity === 2 && roomdata.double == null) {
    roomdata.double = true;
    setRoomdata(roomdata);
  }else if(capacity === 3 && roomdata.triple == null) {
    roomdata.triple = true;
    setRoomdata(roomdata);
  }
  return (
    <Room>
      <p>{name}</p>
    </Room>
  );
}
