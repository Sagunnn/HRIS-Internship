import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';

const STATUS_COLORS = {
  APPROVED: 'success',
  PENDING: 'warning',
  REJECTED: 'danger',
  CANCELLED: 'secondary',
};

const LeaveStatusBadge = ({ status }) => (
  <MDBBadge color={STATUS_COLORS[status] || 'primary'} pill>
    {status}
  </MDBBadge>
);

export default LeaveStatusBadge;
