import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { NavigationType } from "../../modals";

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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <List
        sx={{
          backgroundColor: "#fff",
        }}
      >
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
            <ListItemText
              sx={{ width: "100%", fontSize: "1rem" }}
              primary={item.name}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ProductsSideNav;
