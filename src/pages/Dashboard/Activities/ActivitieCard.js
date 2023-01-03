import styled from 'styled-components';
import { BoxArrowInRight, XCircle, CheckCircle } from 'react-bootstrap-icons';

export default function ActivitieCard({ id, name, startsAt, endsAt, vacancy, ActivitySubscription, selectedActivity, setSelectedActivity }) {
  return (
    <Content color={selectedActivity===id} onClick={() => { if(vacancy>ActivitySubscription.length) {setSelectedActivity(id);} }}>
      <Infos>
        <h1>{name}</h1>
        <p>{startsAt} - {endsAt}</p>
      </Infos>
      <Vacancies color={selectedActivity!==id && vacancy===ActivitySubscription.length}>
        {selectedActivity===id?
          <>
            <CheckCircle size={20} color='#078632'/>
            <p>Inscrito</p>
          </>:vacancy===ActivitySubscription.length?
            <>
              <XCircle size={20} color='#CC6666'/>
              <p>Esgotado</p>
            </>:
            <>
              <BoxArrowInRight size={20} color='#078632'/>
              <p>{vacancy - ActivitySubscription.length} vagas</p>
            </>}
      </Vacancies>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  width: calc(100% - 20px);
  height: 80px;
  margin: 0 10px 10px 10px;
  padding: 10px 0 10px 10px;
  background-color: ${(props) => (props.color?'#D0FFDB':'#F1F1F1')};
  border-radius: 5px;
`;

const Vacancies = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 100%;
  border-left: 1px solid #CFCFCF;
  p {
    margin-top: 5px;
    font-size: 9px;
    color: ${(props) => (props.color?'#CC6666':'#078632')};
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 65px);
  h1 {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    font-weight: normal;
  }
`;
