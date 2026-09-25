import React from 'react';

const ManagerOptions = ({ managers }) => (
  <>
    <option value="">No manager</option>
    {managers.map((manager) => (
      <option key={manager.id} value={manager.id}>
        {manager.first_name} {manager.last_name}{manager.department ? ` (${manager.department})` : ''}
      </option>
    ))}
  </>
);

export default ManagerOptions;
