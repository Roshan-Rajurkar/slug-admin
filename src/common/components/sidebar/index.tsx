import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import APP_LOGO from "../../../assets/slug-admin.png";
import { NavigationType } from "../../modals";
import { useNavigate } from "react-router-dom";
import { useDrawer } from "../../hooks";
import { Button } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

type SideNavigationProps = {
  navigation: NavigationType[];
  onNavigationClick: (index: number) => void;
};

const SideNavigation = ({
  navigation,
  onNavigationClick,
}: SideNavigationProps) => {
  const navigate = useNavigate();

  const { isOpen, open, close } = useDrawer(true);

  const DrawerList = (
    <Box sx={{ width: isOpen ? 200 : 60, overflow: "hidden" }}>
      <Box
        sx={{
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
          paddingBottom: 1.7,
          border: "1px solid #EEE",
        }}
      >
        {isOpen && (
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src={APP_LOGO}
            alt="SLUG-ADMIN"
          />
        )}

        <Button
          onClick={() => {
            isOpen ? close() : open();
          }}
        >
          {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </Button>
      </Box>

      <List>
        {navigation.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/app/${item.href}`);
                onNavigationClick(index);
              }}
              sx={
                item.active
                  ? {
                      backgroundColor: "#EEE",
                      "&:hover": {
                        backgroundColor: "#EEE",
                      },
                      color: "blue",
                    }
                  : {} && {
                      paddingRight: 2,
                      paddingLeft: 2,
                    }
              }
            >
              <ListItemIcon
                sx={
                  item.active
                    ? {
                        color: "blue",
                        backgroundColor: "#EEE",
                        "&:hover": {
                          backgroundColor: "#EEE",
                        },
                      }
                    : {}
                }
              >
                {item.icon}
              </ListItemIcon>
              {isOpen && <ListItemText primary={item.name} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      sx={{
        position: "relative",
        top: 0,
        height: "100%",
        width: isOpen ? 200 : 60,
        transition: "width 0.2s ease-in-out",
      }}
      variant="persistent"
      open={true}
    >
      {DrawerList}
    </Drawer>
  );
};

export default SideNavigation;
