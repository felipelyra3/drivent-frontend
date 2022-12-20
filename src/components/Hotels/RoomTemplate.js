import Typography from '@material-ui/core/Typography';
import { Room } from './HotelsSelectionWrapper';

export default function RoomTemplate({ id, name, capacity, hotelId, setSingle, setDouble, setTriple }) {
  if(capacity === 1) {
    setSingle(true);
  }else if(capacity === 2) {
    setDouble(true);
  }else if(capacity === 3) {
    setTriple(true);
  }
  return (
    <Room>
      <p>{name}</p>
    </Room>
  );
}
