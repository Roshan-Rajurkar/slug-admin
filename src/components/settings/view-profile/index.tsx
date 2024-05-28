import { useCallback, useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  CameraAlt,
  Check,
  RotateLeft,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useUpdatePassword } from "../../auth/service";
import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ViewProfile = () => {
  const { t } = useTranslation(["settings", "translation"]);

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setPassword] = useState("");
  const id = "6622b366d01fc8f67c7f02c2";

  const { mutate: updatePassword, isLoading } = useUpdatePassword();

  useEffect(() => {
    setPassword("admin12345");
  }, []);

  const validationSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required(t("required", { ns: "translation" }))
      .min(6, t("min-length", { ns: "translation" })),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = useCallback(
    (data: { newPassword: string }) => {
      if (data) {
        updatePassword(
          { userId: id, newPassword: data.newPassword },
          {
            onSuccess: () => {
              toast.success(t("password-updated-successfully"));
            },
            onError: () => {
              toast.error(t("something went wrong", { ns: "translation" }));
            },
          },
        );
      }
    },
    [updatePassword, t],
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "300px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            height: "170px",
            backgroundColor: "#4285F4",
            position: "relative",
            display: "flex",
            padding: "0 10px",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 600 }}>
              Your Profile
            </Typography>

            <Button aria-label="Save profile" onClick={handleSubmit(onSubmit)}>
              {isLoading ? (
                <RotateLeft
                  sx={{
                    color: "white",
                    fontWeight: "bolder",
                    "&:hover": { background: "none" },
                  }}
                />
              ) : (
                <Check
                  sx={{
                    color: "white",
                    fontWeight: "bolder",
                    "&:hover": { background: "none" },
                  }}
                />
              )}
            </Button>
          </Box>

          <Box
            sx={{
              background: "#fff",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              objectFit: "contain",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROyKQ0BWPVl1GFKPRuWh6pe7apRHfVEL0C4X1TED9iJg&s"
              alt=""
              width={"100%"}
              height={"100%"}
            /> */}
            <CameraAlt sx={{ color: "#4285F4" }} />
          </Box>

          <Box>
            <Button
              component="label"
              role={"button"}
              tabIndex={-1}
              startIcon={<CameraAlt />}
              sx={{ color: "#fff", fontSize: "12px" }}
              disabled
            >
              Add a cover photo
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            height: "200px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            margin="normal"
            disabled
            value="user@example.com"
            placeholder="Enter your email"
          />
          <TextField
            fullWidth
            variant="standard"
            margin="normal"
            disabled
            value="example_user"
            placeholder="Enter your username"
          />

          <TextField
            fullWidth
            variant="standard"
            margin="normal"
            placeholder="Enter new password"
            type={showPassword ? "text" : "password"}
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword && errors.newPassword.message}
            value={newPassword}
            onChange={handleChangePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewProfile;
