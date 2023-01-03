import styled from 'styled-components';

export default function Venue({ id, name, data }) {
  return (
    <Body>
      <p>{name}</p>
      <Content>
        {data[0].name}
      </Content>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 290px;
`;

const Content = styled.div`
  height: calc(100% - 40px);
  width: 100%;
  border: 1px solid black;
`;
