import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Alert, Container, Typography, TextField, Button } from "@mui/material";
import TypewriterComponent from "typewriter-effect";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UserContext from "@/context/user/UserContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/media/img/logo/flexomate_gradient.jpg";

const Login = () => {
  const { isUserAuthenticated, setIsUserAuthenticated, setUserInfo } =
    useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [isLoginUserAccountReqLoading, setIsLoginUserAccountReqLoading] =
    useState(false);

  const fiyoauthApiBaseUri = import.meta.env.VITE_FIYOAUTH_API_BASE_URI;

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Email or Username is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 600px)");
    const handleMediaQueryChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleLoginUser(values);
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/", { state: { from: "/auth/login" }, replace: true });
    }
  }, [isUserAuthenticated, navigate]);

  const handleLoginUser = async (values) => {
    setIsLoginUserAccountReqLoading(true);
    try {
      const response = await axios.post(
        `${fiyoauthApiBaseUri}/users/login`,
        {
          username: values.username,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      setIsUserAuthenticated(true);
      setIsLoginUserAccountReqLoading(false);
      setUserInfo(response.data.user);
    } catch (error) {
      setAlertText(error.response?.data?.message || "Internal Server Error");
      setIsLoginUserAccountReqLoading(false);
      setIsUserAuthenticated(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordClicked(true);
  };

  return (
    <section id="login">
      <div className="auth-main">
        {!isMobile && (
          <Container
            className="auth-main--cover"
            component="div"
            maxWidth="md"
            disableGutters
          >
            <Typography
              component="div"
              variant="h4"
              className="auth-main--cover-title"
              style={{ fontFamily: "SpotifyMedium" }}
            >
              <LazyLoadImage
                src={logo}
                alt="logo"
                style={{
                  width: "4rem",
                  height: "4rem",
                  marginBottom: "1rem",
                  borderRadius: "50%",
                }}
              />
              <br />
              <TypewriterComponent
                onInit={(typewriter) => {
                  typewriter.typeString("Welcome to Flexiyo").start();
                }}
              />
              <TypewriterComponent
                options={{ autoStart: true, loop: true }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("")
                    .pauseFor(3500)
                    .typeString("Let's explore.")
                    .pauseFor(1300)
                    .changeDeleteSpeed(10)
                    .deleteChars(8)
                    .typeString("grow together.")
                    .pauseFor(1300)
                    .deleteChars(14)
                    .typeString("create joy.")
                    .pauseFor(1300)
                    .deleteChars(11)
                    .typeString("make memories.")
                    .pauseFor(1300)
                    .deleteChars(14)
                    .typeString("find happiness.")
                    .pauseFor(1300)
                    .deleteChars(10)
                    .typeString("friends.")
                    .pauseFor(1300)
                    .deleteChars(13)
                    .typeString("embrace life.")
                    .pauseFor(1300)
                    .start();
                }}
              />
            </Typography>
          </Container>
        )}
        <Container className="auth-main--forms" component="div" maxWidth="md">
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            Welcome back!
          </Typography>
          <Typography component="label" variant="label">
            Please enter your credentials to continue
          </Typography>
          <br />
          <br />
          {alertText && (
            <Alert
              color="error"
              severity="error"
              sx={{
                borderRadius: ".7rem",
                borderLeft: `2px solid red`,
                mb: 3,
                ml: 3,
                mr: 3,
              }}
            >
              {alertText}
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              id="username"
              type="text"
              label="Email or Username *"
              variant="outlined"
              fullWidth
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={
                formik.touched.username &&
                Boolean(formik.errors.username)
              }
              helperText={
                formik.touched.username && formik.errors.username
              }
              InputProps={{
                style: { borderRadius: ".7rem" },
              }}
            />
            <TextField
              margin="normal"
              id="password"
              type="password"
              label="Password *"
              variant="outlined"
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                style: { borderRadius: ".7rem" },
              }}
            />
            <Container
              component="div"
              fullWidth="md"
              sx={{ mt: 2 }}
              style={{ display: "flex", justifyContent: "space-between" }}
              disableGutters
            >
              <Link
                href="#"
                variant="body1"
                onClick={handleForgotPasswordClick}
                style={{ color: "var(--fm-primary-link)" }}
                sx={{ alignSelf: "center" }}
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                variant="contained"
                style={{ borderRadius: "2rem", padding: ".5rem 1.5rem" }}
                onClick={formik.handleSubmit}
                disabled={isLoginUserAccountReqLoading}
              >
                {isLoginUserAccountReqLoading ? "Loading..." : "Login"}
              </Button>
            </Container>
          </form>
          <br />
          <br />
          <br />
          Don't have an account? &nbsp;
          <Link
            to="/auth/signup"
            variant="body1"
            style={{ color: "var(--fm-primary-link)" }}
            sx={{ alignSelf: "center", textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </Container>
      </div>
    </section>
  );
};

export default Login;
