
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS styles
import KanbanBoard from './components/KanbanBoard';
import Controls from './components/Controls';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('title');
  const [selectedTickets, setSelectedTickets] = useState([]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const { data } = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchTicketData();
  }, []);

  const toggleTicketSelection = (ticketId) => {
    setSelectedTickets((prevSelected) =>
      prevSelected.includes(ticketId)
        ? prevSelected.filter(id => id !== ticketId)
        : [...prevSelected, ticketId]
    );
  };

  const userNames = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };

  const organizeTickets = () => {
    return tickets.reduce((acc, ticket) => {
      let key = '';

      switch (grouping) {
        case 'user':
          key = userNames[ticket.userId] || 'Unassigned';
          break;
        case 'priority':
          key = priorityLabels[ticket.priority] || 'No priority';
          break;
        default:
          key = ticket.status;
      }

      acc[key] = acc[key] || [];
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  const sortedTickets = (ticketList) => {
    return [...ticketList].sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  const ticketGroups = organizeTickets();

  return (
    <div className="app">
      <Controls setGrouping={setGrouping} setSorting={setSorting} />
      <KanbanBoard
        ticketGroups={ticketGroups}
        grouping={grouping}
        priorityLabels={priorityLabels}
        sortedTickets={sortedTickets}
        selectedTickets={selectedTickets}
        toggleTicketSelection={toggleTicketSelection}
      />
    </div>
  );
};

export default App;






