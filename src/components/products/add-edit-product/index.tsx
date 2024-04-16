import React, { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import { useParams } from "react-router-dom";
import { ProductForm } from "../modals";

const AddEditProduct = () => {
  const { t } = useTranslation(["products", "translation"]);
  const { id } = useParams<{ id?: string }>();

  const isEdit = useMemo(() => !!id, [id]);

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("required", { ns: "translation" })),
    description: yup.string().required(t("required", { ns: "translation" })),
    price: yup.string().required(t("required", { ns: "translation" })),
  });

  const productEditMock = {
    name: "Product edit name",
    description: "Product description edit",
    price: "200",
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
    defaultValues: !isEdit
      ? { name: "", description: "", price: "", published: false }
      : productEditMock,
  });

  const handleProductSubmit = (data: ProductForm) => {
    console.log(data);
  };

  useEffect(() => {
    if (!isEdit)
      reset({ name: "", description: "", price: "", published: false });
    else {
      // getProduct by Id and reset it
    }
  }, [reset, isEdit]);

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
          {isEdit ? t("edit-product") : t("create-product")}
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
                      defaultChecked={isEdit && productEditMock?.published}
                      color="error"
                      name="check product"
                    />
                  )}
                />
              }
              label={t("publish-on-app")}
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            {t("submit-item")}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddEditProduct;
