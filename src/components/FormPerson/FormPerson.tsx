import React, { useImperativeHandle, useState } from 'react';

// import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { experimentalStyled as styled } from '@mui/material/styles';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    width: '100%',
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  mediumTextInput: {
    width: '49%',
  },
});

const CssTextField = styled(TextField)({
  color: 'white',
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3540f2',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

// interface CustomProps {
//   onChange: (event: { target: { name: string; value: string } }) => void;
//   name: string;
//   email: string;
//   phone: string;
//   telegram: string;
// }

// const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
//   function NumericFormatCustom(props, ref) {
//     const { onChange, ...other } = props;
//     return (
//       <NumericFormat
//         {...other}
//         getInputRef={ref}
//         onValueChange={(values) => {
//           onChange({
//             target: {
//               name: props.name,
//               value: values.value,
//             },
//           });
//         }}
//         type="tel"
//         // thousandSeparator
//         valueIsNumericString
//         // prefix="+55 "
//         placeholder="+X (XX) XXXXX-XXXX"
//       />
//     );
//   },
// );

interface MyFormProps {
  onTextChange: (number: string) => void;
}

export interface MyFormRef {
  name: string;
  email: string;
  phone: string;
  telegram: string;
}

const FormPerson = React.forwardRef<MyFormRef, MyFormProps>(({ onTextChange }, ref) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const handleOnChange = (event: { target: { name: string; value: string } }) => {
    const prefixo: string = phone === '' ? '+55 ' : '';
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'phonez':
        setPhone(`${prefixo}${event.target.value}`);
        // setPhone(event.target.value);
        break;
      case 'telegram':
        setTelegram(event.target.value);
        break;
      default:
        break;
    }
    onTextChange(event.target.value);
  };
  // useImperativeHandle(ref, () => ({ btc }));
  useImperativeHandle(ref, () => ({ name, email, phone, telegram }));
  return (
    <Box
      ref={ref}
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <CssTextField
        name="name"
        label="Full Name"
        type="text"
        id="custom-css-outlined-input"
        className={classes.textField}
        onChange={handleOnChange}
        value={name}
      />
      <CssTextField
        name="email"
        label="E-mail"
        type="email"
        id="custom-css-outlined-input"
        className={classes.textField}
        onChange={handleOnChange}
        value={email}
      />
      <Grid container className={classes.container}>
        <CssTextField
          name="phonez"
          label="Mobile/WhatsApp"
          type="tel"
          id="custom-css-outlined-input"
          className={classes.mediumTextInput}
          onChange={handleOnChange}
          value={phone}
          // InputProps={{
          //   inputComponent: NumericFormatCustom as any,
          // }}
        />
        <CssTextField
          name="telegram"
          label="Telegram"
          type="email"
          id="custom-css-outlined-input"
          className={classes.mediumTextInput}
          onChange={handleOnChange}
          value={telegram}
        />
      </Grid>
    </Box>
  );
});

FormPerson.displayName = 'FormPerson';

export default FormPerson;
