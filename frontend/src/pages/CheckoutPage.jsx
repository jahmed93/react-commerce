//TODO: SubComponents, potential SWITCH STATEMENT/TERNARY
import { useSelector } from "react-redux";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
// import { shades } from "./../theme";
//COMMENTS components
import Shipping from "../components/Shipping";
// import Payment from "../components/Payment";


//COMMENT Initial Value
const initialValues = {
    billingAddress: {
        firstName: "",
        lastName: "", 
        country: "",
        Street1: "",
        Street2: "",
        city: "",
        state: "",
        zipCode: "",
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: "",
        lastName: "", 
        country: "",
        Street1: "",
        Street2: "",
        city: "",
        state: "",
        zipCode: "",
    },
    email: '',
    phoneNumber: '',
}

//COMMENT YUP FORMIK FormCheck
const checkOutSchema = [
//COMMENT firstSTEPPER
    yup.object().shape({
        billingAddress: yup.object().shape({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            country: yup.string().required("required"),
            Street1: yup.string().required("required"),
            Street2: yup.string(),
            city: yup.string().required("required"),
            state: yup.string().required("required"),
            zipCode: yup.string().required("required"),
        }),
        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(), 
            firstName: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            lastName: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            country: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            Street1: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            Street2: yup.string(),
            city: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            state: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            zipCode: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
        }),

    }),
//COMMENT: second Stepper
    yup.object().shape({
        email: yup.string().required("required"),
        phoneNumber: yup.string().required('required')
    })
]

//COMMENT actual page
function Checkout(){
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    const handleFormSubmit = async (value, actions) => {
        setActiveStep(activeStep + 1)
        //COMMENT: 
        if(isFirstStep && values.shippingAddress.isSameAddress){
          actions.setFieldValue("shippingAddress",
           {
            ...values.billingAddress,
            isSameAddress: true,
           })
        }
        if(isSecondStep){
          makePayment(values);
        }
//TODO HERE 
    }

//TODO
    async function makePayment(values){
        //Strip Logic
    };

    return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      <Box>
       
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkOutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
          
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Checkout;