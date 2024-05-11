import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PrintIcon from "@mui/icons-material/Print";
import { Link, useParams } from "react-router-dom";
import { LocalShipping, LocationOn } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useGetOrderById, useUpdateOrderById } from "../services";
import FullScreenLoader from "../../../common/components/fullscreenloader";
import ProductTable from "../ordered-products-table";
import { toast } from "react-toastify";

const OrderView = () => {
  const { t } = useTranslation(["orders", "translation"]);

  const { id } = useParams();
  console.log(id);
  const { data: order, isLoading } = useGetOrderById(id as string);
  const { mutate: updateOrderStatus, isLoading: isOrderUpdating } =
    useUpdateOrderById();
  console.log(order);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isLoading && order) {
      setStatus(order.status);
    }
  }, [isLoading, order]);

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const handleSave = useCallback(() => {
    updateOrderStatus(
      { id: order._id, newStatus: status },
      {
        onSuccess: () => {
          toast.success(t("order-updated-successfully"));
        },
        onError: () => {
          toast.error(t("something-went-wrong", { ns: "translation" }));
        },
      },
    );
  }, [updateOrderStatus, status, order, t]);

  // const order = mockOrders[0]; // Get the first order from the mockOrders array

  if (isLoading) return <FullScreenLoader />;
  return (
    <>
      <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
        {t("details")}
      </Typography>
      <Box sx={{ backgroundColor: "#fff", padding: 2, marginTop: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <CalendarTodayIcon />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontSize={18} fontWeight={"bold"}>
                {order?.orderDate || "-"}
              </Typography>
              <Typography color="text.secondary" fontSize={14}>
                #{t("id")} {order._id}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={status}
                onChange={handleStatusChange}
                displayEmpty
                sx={{ height: 40 }}
              >
                <MenuItem value="">{t("change status")}</MenuItem>
                <MenuItem sx={{ backgroundColor: "#FFF9C4" }} value={"pending"}>
                  {t("pending")}
                </MenuItem>
                <MenuItem
                  sx={{ backgroundColor: "#B3E5FC" }}
                  value={"processing"}
                >
                  {t("processing")}
                </MenuItem>
                <MenuItem
                  sx={{ backgroundColor: "#C8E6C9" }}
                  value={"delivered"}
                >
                  {t("delivered")}
                </MenuItem>
                <MenuItem sx={{ backgroundColor: "#B2EBF2" }} value={"shipped"}>
                  {t("shipped")}
                </MenuItem>
                <MenuItem
                  sx={{ backgroundColor: "#CFD8DC" }}
                  value={"cancelled"}
                >
                  {t("cancelled")}
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              sx={{
                height: 40,
                marginLeft: 1,
                color: "text.secondary",
                fontWeight: "bold",
                borderColor: "text.secondary",
              }}
              onClick={handleSave}
            >
              {t("save")}
            </Button>

            <PrintIcon
              sx={{
                color: "text.secondary",
                padding: 1,
                marginLeft: 1,
                fontSize: 36,
                cursor: "pointer",
                "&:hover": {
                  color: "text.primary",
                },
              }}
            />
          </Box>
        </Box>

        <Divider
          sx={{
            margin: "10px 10px",
            height: "0.2px",
            backgroundColor: "#F5F5F5",
            borderRadius: 3,
          }}
        ></Divider>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <AccountCircleIcon
              sx={{
                width: 40,
                height: 40,
                color: "#3E64BC",
              }}
            />
            <Box>
              <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                {t("customer")}
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "text.secondary",
                }}
              >
                {order.customer.firstName} {order.customer.lastName}
              </Typography>
              <Typography fontSize={14}>{order.customer.email}</Typography>
              <Typography fontSize={14}>
                {order.customer.phoneNumber}
              </Typography>
              <Link to={"/"}>{t("view-profile")}</Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <LocalShipping
              sx={{
                width: 40,
                height: 40,
                color: "#3E64BC",
              }}
            />
            <Box>
              <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                {t("customer")}
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: "#757575", fontSize: 16 }}>
                  {t("shipping")} :{" "}
                </span>{" "}
                {order.shippingAddress.street}
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: "#757575", fontSize: 16 }}>
                  {t("payment-method")} :{" "}
                </span>{" "}
                {order?.paymentInfo?.method}
              </Typography>
              <Typography fontSize={14} color={"#FBCDD8"}>
                <span style={{ color: "#757575", fontSize: 16 }}>
                  {t("status")} :{" "}
                </span>{" "}
                {order.status}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <LocationOn
              sx={{
                width: 40,
                height: 40,
                color: "#3E64BC",
              }}
            />
            <Box>
              <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                {t("deliver-to")}
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: "#757575", fontSize: 16 }}>
                  {t("city")} :{" "}
                </span>{" "}
                {order.shippingAddress.city}, {order.shippingAddress.country}
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: "#757575", fontSize: 16 }}>
                  {t("street")} :{" "}
                </span>{" "}
                {order.shippingAddress.street}
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: "#757575", fontSize: 16 }}>
                  {t("address")} :{" "}
                </span>{" "}
                {`${order.shippingAddress.street} ${order.shippingAddress.city}`}
              </Typography>
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${order?.shippingAddress?.street}+${order?.shippingAddress?.city}+${order?.shippingAddress?.state}+${order?.shippingAddress?.country}`}
              >
                {t("open-map")}
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            gap: 3,
          }}
        >
          <ProductTable products={order.items} />
          {order.paymentInfo && order.paymentInfo.paymentStatus === "success" && (
            <Box sx={{ backgroundColor: "#F7F7F7", padding: 2, width: "100%" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                {t("payment-info")}
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                {order.paymentInfo.method}
              </Typography>
              <Typography>
                {t("id")} : {order.paymentInfo.paymentId}
              </Typography>
              <Typography>
                {t("phone-no")} : {order.paymentInfo.phoneNumber}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Typography>
                  {t("total")} : ₹ {order.paymentInfo.total}
                </Typography>
                <Chip
                  label={order.paymentInfo.paymentStatus}
                  color="success"
                  size="small"
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrderView;
