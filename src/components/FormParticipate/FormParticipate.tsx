import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { experimentalStyled as styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: 40,
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
  '& label.Mui-focused': {
    color: 'white',
    fontSize: '20px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInputLabel-root': {
    fontSize: 40,
  },
});

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        type="tel"
        thousandSeparator
        // valueIsNumericString
        // inputMode="decimal"
        prefix="US$ "
      />
    );
  },
);

interface MyFormProps {
  onTextChange: () => void;
}

export interface MyFormRef {
  btc: string;
}

function formatCurrency(text: string) {
  // Obtém o valor atual do campo de texto
  let valor = text;

  // Remove todos os caracteres não numéricos do valor (exceto o ponto, que é usado para separar os centavos)
  valor = valor.replace(/[^\d.]/g, '');

  // Verifica se há um ponto no valor e, se houver, garante que haja no máximo duas casas decimais depois dele
  if (valor.indexOf('.') !== -1) {
    valor = valor.slice(0, valor.indexOf('.') + 3);
  }

  // Adiciona zeros à direita do valor, se necessário, para garantir que haja sempre duas casas decimais
  // while (valor.length < 3) {
  //   valor = "0" + valor;
  // }

  // Reverte o valor para que os dígitos entrem da direita para a esquerda
  valor = valor.split('').reverse().join('');

  // Adiciona um ponto para separar os centavos, se necessário
  if (valor.length > 2) {
    valor = valor.slice(0, 2) + '.' + valor.slice(2);
  }

  // Reverte o valor de volta para a ordem correta
  valor = valor.split('').reverse().join('');

  // Adicionar prefixo
  valor = 'US$ ' + valor;

  // Define o valor formatado no campo de texto
  return valor;
}

const FormParticipate = React.forwardRef<MyFormRef, MyFormProps>(({ onTextChange }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [btc, setBtc] = React.useState<string>('');

  React.useImperativeHandle(ref, () => ({ btc }));

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelStyle = {
    fontSize: isFocused || btc.length > 0 ? '14px' : '40px',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBtc(formatCurrency(String(event.target.value).replace(/\D/g, '')));
  };

  React.useEffect(() => onTextChange(), [btc]);

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
        label="Fill here"
        value={btc}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="btc"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        InputLabelProps={{
          shrink: isFocused || btc.length > 0,
          style: labelStyle,
        }}
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      />
    </Box>
  );
});

FormParticipate.displayName = 'FormParticipate';

export default FormParticipate;
