import styled from 'styled-components';

export const HotelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: scroll;

  h2{
  color: 
  rgba(142, 142, 142, 1);
  font-size: 20px;
  }
`;

export const Hotels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Rooms = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Room = styled.div`
  width: 196px;
  height: 45px;
  border-radius: 10px;
  padding: 14px;
  p{
    font-size: 20px;
    font-weight: bold;
  }
`;

export const Hotel = styled.div`
    width: 196px;
    height: 264px;
    background-color: ${(props) => (props.selected ? '#FFEED2' : '#EBEBEB')};
    border-radius: 10px;
    padding: 14px;
    color: rgba(60, 60, 60, 1);   
    h2{
     color: rgba(52, 52, 52, 1);
     margin: 10px 0 !important;
   }

    h4{
      color: rgba(60, 60, 60, 1);
      font-weight: 700;
      font-size: 11px;
    }
    h3{
      font-weight: 400;
      font-size: 12px;
      margin-bottom: 12px;
      margin-top: 5px;
    }

    img{
      border-radius: 10px;
      width: 168px;
      height: 109px;
    }
`;
