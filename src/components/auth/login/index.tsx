import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import { LoginForm } from "../modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn } from "../service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function AuthLogin() {
  const { t } = useTranslation(["authentication", "translation"]);

  const navigate = useNavigate();

  const { mutate: signIn, isLoading } = useSignIn();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("invalid-email"))
      .required(t("required", { ns: "translation" })),
    password: yup.string().required(t("required", { ns: "translation" })),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const handleLoginIn = useCallback(
    (data: LoginForm) => {
      if (data) {
        signIn(data, {
          onSuccess: () => {
            toast.success(t("sign-in-successfully"));
            navigate("/app/");
          },
          onError: () => {
            toast.error(t("something-went-wrong", { ns: "translation" }));
          },
        });
      }
    },
    [signIn, navigate, t],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("sign-in")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLoginIn)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("email")}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            {...register("email")}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password")}
            label={t("password")}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant={isLoading ? "outlined" : "contained"}
            sx={{ mt: 2, mb: 2 }}
          >
            {isLoading ? t("signing") : t("sign-in")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/register" variant="body2">
                {t("dont-have-an-account")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default AuthLogin;
