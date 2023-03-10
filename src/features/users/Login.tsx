import React, {useEffect, useState} from 'react';
import {User} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {loginUser, selectError, selectIsSuccess} from "./usersSlice";
import {Avatar, Box, Button, Container, Grid, styled, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useNavigate} from "react-router-dom";


const ButtonColored = styled(Button)({
  backgroundColor: '#423794',
  '&:hover': {
    backgroundColor: '#877cee'
  },
});

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const isSuccess = useAppSelector(selectIsSuccess);

  const navigate = useNavigate();

  const [state, setState] = useState<User>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({...prevState, [name]: value}));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(loginUser(state));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate]);


  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Username"
                name="username"
                value={state.username}
                onChange={inputChangeHandler}
                error={Boolean(error)}
                helperText={error ? error : 'Enter hardcoded username'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(error)}
                helperText={error ? error : 'Enter hardcoded password'}
              />
            </Grid>
          </Grid>
          <ButtonColored
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign in
          </ButtonColored>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;