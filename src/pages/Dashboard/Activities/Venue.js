import styled from 'styled-components';
import ActivitieCard from './ActivitieCard';

export default function Venue({ name, data }) {
  return (
    <Body>
      <SubTitle>{name}</SubTitle>
      <Content>
        {data.map((el, index) => <ActivitieCard key={index} id={el.id} name={el.name} startsAt={el.startsAt} endsAt={el.endsAt} vacancy={el.vacancy} ActivitySubscription={el.ActivitySubscription}/>)}
      </Content>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  height: auto;
  min-width: 290px;
`;

const Content = styled.div`
  min-height: calc(100% - 40px);
  height: auto;
  width: 100%;
  border: 1px solid #D7D7D7;
  padding-top: 10px;
`;

const SubTitle = styled.span(() => ({
  color: '#8E8E8E',
  margin: '0 0 10px 0',
  fontSize: '17px',
  lineHeight: '23px',
}));
