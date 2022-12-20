import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

function Test(cvc, setPayed) {
  console.log(cvc);
  //setPayed(true);
}
 
export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };
 
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.cvc);
    alert('You have finished payment!');
    this.form.reset();
  }
  
  render() {
    return (
      <CreditCartWrapper>
        <div id="PaymentForm">
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
          <form>
         	<input
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            /><br />
            <h1>E.g.: 49...,51...,36...,37...</h1>
            <input
              type="tel"
              name="name"
              placeholder="Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            /><br />
            <input
              type="tel"
              name="expiry"
              placeholder="Valid Thru"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            /><br />
            <button>FINALIZAR PAGAMENTO</button>
            {/* <Button onClick={() => {Test(this.state.cvc, setPayed);}}></Button> */}
          </form>
        </div>
      </CreditCartWrapper>
    );
  }
}

const CreditCartWrapper = styled.div`
    div {
        display: flex;

        form {
            margin: 24px 0px 0px 24px;
        }

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
    }
`;

const Button = styled.div`
    background-color: blue;
    height: 140px;
    width: 140px;
`;
