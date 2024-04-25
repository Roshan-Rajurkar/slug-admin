import React from "react";
import { Product } from "../../../components/products/modals";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "../../../components/products/service";
import { Loop } from "@mui/icons-material";
import { toast } from "react-toastify";

type ProductCardProps = {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
};

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const { t } = useTranslation(["products", "translation"]);
  const navigate = useNavigate();

  const { mutate: deleteProduct, isLoading } = useDeleteProduct();

  return (
    <Card
      sx={{
        maxWidth: 200,
        maxHeight: 230,
        margin: 0,
        padding: 0,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="130"
          image={product.imageUrl}
          alt="Product Image"
          sx={{
            objectFit: "cover",
          }}
        />
        {!product.published && (
          <Chip
            label="Not Published"
            size="small"
            color="error"
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
            }}
          />
        )}
      </Box>
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: "bold",
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
            ₹{product.price}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<EditIcon />}
            onClick={() =>
              navigate(`/app/products/edit_product/${product._id}`)
            }
          >
            {t("edit", { ns: "translation" })}
          </Button>
          <Button
            color="error"
            startIcon={isLoading ? <Loop /> : <DeleteIcon />}
            onClick={() =>
              deleteProduct(product._id, {
                onSuccess: () => {
                  toast.success(t("product-deleted-successfully"));
                },
                onError: () => {
                  toast.error(t("something-went-wrong", { ns: "translation" }));
                },
              })
            }
          >
            {t("delete", { ns: "translation" })}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
