function TicketModel(setTicketSelected1, setTicketSelected2, i) {
  if(i === 1) {
    setTicketSelected1(true);
    setTicketSelected2(false);
  }
  if (i === 2) {
    setTicketSelected2(true);
    setTicketSelected1(false);
  }
}

function HostModel(setHostSelected1, setHostSelected2, i) {
  if(i === 1) {
    setHostSelected1(true);
    setHostSelected2(false);
  }
  if(i === 2) {
    setHostSelected2(true);
    setHostSelected1(false);
  }
}

const handlePayent = {
  TicketModel,
  HostModel,
};

export default handlePayent;
