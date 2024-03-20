import { Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

const AuthNaviagtion = () => {
  const { t } = useTranslation("authentication");

  return (
    <>
      <Box sx={{ width: 50, height: 50 }}>
        <img
          style={{
            width: "100%",
            objectFit: "cover",
            borderRadius: 13,
          }}
          src="https://img.freepik.com/premium-vector/freelance-sticker-logo-icon-vector-man-with-desktop-blogger-with-laptop-icon-vector-isolated-background-eps-10_399089-1098.jpg"
          alt="SLUG-ADMIN"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Link href={`/auth/login`} underline="none">
          {t("login")}
        </Link>

        <Link href={`/auth/register`} underline="none">
          {t("register")}
        </Link>

        <Link href={`/auth/help`} underline="none">
          {t("help")}
        </Link>
      </Box>
    </>
  );
};

export default AuthNaviagtion;
