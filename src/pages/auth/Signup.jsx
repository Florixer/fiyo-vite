import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Avatar,
  Alert,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import TypewriterComponent from "typewriter-effect";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserContext from "@/context/user/UserContext";
import logo from "@/assets/media/img/logo/flexomate_gradient.jpg";

const Signup = () => {
  document.title = "Flexiyo";

  const fiyoauthApiBaseUri = import.meta.env.VITE_FIYOAUTH_API_BASE_URI;

  const { isUserAuthenticated, setIsUserAuthenticated, setUserInfo } =
    useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [alertText, setAlertText] = useState("");
  const [isError, setIsError] = useState(false);
  const [isCreateUserAccountReqLoading, setIsCreateUserAccountReqLoading] =
    useState(false);
  const [currentForm, setCurrentForm] = useState("signupForm1");

  useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 600px)");
    const handleMediaQueryChange = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/", { state: { from: "/auth/signup" }, replace: true });
    }
  }, [isUserAuthenticated, navigate]);

  const professionList = [
    "Accountant",
    "Account Manager",
    "Administrator",
    "Artist",
    "Architect",
    "Brand Manager",
    "Business Analyst",
    "Business Development Manager",
    "Chef",
    "Clinical Research Coordinator",
    "Compliance Officer",
    "Consultant",
    "Content Writer",
    "Copywriter",
    "Customer Service Representative",
    "Customer Success Manager",
    "Data Analyst",
    "Data Entry Clerk",
    "Data Scientist",
    "Dental Hygienist",
    "Doctor",
    "Electrician",
    "Engineer",
    "Entrepreneur",
    "Event Coordinator",
    "Event Planner",
    "Executive Assistant",
    "Executive Director",
    "Financial Advisor",
    "Financial Analyst",
    "Financial Consultant",
    "Financial Controller",
    "Financial Planner",
    "Graphic Designer",
    "HR Specialist",
    "Human Resources Manager",
    "Insurance Agent",
    "Interior Designer",
    "Investment Analyst",
    "Investment Banker",
    "IT Specialist",
    "Lawyer",
    "Legal Advisor",
    "Logistics Coordinator",
    "Market Research Analyst",
    "Marketing Coordinator",
    "Marketing Manager",
    "Marketing Specialist",
    "Mechanic",
    "Mechanical Engineer",
    "Musician",
    "Network Administrator",
    "Operations Analyst",
    "Operations Coordinator",
    "Operations Manager",
    "Personal Trainer",
    "Photographer",
    "Plumber",
    "Product Manager",
    "Project Administrator",
    "Project Coordinator",
    "Project Engineer",
    "Project Manager",
    "Public Relations Specialist",
    "Quality Assurance Specialist",
    "Real Estate Agent",
    "Recruiter",
    "Registered Nurse",
    "Research Analyst",
    "Researcher",
    "Sales Manager",
    "Sales Representative",
    "SEO Specialist",
    "Social Media Manager",
    "Social Worker",
    "Software Developer",
    "Software Engineer",
    "Software Tester",
    "Specialist",
    "Student",
    "Systems Analyst",
    "Teacher",
    "Technical Writer",
    "Therapist",
    "Translator",
    "UX/UI Designer",
    "Web Designer",
    "Writer",
    "Other",
  ];

  const createUserAccount = async () => {
    setIsCreateUserAccountReqLoading(true);
    try {
      const response = await axios.post(
        `${fiyoauthApiBaseUri}/users/register`,
        {
          ...firstFormik.values,
          ...secondFormik.values,
          ...thirdFormik.values,
        },
      );
      setAlertText(response.data.message);
      setIsUserAuthenticated(true);
      setIsError(false);
      setUserInfo(response.data.data);
      localStorage.setItem("userInfo", JSON.stringify(response?.data?.data));
    } catch (error) {
      setAlertText(error.response?.data?.message || "Internal Server Error");
      setIsError(true);
    } finally {
      setIsCreateUserAccountReqLoading(false);
    }
  };

  const SignupFirstSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    username: Yup.string().required("Username is required"),
  });

  const SignupSecondSchema = Yup.object().shape({
    dob: Yup.date()
      .required("DOB is required")
      .max(new Date(), "DOB can't be the future"),
    accountType: Yup.string().required("Please select an Account type"),
  });

  const SignupThirdSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const firstFormik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
    },
    validationSchema: SignupFirstSchema,
    onSubmit: () => setCurrentForm("signupForm2"),
  });

  const secondFormik = useFormik({
    initialValues: {
      dob: "",
      accountType: "",
    },
    validationSchema: SignupSecondSchema,
    onSubmit: () => setCurrentForm("signupForm3"),
  });

  const thirdFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupThirdSchema,
    onSubmit: createUserAccount,
  });

  return (
    <section id="signup">
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
              sx={{ fontFamily: "SpotifyMedium" }}
            >
              <Avatar
                src={logo}
                alt="logo"
                sx={{ mb: 3, width: "4rem", height: "4rem" }}
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
                    .typeString("Let's dive in")
                    .pauseFor(1300)
                    .changeDeleteSpeed(10)
                    .deleteChars(7)
                    .typeString("make friends")
                    .pauseFor(1300)
                    .deleteChars(12)
                    .typeString("flex initials")
                    .pauseFor(1300)
                    .deleteChars(13)
                    .typeString("share music")
                    .pauseFor(1300)
                    .deleteChars(5)
                    .typeString("clips")
                    .pauseFor(1300)
                    .deleteChars(11)
                    .typeString("do more!")
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
            Hi Stranger!
          </Typography>
          <Typography component="label" variant="label">
            Please let us know who you are
          </Typography>
          <br />
          <br />
          {alertText && (
            <Alert
              color={isError ? "error" : "success"}
              severity={isError ? "error" : "success"}
              sx={{
                borderRadius: ".7rem",
                borderLeft: `2px solid ${isError ? "red" : "green"}`,
                mb: 3,
                ml: 3,
                mr: 3,
              }}
            >
              {alertText}
            </Alert>
          )}
          {currentForm === "signupForm1" && (
            <form id="signupForm1" onSubmit={firstFormik.handleSubmit}>
              <TextField
                margin="normal"
                type="text"
                label="Full Name *"
                variant="outlined"
                placeholder="John"
                InputProps={{ style: { borderRadius: ".7rem" } }}
                fullWidth
                name="fullName"
                value={firstFormik.values.fullName}
                onChange={firstFormik.handleChange}
                error={
                  firstFormik.touched.fullName &&
                  Boolean(firstFormik.errors.fullName)
                }
                helperText={
                  firstFormik.touched.fullName && firstFormik.errors.fullName
                }
              />
              <TextField
                margin="normal"
                type="text"
                label="Create Username *"
                variant="outlined"
                placeholder="johndoe123"
                InputProps={{ style: { borderRadius: ".7rem" } }}
                fullWidth
                name="username"
                value={firstFormik.values.username}
                onChange={firstFormik.handleChange}
                error={
                  firstFormik.touched.username &&
                  Boolean(firstFormik.errors.username)
                }
                helperText={
                  firstFormik.touched.username && firstFormik.errors.username
                }
              />
              <Container
                component="div"
                fullWidth="md"
                sx={{ mt: 3 }}
                style={{ display: "flex", justifyContent: "space-between" }}
                disableGutters
              >
                <div />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ borderRadius: "2rem", padding: ".5rem 1.5rem" }}
                >
                  Next
                </Button>
              </Container>
            </form>
          )}
          {currentForm === "signupForm2" && (
            <form id="signupForm2" onSubmit={secondFormik.handleSubmit}>
              <TextField
                margin="normal"
                type="date"
                label="Date of Birth *"
                variant="outlined"
                InputProps={{ style: { borderRadius: ".7rem" } }}
                fullWidth
                name="dob"
                value={secondFormik.values.dob}
                onChange={secondFormik.handleChange}
                error={
                  secondFormik.touched.dob && Boolean(secondFormik.errors.dob)
                }
                helperText={secondFormik.touched.dob && secondFormik.errors.dob}
              />
              <FormControl
                fullWidth
                sx={{ textAlign: "left", mt: 2 }}
                error={
                  secondFormik.touched.accountType &&
                  Boolean(secondFormik.errors.accountType)
                }
              >
                <InputLabel>Account Type *</InputLabel>
                <Select
                  label="Account Type *"
                  variant="outlined"
                  sx={{ borderRadius: ".7rem" }}
                  style={{ marginRight: "1rem" }}
                  fullWidth
                  name="accountType"
                  value={secondFormik.values.accountType}
                  onChange={secondFormik.handleChange}
                >
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="creator">Creator</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                </Select>
              </FormControl>
              <Container
                component="div"
                fullWidth="md"
                sx={{ mt: 4 }}
                style={{ display: "flex", justifyContent: "space-between" }}
                disableGutters
              >
                <Button
                  onClick={() => setCurrentForm("signupForm1")}
                  variant="text"
                  style={{ borderRadius: "2rem", padding: ".5rem 1rem" }}
                  startIcon={<i className="fa fa-arrow-left" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ borderRadius: "2rem", padding: ".5rem 1.5rem" }}
                >
                  Next
                </Button>
              </Container>
            </form>
          )}
          {currentForm === "signupForm3" && (
            <form id="signupForm3" onSubmit={thirdFormik.handleSubmit}>
              <TextField
                margin="normal"
                type={passwordVisibility.password ? "text" : "password"}
                label="Password *"
                variant="outlined"
                placeholder="Create Password"
                InputProps={{
                  endAdornment: (
                    <i
                      className={`bi bi-${
                        passwordVisibility.password ? "eye-slash" : "eye"
                      }`}
                      variant="text"
                      style={{
                        borderRadius: ".3rem",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setPasswordVisibility({
                          ...passwordVisibility,
                          password: !passwordVisibility.password,
                        })
                      }
                    ></i>
                  ),
                  style: { borderRadius: ".7rem" },
                }}
                fullWidth
                name="password"
                value={thirdFormik.values.password}
                onChange={thirdFormik.handleChange}
                error={
                  thirdFormik.touched.password &&
                  Boolean(thirdFormik.errors.password)
                }
                helperText={
                  thirdFormik.touched.password && thirdFormik.errors.password
                }
              />
              <TextField
                margin="normal"
                type={passwordVisibility.confirmPassword ? "text" : "password"}
                label="Confirm Password *"
                variant="outlined"
                placeholder="Confirm Password"
                InputProps={{
                  endAdornment: (
                    <i
                      className={`bi bi-${
                        passwordVisibility.confirmPassword ? "eye-slash" : "eye"
                      }`}
                      variant="text"
                      style={{
                        borderRadius: ".3rem",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setPasswordVisibility({
                          ...passwordVisibility,
                          confirmPassword: !passwordVisibility.confirmPassword,
                        })
                      }
                    ></i>
                  ),
                  style: { borderRadius: ".7rem" },
                }}
                fullWidth
                name="confirmPassword"
                value={thirdFormik.values.confirmPassword}
                onChange={thirdFormik.handleChange}
                error={
                  thirdFormik.touched.confirmPassword &&
                  Boolean(thirdFormik.errors.confirmPassword)
                }
                helperText={
                  thirdFormik.touched.confirmPassword &&
                  thirdFormik.errors.confirmPassword
                }
              />
              <Container
                component="div"
                fullWidth="md"
                sx={{ mt: 3 }}
                style={{ display: "flex", justifyContent: "space-between" }}
                disableGutters
              >
                <Button
                  onClick={() => {
                    setCurrentForm("signupForm2");
                    setAlertText("");
                  }}
                  variant="text"
                  style={{ borderRadius: "2rem", padding: ".5rem 1rem" }}
                  startIcon={<i className="fa fa-arrow-left" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ borderRadius: "2rem", padding: ".5rem 1.5rem" }}
                  disabled={isCreateUserAccountReqLoading}
                >
                  {isCreateUserAccountReqLoading
                    ? "Loading..."
                    : "Create Account"}
                </Button>
              </Container>
            </form>
          )}
          <br />
          <br />
          Already have an account? &nbsp;
          <Link
            to="/"
            variant="body1"
            style={{ color: "var(--fm-primary-link)" }}
            sx={{ alignSelf: "center" }}
          >
            Login
          </Link>
        </Container>
      </div>
    </section>
  );
};

export default Signup;
