import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CloudUpload, Adjust, Loop } from "@mui/icons-material";
import VisuallyHiddenInput from "../../../common/components/visuallyHiddenInput";
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
import { useAddProduct, useGetProductById, useUpdateProduct } from "../service";
import { toast } from "react-toastify";
import FullScreenLoader from "../../../common/components/fullscreenloader";
import { ProductForm } from "../modals";

const AddEditProduct = () => {
  const { t } = useTranslation(["products", "translation"]);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const isEditMode = useMemo(() => !!id, [id]);

  const { mutate: addProduct, isLoading: isAdding } = useAddProduct();
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();
  const { data: product, isLoading: isEditLoading } = useGetProductById(
    id || "",
  );

  const [fileName, setFileName] = useState<string | null>(null);

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("required", { ns: "translation" })),
    description: yup.string().required(t("required", { ns: "translation" })),
    price: yup.number().required(t("required", { ns: "translation" })),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductForm>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      published: false,
    },
  });

  useEffect(() => {
    if (isEditMode && product) {
      reset({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        published: product.published || false,
      });
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        published: false,
      });
    }
  }, [reset, isEditMode, product]);
  const handleProductSubmit = (data: ProductForm) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());

    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    if (isEditMode) {
      formData.append("published", data.published ? "true" : "false");
      updateProduct(
        { productId: id || "", product: formData },
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
      formData.append("published", "false"); // Assuming default is not published
      addProduct(formData, {
        onSuccess: () => {
          toast.success(t("product-added-successfully"));
          navigate("../");
        },
        onError: () => {
          toast.error(t("something-went-wrong", { ns: "translation" }));
        },
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

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

          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            {fileName || t("upload-image")}
            <VisuallyHiddenInput
              type="file"
              {...register("file")}
              onChange={handleFileChange}
              accept="image/png, image/gif, image/jpeg"
            />
          </Button>

          <FormControl fullWidth sx={{ margin: "20 0 " }}>
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
          >
            <FormControlLabel
              control={
                <Controller
                  name="published"
                  control={control}
                  render={({ field }) => (
                    <Switch {...field} color="error" name="checkProduct" />
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
