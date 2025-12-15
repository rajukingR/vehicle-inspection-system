import React from "react";
import DynamicTable from "../components/table-format/DynamicTable";
import { useDispatch, useSelector } from "react-redux";

const Members = () => {




  const { user } = useSelector((state) => state.auth);
  const loginRole = user?.role_name;
  // 🔹 Table Columns
  const columns = [
    { id: "name", label: "Member Name" },
    { id: "role", label: "Role" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "status", label: "Status" },

  ];


  // 🔹 10 Dummy Members
  const members = [
    {
      id: 1,
      name: "Ramesh Kumar",
      role: "Admin",
      email: "ramesh@gmail.com",
      phone: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      name: "Suresh Naidu",
      role: "Manager",
      email: "suresh@gmail.com",
      phone: "9876543211",
      status: "Active",
    },
    {
      id: 3,
      name: "Anitha Rao",
      role: "Sales",
      email: "anitha@gmail.com",
      phone: "9876543212",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Kiran Patel",
      role: "Sales",
      email: "kiran@gmail.com",
      phone: "9876543213",
      status: "Active",
    },
    {
      id: 5,
      name: "Priya Sharma",
      role: "HR",
      email: "priya@gmail.com",
      phone: "9876543214",
      status: "Active",
    },
    {
      id: 6,
      name: "Vijay Singh",
      role: "Accountant",
      email: "vijay@gmail.com",
      phone: "9876543215",
      status: "Inactive",
    },
    {
      id: 7,
      name: "Sneha Reddy",
      role: "Marketing",
      email: "sneha@gmail.com",
      phone: "9876543216",
      status: "Active",
    },
    {
      id: 8,
      name: "Rahul Verma",
      role: "Support",
      email: "rahul@gmail.com",
      phone: "9876543217",
      status: "Active",
    },
    {
      id: 9,
      name: "Neha Gupta",
      role: "Support",
      email: "neha@gmail.com",
      phone: "9876543218",
      status: "Inactive",
    },
    {
      id: 10,
      name: "Arjun Mehta",
      role: "Manager",
      email: "arjun@gmail.com",
      phone: "9876543219",
      status: "Active",
    },
  ];

  // 🔹 Handlers
  const handleAdd = () => {
    console.log("Add Member clicked");
  };

  const handleView = (row) => {
    console.log("View Member:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete Member:", row);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Members</h1>

      <DynamicTable
        columns={columns}
        rows={members}
        rowsPerPage={5}
        onAdd={handleAdd}
        onView={handleView}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Members;
