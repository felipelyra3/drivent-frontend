import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();

  if(!ticket) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
        <ErrorWrapper>
          <p>
          Você ainda não tem um ticket! Volte para a página de inscrição!
          </p>
        </ErrorWrapper>
      </>
    );
  }

  if(ticket.status === 'RESERVED') {
    return (
      <>
        <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
        <ErrorWrapper>
          <p>
          Você precisa ter confirmado pagamento antes
            de fazer a escolha de atividades
          </p>
        </ErrorWrapper>
      </>
    );
  }

  if(ticket.TicketType.isRemote) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
        <ErrorWrapper>
          <p>
          Sua modalidade de ingresso não necessita escolher atividade. 
          Você terá acesso a todas as atividades.
          </p>
        </ErrorWrapper>
      </>
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
      <SubTitle>
        Primeiro, filtre pelo dia do evento:
      </SubTitle>
      <Container>
        <ActivityDate>Sexta, 22/10</ActivityDate>
        <ActivityDate>Sábado, 23/10</ActivityDate>
        <ActivityDate>Domingo, 24/10</ActivityDate>
      </Container>

    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  text-align: left;
  `;

const ErrorWrapper = styled.div`
 display: flex;
align-items: center;
justify-content: center;
color: 
rgba(142, 142, 142, 1);
font-size: 20px;
width: 100%;
height: calc(100% - 100px);

p{
  max-width: 450px;
  line-height: 25px;
  text-align: center;
}
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
`;

const ActivityDate = styled.div`
  width: 131px;
  height:37px;
  background-color: #e0e0e0;
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
