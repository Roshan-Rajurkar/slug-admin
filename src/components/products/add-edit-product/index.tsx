import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Typography,
  Box,
  FormControl,
  Input,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "../modals";
import { useAddProduct, useGetProductById, useUpdateProduct } from "../service";
import { toast } from "react-toastify";
import FullScreenLoader from "../../../common/components/fullscreenloader";
import { Adjust, Loop } from "@mui/icons-material";

const AddEditProduct = () => {
  const { t } = useTranslation(["products", "translation"]);
  const { id } = useParams<{ id?: string }>();

  const isEditMode = useMemo(() => !!id, [id]);

  const navigate = useNavigate();

  const { mutate: addProduct, isLoading: isAdding } = useAddProduct();
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();
  const { data: product, isLoading: isEditLoading } = useGetProductById(
    id || "",
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("required", { ns: "translation" })),
    description: yup.string().required(t("required", { ns: "translation" })),
    price: yup.number().required(t("required", { ns: "translation" })),
  });

  const productEditMock = {
    name: "Product edit name",
    description: "Product description edit",
    price: 200,
    published: true,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductForm>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: !isEditMode
      ? { name: "", description: "", price: 0, published: false }
      : productEditMock,
  });

  const handleProductSubmit = (data: ProductForm) => {
    if (data) {
      if (isEditMode) {
        // edit product
        updateProduct(
          {
            productId: id || "",
            product: data,
          },
          {
            onSuccess: () => {
              toast.success(t("product-edited-successfully"));
              navigate("../");
            },
            onError: () => {
              toast.error(t("something-went-wrong", { ns: "translation" }));
            },
          },
        );
      } else {
        addProduct(data, {
          onSuccess: () => {
            toast.success(t("product-added-successfully"));
            navigate("../");
          },
          onError: () => {
            toast.error(t("something-went-wrong", { ns: "translation" }));
          },
        });
      }
    }
  };

  useEffect(() => {
    if (isEditMode && product) {
      reset(product);
    } else {
      reset({ name: "", description: "", price: 0, published: false });
    }
  }, [reset, isEditMode, product]);

  if (isEditLoading) return <FullScreenLoader />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          width: 700,
          paddingY: 2,
          paddingX: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" marginBottom={2} fontWeight="bold">
          {isEditMode ? t("edit-product") : t("create-product")}
        </Typography>

        <form onSubmit={handleSubmit(handleProductSubmit)}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Typography sx={{ color: "text.secondary" }}>
              {t("name")}
            </Typography>
            <Input
              id="product-name"
              placeholder={t("enter-name")}
              {...register("name")}
            />

            {errors.name && (
              <Typography color="error">{errors.name.message}</Typography>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Typography sx={{ color: "text.secondary" }}>
              {t("description")}
            </Typography>
            <Input
              id="product-description"
              multiline
              placeholder={t("type-here")}
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <Typography color="error">
                {errors.description.message}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Typography sx={{ color: "text.secondary" }}>
              {t("price")}
            </Typography>
            <Input
              id="product-price"
              type="number"
              placeholder={t("enter-price")}
              {...register("price")}
            />
            <Typography sx={{ color: "#A34343" }}>
              *{t("price-in-rupees")}
            </Typography>
          </FormControl>

          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            component="fieldset"
            variant="standard"
            {...register("published")}
          >
            <FormControlLabel
              control={
                <Controller
                  name="published"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      defaultChecked={isEditMode && productEditMock?.published}
                      color="error"
                      name="check product"
                    />
                  )}
                />
              }
              label={t("publish-on-app")}
            />
          </FormControl>

          <Button
            startIcon={isAdding || isUpdating ? <Loop /> : <Adjust />}
            type="submit"
            variant="contained"
            color="primary"
          >
            {t("submit-item")}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddEditProduct;
