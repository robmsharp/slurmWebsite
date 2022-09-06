import React from "react"; 
import {List, ListItem, ListItemText, Modal, Box, Typography, TextField, Container, Card, Button} from '@mui/material/';
import {useState} from 'react';



const Contact = () => {

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

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [sent, setSent] = useState(false);

    const nameChangeHandler = event => {
      setName(event.target.value);
    };

    const subjectChangeHandler = event => {
      setSubject(event.target.value);
    };

    const emailChangeHandler = event => {
      setEmail(event.target.value);
    };

    const messageChangeHandler = event => {
      setMessage(event.target.value);
    };

    const formSubmitHandler = event => {
      event.preventDefault();
      console.log("Name:");
      console.log(name);
      console.log("Subject:");
      console.log(subject);
      console.log("Email:");
      console.log(email);
      console.log("Message:");
      console.log(message);

      var validInput = true;
      var issues = [];

      if (name.trim()==='') {
        validInput = false;
        issues.push("Name not provided");
      }

      if (subject.trim()==='') {
        validInput = false;
        issues.push("Subject not provided");
      }

      if ((email.trim()==='') || (!email.includes('@')))  {
        validInput = false;
        issues.push("Valid email not provided. Email must contain @");
      }

      if (message.trim()==='') {
        validInput = false;
        issues.push("Message not provided");
      }

      if (validInput) {

      console.log('valid input');  

      setSent(true);  

      setName('');
      setSubject('');
      setEmail('');
      setMessage('');

      }

      else {
        console.log('invalid input');
        console.log(issues);
        setError(true);
        setErrorList(issues);
      }

    };

const handleErrorClose = () => {
  setError(false);
};

const handleSentClose = () => {
  setSent(false);
};

    return (
        <>
       <Modal
  open={error}
  onClose={handleErrorClose}
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Invalid form information
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Please correct the following errors and resubmit:
    </Typography>
    <List>
              
        {errorList.map((item) => (
          
          <ListItem>
                  <ListItemText primary={item} />
          </ListItem>
        ))}
        </List>
  </Box>
</Modal>

<Modal
  open={sent}
  onClose={handleSentClose}
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Form sent
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Your message has been sent. Please wait patiently for a reply.
    </Typography>
  </Box>
</Modal>

        <Container sx={{margin: 10}}>
            <Card sx={{padding: 10}}>
        <Typography variant="h4">Contact Form</Typography>
        <br/> 
        <Typography>Contact the developer by filling out this form.</Typography>
        <br/>      
        <form className="contact-form" onSubmit={formSubmitHandler}>
        
        <TextField
          id="outlined-basic"
          placeholder="Enter your name"
          label="Name"
          variant="outlined"
          
          required
          type="text"
          sx = {{width: "50%"}}
          onChange={nameChangeHandler}
          value={name}
        />

        <br/>
        <br/>
        
        <TextField
          id="outlined-basic"
          label="Email"
          placeholder="Enter email address"
          variant="outlined"
          
          required
          type="email"
          sx = {{width: "50%"}}
          onChange={emailChangeHandler}
          value = {email}
        />  



        <br/>
        <br/>
        
        <TextField
          id="outlined-basic"
          placeholder="Enter Subject"
          label="Subject"
          variant="outlined"
          
          required
          sx = {{width: "100%"}}
          onChange={subjectChangeHandler}
          value={subject}
        />



        <br/>
        <br/> 

        <TextField
          id="standard-multiline-flexible"
          label="Message"
          placeholder="Enter Message"
          variant="outlined"
          multiline
          rowsMax={4}
          
          required
          type="text"
          sx = {{width: "100%"}}
          onChange={messageChangeHandler}
          value = {message}
        />
        <br/>
        <br/>

        <Button variant="contained" onClick={formSubmitHandler}>Submit</Button>
        
        

        
        
        
      </form>
      </Card>
      </Container>
      
        </>
    );

};

export default Contact;