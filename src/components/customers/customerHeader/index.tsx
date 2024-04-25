import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useTranslation } from "react-i18next";

interface CustomerHeaderProps {
  orderVal: string;
  searchQueryVal: string;
  onSearch: (value: string) => void;
  onSelectShow: (value: number) => void;
  onSelectOrderBy: (value: string) => void;
}

const CustomerHeader = ({
  orderVal,
  searchQueryVal,
  onSearch,
  onSelectShow,
  onSelectOrderBy,
}: CustomerHeaderProps) => {
  const { t } = useTranslation(["customers"]);

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  const handleSelectChange = (value: number) => {
    onSelectShow(value);
  };

  const handleOrderBy = (value: string) => {
    onSelectOrderBy(value);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" height={40} mb={1}>
        <TextField
          id="outlined-basic"
          size="small"
          variant="outlined"
          onChange={handleSearchSubmit}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "300px",
            height: "30px",
            outline: "none",
            "&:hover": {
              borderColor: "#DDDDD",
            },
          }}
          placeholder={t("search-customer")}
          value={searchQueryVal}
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Select
            defaultValue={10}
            onChange={(e) => handleSelectChange(e.target.value as number)}
            variant="outlined"
            size="small"
            sx={{
              color: "#B5B6C2",
              borderColor: "#B5B6C2",
              "&:hover": {
                borderColor: "#DDD",
              },
            }}
          >
            <MenuItem value={10}>
              {t("show")} {t("10")}
            </MenuItem>
            <MenuItem value={20}>
              {t("show")} {t("20")}
            </MenuItem>
            <MenuItem value={50}>
              {t("show")} {t("50")}
            </MenuItem>
            <MenuItem value={undefined + "All"}>
              {t("show")} {t("all")}
            </MenuItem>
          </Select>
          <Button
            variant="outlined"
            sx={{
              color: "#B5B6C2",
              borderColor: "#B5B6C2",
              textTransform: "none",
              "&:hover": {
                borderColor: "#DDD",
              },
            }}
            endIcon={<SwapVertIcon />}
            onClick={() => handleOrderBy(orderVal === "desc" ? "asc" : "desc")}
          >
            {t("date")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CustomerHeader;
