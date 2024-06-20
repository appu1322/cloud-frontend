import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IErrorResponse } from "../../../interfaces";
import { joiResolver } from "@hookform/resolvers/joi";
import { forgetPasswordValidation } from "../../../validations";
import { IAuth, IAuthResponse } from "../../../interfaces/auth";
import { Button, TextField, Typography, InputAdornment, Box, DialogActions } from "@mui/material";
// import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
// import AuthService from "../../../services/auth";
import EmailIcon from "@mui/icons-material/Email";
import Logo from "../../../assets/images/logo.svg";
import useSnackbar from "../../../hooks/useSnackbar";

const ForgetPassword = () => {
  // const authService = AuthService();
  const navigate = useNavigate();
  // const { user } = useUser();
  const { snackbar } = useSnackbar();
  const { register, handleSubmit, formState: { errors } } = useForm<IAuth>({
    resolver: joiResolver(forgetPasswordValidation),
    defaultValues: {
      email: "",
    }
  });

  // useEffect(() => {
  //   if (user?.name?.length) {
  //     navigate("/");
  //   }
  // }, [user]);

  const onSubmit = async (data: IAuth) => {
    const payload = {
      ...data
    };
    try {
      // const auth = await authService.forgetPassword(payload) as IAuthResponse;
      // snackbar(auth.message, "info");
      navigate("/login");

    } catch (error) {
      const err = error as IErrorResponse;
      snackbar(err.data.message, "warning");
      console.log("Error in forgot password:  ", error);
    }
  };

  return (
    <Box className="login-container center" flexDirection="column">
      <img alt="logo" src={Logo} width="63" height="66" />
      <Typography className="margin-top-40 fw-bold welcome" variant="h5">Forget Password</Typography>
      <p className="sub-text grey-500">Helping you to manage and share assets</p>
      <Box className='credential-box' marginTop="40px" marginX="10px">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          />
          <DialogActions sx={{ padding: 0 }}>
            <Button className="margin-top-40 height-50" sx={{ marginRight: "40px" }} variant="outlined" fullWidth onClick={() => navigate("/login")}>Back To Login</Button>
            <Button type="submit" className="margin-top-40 height-50" fullWidth >Submit</Button>
          </DialogActions>
        </form>
      </Box>
    </Box>
  );
};

export default ForgetPassword;