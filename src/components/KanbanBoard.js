import React from 'react';
import Column from './Column';

const KanbanBoard = ({ ticketGroups, grouping, priorityLabels, sortedTickets, selectedTickets, toggleTicketSelection }) => {
  return (
    <div className="kanban">
      {Object.entries(ticketGroups).map(([groupKey, ticketList]) => (
        <Column
          key={groupKey}
          title={grouping === 'priority' ? priorityLabels[groupKey] : groupKey}
          tickets={sortedTickets(ticketList)}
          selectedTickets={selectedTickets}
          toggleTicketSelection={toggleTicketSelection}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
