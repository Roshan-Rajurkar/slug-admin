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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterForm } from "../modal";
import { useSignUp } from "../service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function AuthRegister() {
  const { t } = useTranslation(["authentication", "translation"]);

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required(t("required", { ns: "translation" }))
      .min(6, t("min-length", { min: 6 }))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        t("username-validation"),
      ),
    email: yup
      .string()
      .email(t("invalid-email"))
      .required(t("required", { ns: "translation" })),
    password: yup
      .string()
      .required(t("required", { ns: "translation" }))
      .min(6, t("min-length", { min: 6 })),
  });

  const { mutate: signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSignUp = useCallback(
    (data: RegisterForm) => {
      if (data) {
        signUp(data, {
          onSuccess: () => {
            toast.success(t("sign-up-successfully"));
            navigate("/auth/login");
          },
          onError: () => {
            toast.error(t("something-went-wrong", { ns: "translation" }));
          },
        });
      }
    },
    [signUp, navigate, t],
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
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("sign-up")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSignUp)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={t("username")}
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username && errors.username.message}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("email")}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label={t("password")}
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            {t("sign-up")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                {t("already-have-account")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 8, mb: 4 }}
      >
        {"Copyright © "}
        <Link color="inherit" href="">
          SLUG ADMIN
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}

export default AuthRegister;
