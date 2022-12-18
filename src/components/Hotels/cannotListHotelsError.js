import { ErrorMessageWrapper } from './ErrorMessageWrapper';

export default function CannotListHotelsMessage({ paymentRequired }) {
  return <ErrorMessageWrapper>
    {paymentRequired?<p>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</p>:<p>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</p>}
  </ErrorMessageWrapper>;
}
