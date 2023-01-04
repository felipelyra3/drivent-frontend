import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import Venue from './Venue';

export default function ActivitiesSelection() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [data, setData] = useState([//criar rota no back que retorna atividades pela data
    { id: 1, date: 'Sexta, 22/10', Activities: [{ id: 1, name: 'Minecraft: montando o PC ideal',
      date: 'Sexta, 22/10', startsAt: '09:00', endsAt: '11:00', vacancy: 27, venue: 1, 
      ActivitiesVenue: { id: 1, name: 'Auditório Principal' }, ActivitySubscription: [] },
    { id: 2, name: 'LoL: montando o PC ideal',
      date: 'Sexta, 22/10', startsAt: '11:00', endsAt: '13:00', vacancy: 0, venue: 1, 
      ActivitiesVenue: { id: 1, name: 'Auditório Principal' }, ActivitySubscription: [] },
    { id: 3, name: 'Palestra x',
      date: 'Sexta, 22/10', startsAt: '09:00', endsAt: '13:00', vacancy: 27, venue: 2, 
      ActivitiesVenue: { id: 2, name: 'Auditório Lateral' }, ActivitySubscription: [] },
    { id: 4, name: 'Palestra y',
      date: 'Sexta, 22/10', startsAt: '09:00', endsAt: '10:00', vacancy: 27, venue: 3, 
      ActivitiesVenue: { id: 3, name: 'Sala de Workshop' }, ActivitySubscription: [] },
    { id: 5, name: 'Palestra z',
      date: 'Sexta, 22/10', startsAt: '10:00', endsAt: '11:45', vacancy: 0, venue: 3, 
      ActivitiesVenue: { id: 3, name: 'Sala de Workshop' }, ActivitySubscription: [] }] },
    { id: 2, date: 'Sábado, 23/10', Activities: [] },
    { id: 3, date: 'Domingo, 24/10', Activities: [] }
  ]);
  return (
    <>
      <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
      {selectedDay==null?
        <SubTitle>
          Primeiro, filtre pelo dia do evento:
        </SubTitle>:null}
      <Container>
        {data?.map((el) => {return <ActivityDate key={el.id} selected={selectedDay?.id===el.id} onClick={() => {setSelectedDay(el);}}>{el.date}</ActivityDate>; })}
      </Container>
      {selectedDay==null?null:<GridVenue>
        {selectedDay.Activities.filter((value, index, self) => index === self.findIndex((t) => (t.venue === value.venue)))
          .map((el, index) => {return <Venue key={index} id={el.venue} name={el.ActivitiesVenue.name} data={selectedDay.Activities.filter((elem) => (elem.venue === el.venue))}/>; })}       
      </GridVenue>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  text-align: left;
  `;

const SubTitle = styled.span(() => ({
  color: '#8E8E8E',
  marginTop: '20px',
  fontSize: '20px',
  lineHeight: '23px',
}));

const Container = styled.div`
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 17px;
  margin-bottom: 60px;
`;

const ActivityDate = styled.div`
  width: 131px;
  height:37px;
  background-color: ${(props) => (props.selected?'#FFD37D':'#e0e0e0')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`;

const GridVenue = styled.div`
  display: flex;
  min-height: 365px;
  height: fit-content;
  width: 100%;
  margin: 0 0 55px 0;
`;
