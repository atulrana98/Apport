// import React from 'react';
// import TicketBoard from './TicketBoard';
// import './App.css';

// const App = () => {
//   return (
//     <div className="App">
//       <h1>Ticket Management Kanban</h1>
//       <TicketBoard />
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css'; // Import the updated CSS

// const App = () => {
//   const [tickets, setTickets] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [grouping, setGrouping] = useState('status');
//   const [sorting, setSorting] = useState('title');
//   const [selectedTickets, setSelectedTickets] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
//         setTickets(response.data.tickets);
//         setUsers(response.data.users);
//       } catch (error) {
//         console.error('Error fetching the data', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCheckboxChange = (ticketId) => {
//     setSelectedTickets((prevSelected) =>
//       prevSelected.includes(ticketId)
//         ? prevSelected.filter(id => id !== ticketId)
//         : [...prevSelected, ticketId]
//     );
//   };

//   const userMap = users.reduce((acc, user) => {
//     acc[user.id] = user.name;
//     return acc;
//   }, {});

//   const priorityMap = {
//     4: 'Urgent',
//     3: 'High',
//     2: 'Medium',
//     1: 'Low',
//     0: 'No priority',
//   };

//   const groupTickets = () => {
//     if (grouping === 'status') {
//       return tickets.reduce((acc, ticket) => {
//         acc[ticket.status] = acc[ticket.status] || [];
//         acc[ticket.status].push(ticket);
//         return acc;
//       }, {});
//     } else if (grouping === 'user') {
//       return tickets.reduce((acc, ticket) => {
//         const user = ticket.userId;
//         acc[userMap[user]] = acc[userMap[user]] || [];
//         acc[userMap[user]].push(ticket);
//         return acc;
//       }, {});
//     } else if (grouping === 'priority') {
//       return tickets.reduce((acc, ticket) => {
//         const priority = ticket.priority;
//         acc[priority] = acc[priority] || [];
//         acc[priority].push(ticket);
//         return acc;
//       }, {});
//     }
//     return {};
//   };

//   const sortTickets = (tickets) => {
//     return tickets.sort((a, b) => {
//       if (sorting === 'priority') {
//         return b.priority - a.priority;
//       } else if (sorting === 'title') {
//         return a.title.localeCompare(b.title);
//       }
//       return tickets;
//     });
//   };

//   const groupedTickets = groupTickets();

//   const handleAddTicket = () => {
//     // Do nothing on click
//   };

//   return (
//     <div className="app">
//       <div>
//         <select onChange={(e) => setGrouping(e.target.value)}>
//           <option value="status">Group by Status</option>
//           <option value="user">Group by User</option>
//           <option value="priority">Group by Priority</option>
//         </select>
//         <select onChange={(e) => setSorting(e.target.value)}>
//           <option value="title">Sort by Title</option>
//           <option value="priority">Sort by Priority</option>
//         </select>
//         <button onClick={() => setTickets([...tickets])}>Display</button>
//       </div>
//       <div className="kanban">
//         {Object.entries(groupedTickets).map(([key, tickets]) => (
//           <div key={key} className="column">
//             <h2 className="column-header">
//               <span>
//                 {grouping === 'priority' ? priorityMap[key] : key}
//                 {grouping === 'status' && <i className="fas fa-clipboard-list status-icon"></i>} {/* Add icon for status */}
//               </span>
//               <button className="add-button" onClick={handleAddTicket}>+</button>
//             </h2>
//             {sortTickets(tickets).map(ticket => (
//               <div key={ticket.id} className="card">
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <input
//                     type="checkbox"
//                     checked={selectedTickets.includes(ticket.id)}
//                     onChange={() => handleCheckboxChange(ticket.id)}
//                     className="custom-radio"
//                     style={{ marginRight: '100px' }} // Add margin for space
//                   />

//                   <h2 style={{ marginLeft: '20px' }}>{ticket.title}</h2>
//                 </div>
//                 <p>{ticket.tag.join(', ')}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;

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






