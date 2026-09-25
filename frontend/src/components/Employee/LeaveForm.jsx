import React from 'react';
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { LEAVE_TYPES } from '../../services/leaveServices';

// Shared fields for requesting and editing a leave
const LeaveForm = ({ formData, onChange }) => (
  <>
    <div className="mb-4 w-100">
      <label htmlFor="leave_type" className="fw-bold text-start d-block">Leave Type</label>
      <select id="leave_type" name="leave_type" value={formData.leave_type} onChange={onChange} required className="form-select">
        <option value="">Select Leave Type</option>
        {LEAVE_TYPES.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>

    <div className="mb-4 w-100">
      <label htmlFor="start_date" className="fw-bold text-start d-block">Start Date</label>
      <MDBInput type="date" id="start_date" name="start_date" value={formData.start_date} onChange={onChange} required />
    </div>

    <div className="mb-4 w-100">
      <label htmlFor="end_date" className="fw-bold text-start d-block">End Date</label>
      <MDBInput
        type="date"
        id="end_date"
        name="end_date"
        value={formData.end_date}
        min={formData.start_date || undefined}
        onChange={onChange}
        required
      />
    </div>

    <div className="mb-4 w-100">
      <label htmlFor="reason" className="fw-bold text-start d-block">Reason</label>
      <MDBTextArea id="reason" name="reason" value={formData.reason} onChange={onChange} rows={4} required />
    </div>
  </>
);

export default LeaveForm;
