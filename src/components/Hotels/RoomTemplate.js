import Typography from '@material-ui/core/Typography';
import { Room } from './HotelsSelectionWrapper';

export default function RoomTemplate({ id, name, capacity, hotelId, occupied }) {
  return (
    <Room>
      <p>{name}</p>
      <p>espaco: {capacity}</p>
      <p>ocupados: {occupied}</p>
    </Room>
  );
}
