import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import * as api from '../../../services/ticketApi';

export default function Activities() {
  const token = useToken();
  const { ticket, setTicket } = {};

  useEffect(() => {
    const promise = api.getTicketById(token);
    promise.then((res) => {
      setTicket((ticket) => ({ ...ticket, ...res }));
    })
      .catch(() => {});
  }, []);

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

  if(!ticket.status === 'PAID') {
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
      <ErrorWrapper>
        <p>
          Sua modalidade de ingresso não necessita escolher atividade. 
          Você terá acesso a todas as atividades.
        </p>
      </ErrorWrapper>
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

