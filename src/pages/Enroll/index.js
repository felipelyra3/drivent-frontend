import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label } from '../../components/Auth';
import Link from '../../components/Link';

import EventInfoContext from '../../contexts/EventInfoContext';

import useSignUp from '../../hooks/api/useSignUp';

import axios from 'axios';
import { redirectToGitHub, verifyIfGitHubCodeExists } from './githublogin';
import { githubSignIn } from '../../services/authApi';
import { useParams } from 'react-router-dom';

export default function Enroll() {
  localStorage.setItem('token', '');
  
  verifyIfGitHubCodeExists();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();
  
  const { eventInfo } = useContext(EventInfoContext);

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }

  async function githubLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    /* axios.post('/auth/sign-in/github', { code }).then((res) => {
      localStorage.setItem('token', res.data.token);
    }); */
    try {
      const test = await githubSignIn(code);
      console.log(test);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Input label="Repita sua senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>Inscrever</Button>
        </form>
      </Row>
      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
        <button className="githubloginbutton" onClick={() => {redirectToGitHub();}}>AAAAAAAAA</button>
        <script type="module" src="enrollindex.js"></script>
      </Row>
    </AuthLayout>
  );
}
