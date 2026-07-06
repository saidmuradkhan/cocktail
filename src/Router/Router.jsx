import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../assets/Components/About/About";
import Contact from "../assets/Components/Contact/Contact";
import Body from "../assets/Components/Home/Body";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <App />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ]
  }
]);

export default router;