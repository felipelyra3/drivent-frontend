import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';

import { redirectToGitHub, verifyIfGitHubCodeExists } from '../Enroll/githublogin';
import styled from 'styled-components';

export default function SignIn() {
  const { setUserData } = useContext(UserContext);  
  handleGitHub();

  async function handleGitHub() {
    const verifyGitHub = await verifyIfGitHubCodeExists();

    if(verifyGitHub) {
      const body = {
        token: verifyGitHub.token,
        user: {
          id: verifyGitHub.id,
          email: verifyGitHub.email,
        }
      };
      setUserData(body);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    }
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);

  const navigate = useNavigate();
  
  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  } 

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
        <GitHub><button className="githubloginbutton" onClick={() => {redirectToGitHub();}}>Login with GitHub</button></GitHub>
      </Row>
    </AuthLayout>
  );
}

const GitHub = styled.div`
  margin-top: 12px;

  button {
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
	background-color:#ffffff;
	border-radius:6px;
	border:1px solid #dcdcdc;
	display:inline-block;
	cursor:pointer;
	color:#666666;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
}
button:hover {
	background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
	background-color:#f6f6f6;
}
button:active {
	position:relative;
	top:1px;
}
`;
