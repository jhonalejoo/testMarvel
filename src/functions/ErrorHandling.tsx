import * as Yup from 'yup';

export function ValidateEmail() {
  return Yup.string()
    .email('Debe ser un correo electrónico válido') // Verifica formato de email
    .required('El correo electrónico es requerido'); // Verifica que no esté vacío
}

export function ValidatePassword() {
  return Yup.string()
    .required('Contraseña requerida');
}
