// pages/users/[id].js
"use client";
import Link from "next/link";
import Left from "../../../components/Left";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";

function UserDetail() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [user, setUser] = useState(null);

  const [confirmUpdate, setConfirmUpdate] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/usersdata/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "checkbox" ? (checked ? "active" : "inactive") : value;

    setUser((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      // Show confirmation dialog
      setConfirmUpdate(true);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const confirmUpdateUser = async () => {
    try {
      const response = await fetch(`/api/usersdata/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // User update successful
        alert("User updated successfully");
      } else {
        console.error("Error updating user:", response.status);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      // Hide confirmation dialog
      setConfirmUpdate(false);
    }
  };

  const cancelUpdate = () => {
    // Hide confirmation dialog
    setConfirmUpdate(false);
  };

  return (
    <div id="updatePage">
      <Left />

      <div id="updateContainer">


        <div className="inline-block">
          <Link href="/users" className="inline text-lg font-medium text-gray-400">
            <HiArrowLongLeft style={{height:"2em", width:"2em"}} className="inline-block mr-2" />
            Back to Users
          </Link>
        </div>


        <h1 id="updateFormHeader" className=" font-bold text-gray-600">Update User</h1>

        <div id="updateForm">
          <div className="form-row">
            <label>Name</label>
            <input
              type="text"
              value={user.fullName}
              name="fullName"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Mail</label>
            <input
              type="text"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input
              type="text"
              value={user.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Role</label>
            <select value={user.role} name="role" onChange={handleChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="form-switch">
            <div className="flex items-center">
                <span className="pr-4 text-sm font-medium text-gray-600">
                  {user.status === "active" ? "Active" : "Inactive"}
                </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={user.status === "active"}
                    name="status"
                    onChange={handleChange}
                  />
                  <span className="slider"></span>
                </label>
            </div>
          </div>

        </div>

        <div id="updateButton">
          <div className=" flex flex-col ">
            {/* <button onClick={() => window.history.back()}>Cancel</button> */}
          </div>

          <div className=" flex flex-col ml-64">
            <button onClick={handleUpdateUser}>Update User</button>
          </div>
        </div>

        {confirmUpdate && (
          <div id="confirmUpdateModal">
            <div id="confirmUpdateContent">
              <h3>Confirm Changes</h3>
              <p>Are you sure you want to update the user information?</p>
              <div className="confirmButtonContainer">
                <button
                  onClick={confirmUpdateUser}
                  className="confirmButton confirmButtonYes"
                >
                  Yes
                </button>
                <button
                  onClick={cancelUpdate}
                  className="confirmButton confirmButtonNo"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default UserDetail;
