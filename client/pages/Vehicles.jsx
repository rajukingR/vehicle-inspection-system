import React from "react";
import DynamicTable from "../components/table-format/DynamicTable";

export default function Vehicles() {
  // 🔹 Table Columns
  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Product Name" },
    { id: "quantity", label: "Quantity" },
    { id: "price", label: "Price" },
    { id: "distributor_price", label: "Distributor Price" },
    { id: "view", label: "View" },
    { id: "action", label: "Action" },
  ];

  // 🔹 Dummy Products Data
  const products = [
    {
      id: "PRD001",
      name: "Virgin Coconut Oil",
      quantity: "500 ml",
      price: "₹750",
      distributor_price: "₹180",
    },
    {
      id: "PRD002",
      name: "Virgin Coconut Oil",
      quantity: "500 ml",
      price: "₹750",
      distributor_price: "₹180",
    },
    {
      id: "PRD003",
      name: "Virgin Coconut Oil",
      quantity: "1 Litra",
      price: "₹1,450",
      distributor_price: "₹180",
    },
    {
      id: "PRD004",
      name: "Virgin Coconut Oil",
      quantity: "5 Litres",
      price: "₹5,500",
      distributor_price: "₹175",
    },
    {
      id: "PRD005",
      name: "Virgin Coconut Hair Oil",
      quantity: "500 ml",
      price: "₹750",
      distributor_price: "₹175",
    },
    {
      id: "PRD006",
      name: "Virgin Coconut Hair Oil",
      quantity: "1 Litra",
      price: "₹1,400",
      distributor_price: "₹170",
    },
    {
      id: "PRD007",
      name: "Coconut Cooking Oil",
      quantity: "1 Litra",
      price: "₹1,200",
      distributor_price: "₹165",
    },
    {
      id: "PRD008",
      name: "Coconut Cooking Oil",
      quantity: "5 Litres",
      price: "₹5,000",
      distributor_price: "₹160",
    },
    {
      id: "PRD009",
      name: "Organic Coconut Oil",
      quantity: "500 ml",
      price: "₹850",
      distributor_price: "₹190",
    },
    {
      id: "PRD010",
      name: "Organic Coconut Oil",
      quantity: "1 Litra",
      price: "₹1,600",
      distributor_price: "₹195",
    },
  ];

  // 🔹 Handlers
  const handleAdd = () => {
    console.log("Add Product");
  };

  const handleView = (row) => {
    console.log("View Product:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete Product:", row);
  };

  const handleFilter = () => {
    console.log("Filter Products");
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl font-semibold mb-4">Products</h1>

      <DynamicTable
        columns={columns}
        rows={products}
        rowsPerPage={5}
        onAdd={handleAdd}
        onView={handleView}
        onDelete={handleDelete}
        onFilter={handleFilter}
      />
    </div>
  );
}
