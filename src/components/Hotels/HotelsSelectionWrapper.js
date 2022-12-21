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
  margin-bottom: 20px;
`;

export const Rooms = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Room = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 196px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #CECECE;
  padding: 14px;
  background-color: ${(props) => (props.invalid === 'true'? '#E9E9E9' : (props.select === 'true' ? '#FFEED2' : '#FFFFFF'))};
  p{
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => (props.invalid === 'true' ? '#9D9D9D' : '#454545')};
  }
`;

export const Vacancies = styled.div`
  display: flex;
`;

export const Selectroom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  min-height: 40px;
  margin: 25px 0 45px 0;
  background-color: #E0E0E0;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
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
