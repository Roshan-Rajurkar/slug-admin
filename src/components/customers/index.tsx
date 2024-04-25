import { Box, Typography } from "@mui/material";
import CustomerHeader from "./customerHeader";
import { useState } from "react";
import CustomerCard from "./customerCard";
// import { mockCustomers } from "./mock";
import { useGetCustomers } from "./services";
import FullScreenLoader from "../../common/components/fullscreenloader";
import { useTranslation } from "react-i18next";

const Customers = () => {
  const { t } = useTranslation("customers");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [limit, setSelectedCount] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState<string>("desc");

  const { data: customers, isLoading } = useGetCustomers({
    searchQuery,
    limit,
    orderBy,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelectChange = (value: number) => {
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
          searchQueryVal={searchQuery}
          orderVal={orderBy}
          onSelectOrderBy={setOrderBy}
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
          {isLoading ? (
            <FullScreenLoader />
          ) : customers.length === 0 ? (
            <Typography>{t("no-match-customers")}</Typography>
          ) : (
            customers.map((customer: any) => (
              <CustomerCard customer={customer} />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default Customers;
