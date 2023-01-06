import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function redirectToGitHub() { 
  const GITHUB_URL = 'https://github.com/login/oauth/authorize';
  const params = {
    response_type: 'code',
    scope: 'user',
    client_id: '23cddc3b328a195ec031',
    redirect_uri: 'http://localhost:3000/enroll',
  };
  const queryStrings = `response_type=code&scope=user&client_id=${params.client_id}&redirect_uri=${params.redirect_uri}`;
  const authURL = `${GITHUB_URL}?${queryStrings}`;
  window.location.href = authURL;
};

export async function verifyIfGitHubCodeExists() {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  
  if(code) {
    //console.log(code);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}auth/sign-in/github`, { code });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  } 
}

