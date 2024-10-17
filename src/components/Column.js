import React from 'react';
import Ticket from './Ticket';

const Column = ({ title, tickets, selectedTickets, toggleTicketSelection }) => {
  return (
    <div className="column">
      <h2 className="column-header">
        {title}
        <button className="add-button" onClick={() => {}}>+</button>
      </h2>
      {tickets.map(ticket => (
        <Ticket
          key={ticket.id}
          ticket={ticket}
          isSelected={selectedTickets.includes(ticket.id)}
          toggleTicketSelection={toggleTicketSelection}
        />
      ))}
    </div>
  );
};

export default Column;
