import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
 Box,
 Button,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Heading,
 Input,
 Select,
 Textarea,
 VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

/**
* Covers a complete form implementation using formik and yup for validation
*/
const ContactMeSection = () => {
 const {isLoading, response, submit} = useSubmit();
 const { onOpen } = useAlertContext();

 const formik = useFormik({
   initialValues: {
    name:"",
    email:"",
    phone:"",
    address:"",
    password:"",
    comment:"",
   },
   onSubmit: (values) => {
     submit('', values);
   },
   validationSchema: Yup.object({
    name: Yup
    .string()
    .required("Name is required!")
    .min(6,"Username is too short!"),
    email: Yup.string().email("Invalid email address!").required("Email is required!"),
    phone : Yup
    .string()
    .required("Phone is required!")
    .matches(/^[+][0-9]{10,16}|[0-9]{10,16}|[+][0-9]{2}[(][0-9]{1}[)][0-9]{10,16}$/, 'Invalid phone!'),
    address : Yup.string().required("Address is required!"),
    password: Yup
    .string()
    .required("Password is required!")
      .min(8, 'Password must be 8 characters long!')
      .matches(/[0-9]/, 'Password requires a number!')
      .matches(/[a-z]/, 'Password requires a lowercase letter!')
      .matches(/[A-Z]/, 'Password requires an uppercase letter!')
      .matches(/[^\w]/, 'Password requires a symbol!'),
  }),
 });

 useEffect(() => {
   if (response) {
     onOpen(response.type, response.message);
     if (response.type === 'success') {
       formik.resetForm();
     }
   }
 }, [response]);

 return (
   <FullScreenSection
     isDarkBackground
     backgroundColor="#512DA8"
     py={16}
     spacing={8}
   >
     <VStack w="1024px" p={32} alignItems="flex-start">
       <Heading as="h1" id="contactme-section">
       Submission Form
       </Heading>
       <Box p={6} rounded="md" w="100%">
         <form onSubmit={formik.handleSubmit}>
           <VStack spacing={4}>
             <FormControl isInvalid={!!formik.errors.name && formik.touched.name}>
               <FormLabel htmlFor="name">Name</FormLabel>
               <Input
                 id="name"
                 name="name"
                 {...formik.getFieldProps("name")}
               />
               <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
             </FormControl>
             <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
               <FormLabel htmlFor="email">Email Address</FormLabel>
               <Input
                 id="email"
                 name="email"
                 type="email"
                 {...formik.getFieldProps("email")}
               />
               <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
             </FormControl>
             <FormControl isInvalid={!!formik.errors.phone && formik.touched.phone}>
               <FormLabel htmlFor="phone">Phone number</FormLabel>
               <Input
               type='phone'
                  name="phone"
                  id="phone"
                  {...formik.getFieldProps("phone")}
               />
               <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
             </FormControl>
             <FormControl isInvalid={!!formik.errors.address && formik.touched.address}>
               <FormLabel htmlFor="address">Address</FormLabel>
               <Input
                  name="address"
                  id="address"
                  {...formik.getFieldProps("address")}
               />
               <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
             </FormControl>
             <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
               <FormLabel htmlFor="password">Password</FormLabel>
               <Input
               type="password"
                  name="password"
                  id="password"
                  {...formik.getFieldProps("password")}
               />
               <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
             </FormControl>
             <FormControl >
               <FormLabel htmlFor="comment">Your message</FormLabel>
               <Textarea
                 id="comment"
                 name="comment"
                 {...formik.getFieldProps("comment")}
               />
             </FormControl>
             <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
               Submit
             </Button>
           </VStack>
         </form>
       </Box>
     </VStack>
   </FullScreenSection>
 );
};

export default ContactMeSection;