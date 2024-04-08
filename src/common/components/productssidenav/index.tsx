import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { NavigationType } from "../../modals";
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";

type ProductsSideNavProps = {
  navigation: NavigationType[];
  onNavigationClick: (index: number) => void;
};

const ProductsSideNav = ({
  navigation,
  onNavigationClick,
}: ProductsSideNavProps) => {
  const location = useLocation();

  const handleItemClick = (index: number) => {
    onNavigationClick(index);
  };

  return (
    <Box
      sx={{
        width: 120,
        // height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <MoveDownRoundedIcon sx={{ color: "blue", padding: 1 }} />
      </Box>
      <List>
        {navigation.map((item, index) => (
          <ListItemButton
            key={item.href}
            component={Link}
            to={item.href}
            selected={location.pathname.split("/")[3] === item.href}
            onClick={() => handleItemClick(index)}
            sx={{
              margin: 0,
              paddingX: 1,
            }}
          >
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ProductsSideNav;
