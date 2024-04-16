import { Box } from "@mui/material";
import CustomerHeader from "./customerHeader";
import { useState } from "react";
import CustomerCard from "./customerCard";
import { mockCustomers } from "./mock";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [CountQuery, setSelectedCount] = useState<number | string>(10);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelectChange = (value: number | string) => {
    setSelectedCount(value);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          padding: 2,
          height: "calc(100vh - 180px)",
        }}
      >
        <CustomerHeader
          onSearch={handleSearch}
          onSelectShow={handleSelectChange}
        />

        <Box
          sx={{
            height: "100%",
            display: "flex",
            overflowY: "auto",
            padding: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "start",
            gap: 3,
          }}
        >
          {mockCustomers.map((customer) => (
            <CustomerCard customer={customer} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Customers;
