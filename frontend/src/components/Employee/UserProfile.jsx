import React, { useEffect, useState } from "react";
import { fetchMyProfile } from "../../services/employeeServices";
import { getErrorMessage } from "../../services/api";
import defaultAvatar from "../../assets/default-avatar.svg";

const UserProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyProfile()
      .then(setEmployee)
      .catch((err) =>
        setError(
          err.response?.status === 404
            ? "No employee profile is linked to this account."
            : getErrorMessage(err, "Failed to load user data")
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center w-100 mt-5">Loading user data...</p>;
  if (error) return <p className="text-center text-danger w-100 mt-5">{error}</p>;

  const fullName = [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(" ");

  return (
    <section className="w-100" style={{ backgroundColor: "#f4f7f6" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <img
                  src={employee.user.profile_picture || defaultAvatar}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "180px", height: "180px", objectFit: "cover" }}
                />
                <h5 className="my-3">{fullName}</h5>
                <p className="text-muted mb-1">{employee.user.role}</p>
                <p className="text-muted mb-0">{employee.department || "Unassigned"}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <UserDetail label="Full Name" value={fullName} />
                <UserDetail label="Username" value={employee.user.username} />
                <UserDetail label="Email" value={employee.user.email} />
                <UserDetail label="Phone" value={employee.contact_number} />
                <UserDetail label="Address" value={employee.address} />
                <UserDetail label="Department" value={employee.department || "Unassigned"} />
                <UserDetail label="Role" value={employee.user.role} last />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const UserDetail = ({ label, value, last = false }) => (
  <>
    <div className="row mb-2">
      <div className="col-sm-4"><strong>{label}</strong></div>
      <div className="col-sm-8"><p className="text-muted mb-0">{value || "-"}</p></div>
    </div>
    {!last && <hr />}
  </>
);

export default UserProfile;
