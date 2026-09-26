import api from "./api";

// Must match Leave.LEAVE_TYPES in backend/leaves/models.py
export const LEAVE_TYPES = [
  { value: "SICK", label: "Sick Leave" },
  { value: "CASUAL", label: "Casual Leave" },
  { value: "ANNUAL", label: "Annual Leave" },
  { value: "MATERNITY", label: "Maternity Leave" },
  { value: "PATERNITY", label: "Paternity Leave" },
  { value: "UNPAID", label: "Unpaid Leave" },
];

export const leaveTypeLabel = (value) => LEAVE_TYPES.find((type) => type.value === value)?.label || value;

export const fetchLeaves = async () => {
  const response = await api.get("/leaves/user-leaves/");
  return response.data;
};

export const applyLeave = async (formData) => {
  const response = await api.post("/leaves/user-leaves/", formData);
  return response.data;
};

// All leave requests, for admins
export const pendingApprovals = async () => {
  const response = await api.get("/leaves/leave-approval/");
  return response.data;
};

export const updateLeaveDetails = async (leaveId, data) => {
  const response = await api.patch(`/leaves/user-leaves/update/${leaveId}/`, data);
  return response.data;
};

export const updateLeaveStatus = async (leaveId, status) => {
  const response = await api.patch(`/leaves/leave-approval/${leaveId}/`, { status });
  return response.data;
};
