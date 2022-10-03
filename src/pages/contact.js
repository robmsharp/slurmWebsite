import React from "react";
import { CardHeader, CardContent, Toolbar, List, ListItem, ListItemText, Modal, Box, Typography, TextField, Container, Card, Button } from '@mui/material/';
import { useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useReducer } from "react";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material/styles";
import ScrollTop from '../components/scrollTop';

//Styling because captcha has white background
const myLightTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

//Style for modal window
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Contact = () => {

  //Name
  const nameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') { 
        return { value: action.val, isValid: false, helperText: 'You must include your name' };
      }
      else {
        return { value: action.val, isValid: true, helperText: ''}
      }
    }
    
    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: nameValue, isValid: nameIsValid, helperText: nameHelperText} = nameState;

  //Email
  const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') { 
        return { value: action.val, isValid: false, helperText: 'You must include your email' };
      }
      else if (action.val.includes('@') === false) {
        return { value: action.val, isValid: false, helperText: 'Your email must include @ symbol' };
      }
      else {
        return { value: action.val, isValid: true, helperText: ''}
      }
    }
    
    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: emailValue, isValid: emailIsValid, helperText: emailHelperText} = emailState;

  //Subject
  const subjectReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') { 
        return { value: action.val, isValid: false, helperText: 'You must include your subject' };
      }
      
      else {
        return { value: action.val, isValid: true, helperText: ''}
      }
    }
    
    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [subjectState, dispatchSubject] = useReducer(subjectReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: subjectValue, isValid: subjectIsValid, helperText: subjectHelperText} = subjectState;
  
  //Message
  const messageReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') { 
        return { value: action.val, isValid: false, helperText: 'You must include your message' };
      }
      
      else {
        return { value: action.val, isValid: true, helperText: ''}
      }
    }
    
    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [messageState, dispatchMessage] = useReducer(messageReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: messageValue, isValid: messageIsValid, helperText: messageHelperText} = messageState;

  
  const [sent, setSent] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const nameChangeHandler = event => {
    dispatchName({ type: 'USER_INPUT', val: event.target.value });
  };

  const subjectChangeHandler = event => {
    dispatchSubject({ type: 'USER_INPUT', val: event.target.value });
  };

  const emailChangeHandler = event => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const messageChangeHandler = event => {
    dispatchMessage({ type: 'USER_INPUT', val: event.target.value });
  };

  const captchaChangeHandler = event => {
    setCaptcha(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log("Name:");
    console.log(nameValue);
    console.log("Subject:");
    console.log(subjectValue);
    console.log("Email:");
    console.log(emailValue);
    console.log("Message:");
    console.log(messageValue);

    //Check the captcha

    if (validateCaptcha(captcha)==true) {

      console.log('valid input');
      setSent(true);

    }

    else {
      console.log('invalid input');
      setError(true);
    }

  };

  const handleErrorClose = () => {
    setError(false);
  };

  const handleSentClose = () => {
    setSent(false);
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  //Delayed check of form being valid
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(nameIsValid && emailIsValid && subjectIsValid && messageIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, nameIsValid, subjectIsValid, messageIsValid]);

  return (
    <>
      {/*The modal for failure*/}
      <Modal
        open={error}
        onClose={handleErrorClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Invalid Captcha
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please correct the Captcha and resubmit:
          </Typography>
          
        </Box>
      </Modal>

      {/*The modal for success*/}        
      <Modal
        open={sent}
        onClose={handleSentClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Form sent
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your message has been sent. Thankyou for reaching out.
          </Typography>
        </Box>
      </Modal>

      {/*Instruction */}
      <Toolbar id="back-to-top-anchor" />
      <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Fill in the form and submit in order to contact the developer.</Typography>

      {/*The contact form*/}        
      <Container >
        <Card sx={{ mb: 10 }}>
          <CardHeader

            title="Contact Form"


          />

          <CardContent>

            <form className="contact-form" onSubmit={formSubmitHandler}>
              {/*It should not be an error if set to initialised value of null*/}
              <TextField
                id="outlined-basic"
                placeholder="Enter your name"
                label="Name"
                variant="outlined"
                required
                type="text"
                sx={{ width: "50%" }}
                onChange={nameChangeHandler}
                value={nameValue}
                
                error={nameIsValid==false}
                helperText={nameHelperText}
              />

              <br />
              <br />

              <TextField
                id="outlined-basic"
                label="Email"
                placeholder="Enter email address"
                variant="outlined"

                required
                type="email"
                sx={{ width: "50%" }}
                onChange={emailChangeHandler}
                value={emailValue}
                error={emailIsValid==false}
                helperText={emailHelperText}
              />



              <br />
              <br />

              <TextField
                id="outlined-basic"
                placeholder="Enter Subject"
                label="Subject"
                variant="outlined"

                required
                sx={{ width: "100%" }}
                onChange={subjectChangeHandler}
                value={subjectValue}
                error={subjectIsValid==false}
                helperText={subjectHelperText}
              />



              <br />
              <br />

              <TextField
                id="standard-multiline-flexible"
                label="Message"
                placeholder="Enter Message"
                variant="outlined"
                multiline
                maxRows={20}
                minRows={3}

                required
                type="text"
                sx={{ width: "100%" }}
                onChange={messageChangeHandler}
                value={messageValue}
                error={messageIsValid==false}
                helperText={messageHelperText}
              />
              <br />
              <br />
              <ThemeProvider theme={myLightTheme} >
                <Card sx={{ backgroundColor: "white", minWidth: 400, maxWidth: "50%", p: 5 }}>
                  <Typography>Please type the Captcha to verify you are not a bot.</Typography>
                  <Box sx={{ pb: 5, pt: 5 }}>
                    <LoadCanvasTemplate />
                  </Box>
                  <TextField
                    id="captcha"
                    label="Captcha"
                    placeholder="Enter Captcha"
                    variant="outlined"
                    required
                    type="text"

                    onChange={captchaChangeHandler}
                    value={captcha}

                  />
                </Card>
              </ThemeProvider>
              <br />
              <br />
              <Button variant="contained" onClick={formSubmitHandler} disabled={!formIsValid}>Submit</Button>

            </form>
          </CardContent>
        </Card>
      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />
    </>
  );

};

export default Contact;