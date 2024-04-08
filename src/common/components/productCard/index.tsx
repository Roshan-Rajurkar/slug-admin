import React from "react";
import { Product } from "../../../components/products/modals";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type ProductCardProps = {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
};

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 230, margin: 0, padding: 0 }}>
      <CardMedia
        component="img"
        height="130"
        image={product.imageUrl}
        alt="Product Image"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
          ${product.price}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button startIcon={<EditIcon />}>Edit</Button>
          <Button color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
