import styled from 'styled-components';
import { BoxArrowInRight, XCircle, CheckCircle } from 'react-bootstrap-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import usePostActivity from '../../../hooks/api/usePostActivity';
import useGetActivityByUser from '../../../hooks/api/useGetActivityByUser';
import useActivityUnsubscribe from '../../../hooks/api/useActivityUnsubscribe';

export default function ActivitieCard({ id, name, startsAt, endsAt, vacancy, ActivitySubscription }) {
  const [selectedActivity, setSelectedActivity] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const { postactivity } = usePostActivity();
  const { getactivitybyuserid } = useGetActivityByUser();
  const { activityunsubscribe } = useActivityUnsubscribe();
  useEffect(() => {
    if(selectedActivity && !hasSelected) {
      postactivity({ activityId: id }).then(() => {setHasSelected(true);}).catch(() => {toast('Não foi possível realizar inscrição!');});
    } else if(!selectedActivity && hasSelected) {
      activityunsubscribe(id).then(() => {setHasSelected(false);}).catch(() => {});
    }
  }, [selectedActivity]);
  
  useEffect(() => {
    getactivitybyuserid(id).then(() => {setHasSelected(true); setSelectedActivity(true);}).catch(() => {setHasSelected(false); setSelectedActivity(false);});
  }, [id]);

  function calculateHeigth() {
    const hour = Number(endsAt.slice(0, 2)) - Number(startsAt.slice(0, 2));
    const minute = Number(endsAt.slice(3, 5)) - Number(startsAt.slice(3, 5));
    const result = (hour + minute/60);
    return (result*80 + (Math.ceil(result)-1)*10)+'px';
  }
  return (
    <Content h={calculateHeigth()} color={hasSelected.toString()} onClick={() => { if(vacancy>ActivitySubscription.length) {setSelectedActivity(!selectedActivity);} }}>
      <Infos>
        <h1>{name}</h1>
        <p>{startsAt} - {endsAt}</p>
      </Infos>
      <Vacancies color={(!hasSelected && vacancy===ActivitySubscription.length).toString()}>
        {hasSelected?
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
  height: ${(props) => (props.h)};
  margin: 0 10px 10px 10px;
  padding: 10px 0 10px 10px;
  background-color: ${(props) => (props.color==='true'?'#D0FFDB':'#F1F1F1')};
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
    color: ${(props) => (props.color==='true'?'#CC6666':'#078632')};
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
