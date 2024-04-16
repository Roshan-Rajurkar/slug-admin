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
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface CustomerHeaderProps {
  onSearch: (value: string) => void;
  onSelectShow: (value: number | string) => void;
}

const CustomerHeader = ({ onSearch, onSelectShow }: CustomerHeaderProps) => {
  const { t } = useTranslation(["customers"]);

  const handleSeachSubmit = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch],
  );

  const handleSelectChange = (value: number | string) => {
    onSelectShow(value);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" height={40} mb={1}>
        <TextField
          id="outlined-basic"
          size="small"
          variant="outlined"
          onChange={handleSeachSubmit}
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
            onChange={(e) =>
              handleSelectChange(e.target.value as number | string)
            }
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
              {t("show")} {t("30")}
            </MenuItem>
            <MenuItem value={"all"}>
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
          >
            {t("date")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CustomerHeader;
