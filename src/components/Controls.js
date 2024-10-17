import React from 'react';

const Controls = ({ setGrouping, setSorting }) => {
  return (
    <div>
      <select onChange={(e) => setGrouping(e.target.value)}>
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>
      <select onChange={(e) => setSorting(e.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="priority">Sort by Priority</option>
      </select>
      <button onClick={() => {}}>Display</button> {/* You can pass necessary props */}
    </div>
  );
};

export default Controls;
