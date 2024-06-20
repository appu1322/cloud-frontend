import "./style.scss";
import { useState, MouseEvent, useEffect } from "react";
import { Button, TextField, Typography, InputAdornment, IconButton, Box, Divider } from "@mui/material";
import { IAuth, IAuthResponse } from "../../../interfaces/auth";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { LoginValidation } from "../../../validations";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import AuthService from "../../../services/auth";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Logo from "../../../assets/images/logo.svg";
// import GoogleLogo from "../../../assets/images/google-logo.svg";
// import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../../../hooks/useSnackbar";
import { IErrorResponse } from "../../../interfaces";

const Login = () => {
  // const authService = AuthService();
  const navigate = useNavigate();
  // const { user } = useUser();
  const { snackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IAuth>({
    resolver: joiResolver(LoginValidation),
  });

  // useEffect(() => {
  //   if (user?.name?.length) {
  //     navigate("/");
  //   }
  // }, [user]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onLogin = async (credentials: IAuth) => {
    try {
      // const auth = await authService.login(credentials) as IAuthResponse;
      // localStorage.setItem("currentUserToken", auth.data.token);
      // snackbar(auth.message, "info");
      navigate("/dashboard");

    } catch (error) {
      const err = error as IErrorResponse;
      snackbar(err.data.message, "warning");
      console.log(error);
    }
  };

  // const generateCode = async () => {
  //   try {
  //     const auth = await authService.generateGoogleToken() as { data: string };
  //     window.open(auth.data, "_self");
  //   } catch (error) {
  //     const err = error as IErrorResponse;
  //     console.log("Error in google login", err);
  //   }
  // };

  return (
    <Box className="login-container center" flexDirection="column">
      <img alt="logo" src={Logo} width="63" height="66" />
      <Typography className="margin-top-40 fw-bold welcome" variant="h5">Welcome to cl!</Typography>
      <p className="sub-text grey-500">Helping you to manage and share assets</p>
      <Box className='credential-box' marginTop="40px" marginX="10px">
        <form onSubmit={handleSubmit(onLogin)}>
          <TextField
            placeholder="Email*"
            className="mb-3"
            {...register("email")}
            fullWidth
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            autoComplete="username"
          />
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
            autoComplete="current-password"
          />
          <div className='center'>
            <p className="margin-top-40 sub-text primary-color text-center pointer-cursor" onClick={() => navigate("/forgot-password")}>Forgot Password?</p>
          </div>
          <Button type="submit" className="margin-top-40 height-50" fullWidth>Login</Button>
        </form>
        {/* <Divider className="margin-top-40 ">
          <p className="sub-text grey-400">OR</p>
        </Divider>
        <button className="margin-top-40 height-50 google" onClick={generateCode}>
          <Box className='center' justifyContent='start'>
            <img alt="google" src={GoogleLogo} />
            LOG IN WITH GOOGLE
          </Box>
        </button> */}
      </Box>
    </Box>
  );
};

export default Login;