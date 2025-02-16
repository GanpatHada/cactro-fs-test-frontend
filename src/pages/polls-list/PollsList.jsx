import React, { useState,useEffect } from 'react';
import { 
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Radio
} from '@mui/material';

const PollsList = () => {
  const [loading, setLoading] = useState(false);
  const [polls, setPolls] = useState([]);

  useEffect(()=>{
    setLoading(true);
    const fetchPolls=async()=>{
      const response=await fetch('http://localhost:8000/api/v1/poll');
      const data=await response.json();
      setPolls(data.data);
      setLoading(false);
    }
    fetchPolls();
  },[])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      
        {polls.map((poll) => (
          <Paper elevation={6} key={poll._id} sx={{ mt:2, mb: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {poll.question}
            </Typography>
            <List>
              {poll.options.map((option, index) => (
                <React.Fragment key={option._id}>
                  <ListItem>
                    <Radio name={`poll-option-${poll._id}`} id={option._id} value={`poll-option-${poll._id}`} group="poll-group" />
                    <ListItemText primary={option.text} />
                    <Typography variant="body2">{option.votes} votes</Typography>
                  </ListItem>
                  {index < poll.options.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ))}

    </Container>
  );
};

export default PollsList;