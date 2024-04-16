import { Block } from "@mui/icons-material";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useTranslation } from "react-i18next";

interface CustomerCardProps {
  customer: any;
}

const CustomerCard = ({ customer }: CustomerCardProps) => {
  const { t } = useTranslation("customers");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "220px",
        height: "220px",
        position: "relative",
        border: `2px solid #F2F2F2`,
        boxShadow: `${
          customer.blocked ? "rgba(208, 72, 72, 0.48) 2px 2px 0px 0px" : ""
        }`,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ backgroundColor: "#FFDDB9", height: "30%", width: "100%" }} />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          width={80}
          height={80}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            mixBlendMode: "normal",
            backgroundColor: "transparent",
            border: "2px solid white",
          }}
          src={customer.profileImg}
          alt="customer profile"
        />

        <Box
          mt={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#323232",
              fontWeight: "bold",
            }}
          >
            {customer.username || "-"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
            }}
          >
            {customer.email || "-"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Tooltip title={t("view-details")}>
              <Button
                variant="outlined"
                // size="small"
                sx={{
                  marginTop: 1,
                  paddingY: 1,
                  fontWeight: "bold",
                  textTransform: "none",
                  color: "#323232",
                  border: "1px solid rgb(236,236,236)",
                  "&:hover": {
                    border: "1px solid #FFFFFF",
                  },
                }}
                disabled={customer.blocked}
              >
                {t("view")}
              </Button>
            </Tooltip>

            {customer.blocked ? (
              <Tooltip title={t("unblock")}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    marginTop: 1,
                    paddingY: 1,
                    fontWeight: "bold",
                    textTransform: "none",
                    color: "#17B978",
                    border: "1px solid #17B978",
                    "&:hover": {
                      border: "1px solid #17B978",
                    },
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title={t("block")}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    marginTop: 1,
                    paddingY: 1,
                    fontWeight: "bold",
                    textTransform: "none",
                    color: "red",
                    border: "1px solid #A34343",
                    "&:hover": {
                      border: "1px solid #A34343",
                    },
                  }}
                >
                  <Block />
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerCard;
