import React from 'react';

const Ticket = ({ ticket, isSelected, toggleTicketSelection }) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleTicketSelection(ticket.id)}
          className="custom-checkbox"
          style={{ marginRight: '100px' }}
        />
        <h2 style={{ marginLeft: '20px' }}>{ticket.title}</h2>
      </div>
      <p>{ticket.tag.join(', ')}</p>
    </div>
  );
};

export default Ticket;
