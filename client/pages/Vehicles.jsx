import React from "react";
import DynamicTable from "../components/table-format/DynamicTable";

export default function Vehicles() {
  /* 🔹 VEHICLE TABLE COLUMNS (DATA ONLY) */
  const columns = [
    { id: "v_id", label: "Vehicle ID" },
    { id: "vehicle_number", label: "Vehicle Number" },
    { id: "vehicle_type", label: "Vehicle Type" },
    { id: "brand", label: "Brand" },
    { id: "model", label: "Model" },
    { id: "owner_name", label: "Owner Name" },
    { id: "status", label: "Status" },
  ];

  /* 🔹 VEHICLE DATA */
  const vehicles = [
    {
      id: 1,
      v_id: "VEH001",
      vehicle_number: "TN 09 AB 1234",
      vehicle_type: "Car",
      brand: "Hyundai",
      model: "i20",
      owner_name: "Ramesh Kumar",
      status: "Active",
    },
    {
      id: 2,
      v_id: "VEH002",
      vehicle_number: "KA 05 CD 5678",
      vehicle_type: "Bike",
      brand: "Royal Enfield",
      model: "Classic 350",
      owner_name: "Suresh",
      status: "Active",
    },
    {
      id: 3,
      v_id: "VEH003",
      vehicle_number: "AP 31 EF 9988",
      vehicle_type: "Car",
      brand: "Tata",
      model: "Nexon",
      owner_name: "Mahesh",
      status: "Inactive",
    },
    {
      id: 4,
      v_id: "VEH004",
      vehicle_number: "TS 10 GH 4455",
      vehicle_type: "Truck",
      brand: "Ashok Leyland",
      model: "1616",
      owner_name: "Logistics Pvt Ltd",
      status: "Active",
    },
    {
      id: 5,
      v_id: "VEH005",
      vehicle_number: "TN 22 JK 7788",
      vehicle_type: "Car",
      brand: "Maruti",
      model: "Swift",
      owner_name: "Anitha",
      status: "Active",
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl font-semibold mb-4">Vehicle Master</h1>

      <DynamicTable
        columns={columns}
        rows={vehicles}
        rowsPerPage={5}
      />
    </div>
  );
}
