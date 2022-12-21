import { useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import usePayment from '../../hooks/api/usePayment';
import GetCardIssuer from './GetCardIssuer';

export default function CreditCard({ payed, setPayed, token, ticketId, enrollment }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focused, setFocused] = useState('');
  const { createPayment } = usePayment();

  function changeFocus(e) {
    setFocused(e.target.name);
  }

  async function handleForm() {
    if(number.length !== 16) {
      toast('O número do cartão de crédito não parece correto');
      return;
    } else if (name.length < 3) {
      toast('O nome do cartão de crédito não parece correto');
      return;
    } else if(expiry.length < 4 || expiry.length > 6) {
      toast('A data de expiração do cartão não parece correta');
      return;
    } else if(cvc.length !== 3) {
      toast('O CVC do cartão não parece correto');
      return;
    }

    const issuer = GetCardIssuer(number);

    const body = {
      ticketId: ticketId,
      cardData: {
        issuer: issuer,
        number: number,
        name: name,
        expirationDate: expiry,
        cvv: cvc
      }
    };

    try {
      const payment = await createPayment(body);
      setPayed(true);
    } catch (error) {
      console.log(error);
      toast('Erro!');
    }
  }

  return(
    <>
      <CreditCardContainer>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
        />
      </CreditCardContainer>
      <Form>
        <input type='number' name="number" placeholder='Card Number' onChange={(e) => {setNumber(e.target.value);}} onFocus={changeFocus} /><br />
        <h1>E.g.: 49...,51...,36...,37...</h1>
        <input type='text' name="name" placeholder='Name' onChange={(e) => {setName(e.target.value);}} onFocus={changeFocus} /><br />
        <input type='number' name="expiry" placeholder='Valid Thru' onChange={(e) => {setExpiry(e.target.value);}} onFocus={changeFocus} />
        <input type='number' name="cvc" placeholder='CVC' onChange={(e) => {setCvc(e.target.value);}} onFocus={changeFocus} /><br />
        {/* <button>FINALIZAR PAGAMENTO</button> */}
        <Button onClick={() => {handleForm();}}>FINALIZAR PAGAMENTO</Button>
      </Form>
    </>
  );
}

const Form = styled.form`
    margin: 12px 0px 0px 24px;

    input {
            margin: 8px 8px 0px 0px;
        }

        h1 {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            text-align: left;
            color: #898989;
        }
`;

const CreditCardContainer = styled.div`

`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 182px;
    height: 37px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    margin-top: 24px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #000000;
`;
