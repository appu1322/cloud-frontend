import './App.scss';
import './assets/css/bootstrap/style.scss';
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import theme from "./assets/theme";
import routes from "./routes";



function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
       <RouterProvider router={routes} />
    </ThemeProvider>
    </>
  )
}

export default App;
