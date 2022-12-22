import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import UserContext from '../../contexts/UserContext';
import useEnrollment from '../../hooks/api/useEnrollment';
import handlePayent from './HandleSelection';
import TotalSum from './TotalSum';
import HandleBookTicket from './HandleBookTicket';
import CreditCard from './CreditCard';
import { FaCheckCircle } from 'react-icons/fa';
import useToken from '../../hooks/useToken';
import VerifyIfTicketExists from './VerifyIfTicketExists';
import VerifyIfPaymentExists from './VerifyIfPaymentExists';

export default function Payment() {
  const [ticketPresential, setTicketPresential] = useState(false);
  const [ticketOnline, setTicketOnline] = useState(false);
  const [ticketWithoutHotel, setTicketWithoutHotel] = useState(false);
  const [ticketWithHotel, setTicketWithHotel] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [payed, setPayed] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const presential = 250;
  const online = 100;
  const withoutHotel = 0;
  const withHotel = 350;
  const totalSum = TotalSum(ticketPresential, ticketOnline, ticketWithoutHotel, ticketWithHotel, presential, online, withoutHotel, withHotel);
  
  const { enrollment } = useEnrollment();
  const { userData: user } = useContext(UserContext);
  const userId = user.user.id;
  const token1 = useToken();

  useEffect(() => {
    VerifyIfTicketExists(token1, setTicketOnline, setTicketPresential, setTicketWithoutHotel, setTicketWithHotel, setTicketId, setConfirmation);
    VerifyIfPaymentExists(userId, token1, setPayed);
  }, []);
  
  if(!enrollment) {
    return(
      <>
        <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
        <Center>Você precisa completar sua inscrição antes<br /> de prosseguir pra escolha de ingresso</Center>
      </>
    );
  }
  
  return(
    <>
      {confirmation ? 
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
          <StyledTitle>Ingresso escolhido</StyledTitle>
          <SummaryWrapper>
            {ticketOnline ? <SummaryBox><h1>Online</h1><br /><h2>R$ {totalSum}</h2></SummaryBox> : <></>}
            {ticketPresential && ticketWithoutHotel ? <SummaryBox><h1>Presencial s/ Hotel</h1><br /><h2>R$ {totalSum}</h2></SummaryBox> : <></>}
            {ticketPresential && ticketWithHotel ? <SummaryBox><h1>Presencial + Hotel</h1><br /><h2>R$ {totalSum}</h2></SummaryBox> : <></>}
          </SummaryWrapper>

          {payed ?
            <PaymentConfirmationWrapper>
              <StyledTitle>Ingresso escolhido</StyledTitle>
              <ContainerPaymentConfirmation>
                <FaCheckCircleStyled />
                <div className="text"><h1>Pagamento confirmado!</h1><br />
                  <h2>Prossiga para escolha de hospedagem e atividades</h2></div>
              </ContainerPaymentConfirmation>
            </PaymentConfirmationWrapper>
            :
            <CreditCardWrapper>
              <CreditCard payed={payed} setPayed={setPayed} token={token1} ticketId={ticketId} enrollment={enrollment} />
            </CreditCardWrapper>}
        </>
        :
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
          <StyledTitle>Primeiro, escolha sua modalidade de ingresso:</StyledTitle>
          <TicketTypeWrapper>
            <div className={ticketPresential.toString()} onClick={() => {handlePayent.TicketModel(setTicketPresential, setTicketOnline, 1);}}>
              <h1>Presencial</h1>
              <h2>R$ {presential}</h2>
            </div>

            <div className={ticketOnline.toString()} onClick={() => {handlePayent.TicketModel(setTicketPresential, setTicketOnline, 2);}}>
              <h1>Online</h1>
              <h2>R$ {online}</h2>
            </div>
          </TicketTypeWrapper>

          {ticketPresential ?
            <HostWrapper>
              <StyledTitle>Ótimo! Agora escolha sua modalidade de hospedagem:</StyledTitle>
              <TicketTypeWrapper>
                <div className={ticketWithoutHotel.toString()} onClick={() => {handlePayent.HostModel(setTicketWithoutHotel, setTicketWithHotel, 1);}}>
                  <h1>Sem Hotel</h1>
                  <h2>+ R$ {withoutHotel}</h2>
                </div>

                <div className={ticketWithHotel.toString()} onClick={() => {handlePayent.HostModel(setTicketWithoutHotel, setTicketWithHotel, 2);}}>
                  <h1>Com Hotel</h1>
                  <h2>+ R$ {withHotel}</h2>
                </div>
              </TicketTypeWrapper>
            </HostWrapper>
            :
            <></>}

          {ticketWithoutHotel || ticketWithHotel || ticketOnline ?
            <ConfirmationWrapper>
              <h1>Fechado! O total ficou em R$ {totalSum}. Agora é só confirmar:</h1>
              <BookButton onClick={() => {HandleBookTicket(token1, ticketPresential, ticketOnline, ticketWithoutHotel, ticketWithHotel, enrollment, setConfirmation, setTicketId);}}>Reservar ingresso</BookButton>
            </ConfirmationWrapper>
            :
            <></>}
        </>}
      
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Center = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* font-family: 'Roboto';
  font-style: normal; */
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;

const TicketTypeWrapper = styled.div`
    display: flex;
    margin-top: 24px;

    .container {
        width: 145px;
        height: 145px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #CECECE;
        border-radius: 20px;
        margin-right: 24px;
        cursor: pointer;
    }

    .true {
        width: 145px;
        height: 145px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #CECECE;
        border-radius: 20px;
        margin-right: 24px;
        cursor: pointer;
        background-color: #FFEED2;
    }

    .false {
        width: 145px;
        height: 145px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #CECECE;
        border-radius: 20px;
        margin-right: 24px;
        cursor: pointer;
        background-color: #FFFFFF;
    }

    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #454545;
    }

    h2 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        color: #898989;
    }
`;

const HostWrapper = styled.div`
    margin-top: 24px;
`;

const StyledTitle = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
`;

const ConfirmationWrapper = styled.div`
    margin-top: 24px;

    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #8E8E8E;
    }
`;

const BookButton = styled.button`
    width: 162px;
    height: 37px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
    margin-top: 24px;
`;

const SummaryWrapper = styled.div`
    
`;

const SummaryBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 290px;
    height: 108px;
    background: #FFEED2;
    border-radius: 20px;
    margin-top: 12px;

    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #454545;
    }

    h2 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        color: #898989;
    }
`;

const CreditCardWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 24px 0px 0px 0px;
    //background-color: blue;
`;

const PaymentConfirmationWrapper = styled.div`
    margin-top: 24px;
`;

const ContainerPaymentConfirmation = styled.div`
    display: flex;
    align-items: center;
    margin: 12px 0px 0px 12px;

    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #454545;
    }

    h2 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #898989;
    }
`;

const FaCheckCircleStyled  = styled(FaCheckCircle)`
  color: #36B853;
  transform: scale(3);
  margin-right: 24px;
`;
