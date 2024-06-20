import { useForm } from "react-hook-form";
import { IErrorResponse } from "../../../interfaces";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState, MouseEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordValidation } from "../../../validations";
import { IAuth, IAuthResponse } from "../../../interfaces/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, TextField, Typography, InputAdornment, IconButton, Box } from "@mui/material";
// import useUser from "../../../hooks/useUser";
import LockIcon from "@mui/icons-material/Lock";
// import AuthService from "../../../services/auth";
import Logo from "../../../assets/images/logo.png";
import useSnackbar from "../../../hooks/useSnackbar";

const ResetPassword = () => {
  // const authService = AuthService();
  const navigate = useNavigate();
  // const { user } = useUser();
  const { id } = useParams();
  const { snackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IAuth>({
    resolver: joiResolver(ResetPasswordValidation),
  });


  // useEffect(() => {
  //   if (user?.name?.length) {
  //     navigate("/");
  //   }
  // }, [user]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (data: IAuth) => {
    const payload = {
      ...data
    };
    delete payload.confirmPassword;
    try {
      // const auth = await authService.resetPassword(payload, id ? id : "") as IAuthResponse;
      // snackbar(auth.message, "info");
      navigate("/login");

    } catch (error) {
      const err = error as IErrorResponse;
      snackbar(err.data.message, "warning");
      console.log("error in reset password: ", error);
    }
  };

  return (
    <Box className="login-container center" flexDirection="column">
      <img alt="logo" src={Logo} width="63" height="66" />
      <Typography className="margin-top-40 fw-bold welcome" variant="h5">Welcome to ATS!</Typography>
      <p className="sub-text grey-500">Helping you to manage and hire candidates</p>
      <Box className='credential-box' marginTop="40px" marginX="10px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Password*"
            className="mb-3"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="Confirm Password*"
            className="mb-3"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" className="margin-top-40 height-50" fullWidth>Set Password</Button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;