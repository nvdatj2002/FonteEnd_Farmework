import {
  BrowserRouter as Router, useRoutes
} from "react-router-dom";
import Layout from "./layout";
import App from "./App";
import Login from "./login";
import Register from "./register";
import Cart from "./cart";
import DetailProduct from "./detailproduct";
import Admin from "./admin";
import Checkout from "./checkout";
import { Navigate } from "react-router-dom";
import Order from "./order";
const RouterView = () => {
  // const Router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <div>
  //         <h1>Hello World</h1>
  //         <Link to="about">About Us</Link>
  //       </div>
  //     ),
  //   },
  //   {
  //     path: "about",
  //     element: <Layout>
  //       <App/>
  //     </Layout>,
  //   },

  // ]);
  // return <RouterProvider router={Router} />
  const RouterList = () => {
    const isAuth = JSON.parse(localStorage.getItem("user"));
    // console.log(isAuth[0].role)
    let routes = useRoutes([
      { path: "/", element: <App /> },
      { path: "/product/:id", element: <DetailProduct /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/admin",
        element: isAuth && isAuth[0].role == 'admin' ? <Admin /> : <Navigate to={'/'} />
      },

      {
        path: "/order",
        element: isAuth && isAuth[0].role == 'admin' ? <Order /> : <Navigate to={'/'} />
      },
      {
        path: "/checkout",
        element: isAuth ? <Checkout /> : <Navigate to="/login" />,
      },
    ])
    return routes
  }
  return (
    <Router>
      <Layout >
        <RouterList style={{ minHeight: '800px' }} />
      </Layout>
    </Router>
  )

}
export default RouterView