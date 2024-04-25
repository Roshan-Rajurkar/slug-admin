import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import { Button, Avatar, Typography, Popper } from "@mui/material";
import USER_PROFILE from "../../../assets/slug-admin.png";
import { useGetProfile, useLogout } from "../../../components/auth/service";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Output } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  border: "1px solid #DDDDDD",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  padding: 2,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#DDDDDD",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

export default function AppNavigation() {
  const { t } = useTranslation(["dashboard", "authentication"]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : event.currentTarget));
  }, []);

  const { data: currentUser, isLoading } = useGetProfile();
  const { mutate: logout } = useLogout();

  const open = Boolean(anchorEl);
  const id = open ? "user-popper" : undefined;

  const handleLogout = useCallback(async () => {
    try {
      logout();
      navigate("/auth/login");
      toast.success(t("logout-successfully", { ns: "authentication" }));
    } catch (error) {
      toast.success(t("something-went-wrong", { ns: "translation" }));
    }
  }, [logout, navigate, t]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
        }}
      >
        <Toolbar>
          <Search
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": `${t("search")}` }}
              sx={{ width: "100%" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex", gap: 8 } }}>
            <IconButton size="large" aria-label="show 17 new notifications">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Box
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                padding: 1,
              }}
            >
              <Avatar
                alt="NAME"
                src={!isLoading ? USER_PROFILE : ""}
                sx={{
                  width: 36,
                  height: 36,
                  border: "1px solid #DDDDDD",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingX: 1,
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              >
                {isLoading ? (
                  <Typography variant="subtitle1" color="text.secondary">
                    {t("loading")}
                  </Typography>
                ) : (
                  <>
                    <Typography variant="subtitle1" color="text.primary">
                      {currentUser?.username || "roshan09096"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {currentUser?.email || "roshan@gmail.com"}
                    </Typography>
                  </>
                )}
              </Box>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom"
                sx={{
                  border: "none",
                  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.1)",
                  "&[data-popper-reference-hidden]": {
                    display: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    border: 1,
                    p: 1,
                    bgcolor: "background.paper",
                    width: 150,
                  }}
                >
                  <Button
                    fullWidth
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                    startIcon={<Output />}
                    onClick={handleLogout}
                  >
                    {t("sign-out", { ns: "authentication" })}
                  </Button>
                </Box>
              </Popper>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
