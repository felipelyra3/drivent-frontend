import { useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function CreditCard({ payed, setPayed }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState();
  const [focused, setFocused] = useState('');

  function changeFocus(e) {
    setFocused(e.target.name);
  }

  function handleForm() {
    console.log('number: ' + number);
    console.log('name: ' + name);
    console.log('expiry: ' + expiry);
    console.log('cvc: ' + cvc);
    setPayed(true);
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
        <input type='text' name="number" placeholder='Card Number' onChange={(e) => {setNumber(e.target.value);}} onFocus={changeFocus} /><br />
        <h1>E.g.: 49...,51...,36...,37...</h1>
        <input type='text' name="name" placeholder='Name' onChange={(e) => {setName(e.target.value);}} onFocus={changeFocus} /><br />
        <input type='text' name="expiry" placeholder='Valid Thru' onChange={(e) => {setExpiry(e.target.value);}} onFocus={changeFocus} />
        <input type='text' name="cvc" placeholder='CVC' onChange={(e) => {setCvc(e.target.value);}} onFocus={changeFocus} /><br />
        {/* <button>FINALIZAR PAGAMENTO</button> */}
        <Button onClick={() => {handleForm();}}>FINALIZAR PAGAMENTO</Button>
      </Form>
    </>
  );
}

const Form = styled.form`
    margin: 24px 0px 0px 24px;

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
    width: 140px;
    height: 30px;
    background-color: blue;
`;
