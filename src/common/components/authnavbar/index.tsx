import { Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import APP_LOGO from "../../../assets/slug-admin.png";
import TranslateIcon from "@mui/icons-material/Translate";

const AuthNavigation = () => {
  const { t } = useTranslation("authentication");

  return (
    <>
      <Box
        sx={{
          width: 100,
          height: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          src={APP_LOGO}
          alt="SLUG-ADMIN"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TranslateIcon />

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

export default AuthNavigation;
