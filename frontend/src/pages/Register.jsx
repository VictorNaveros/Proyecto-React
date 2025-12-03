// src/pages/Register.jsx
// ✨ PÁGINA DE REGISTRO - DISEÑO NEGRO PROFESIONAL
// Copia este código completo en: src/pages/Register.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { Button, Input, Checkbox } from '@nextui-org/react';
import { Icon } from '@iconify/react';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useNotification();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      error('Por favor completa todos los campos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      error('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!acceptTerms) {
      error('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);

    const result = await register(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );

    setIsLoading(false);

    if (result.success) {
      success('Cuenta creada exitosamente');
      navigate('/dashboard');
    } else {
      error(result.message || 'Error al crear la cuenta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-8">
      <div className="w-full max-w-md px-6">
        {/* Título */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Crear Cuenta ✨
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="text-sm text-white mb-2 block">
              Nombre <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ingresa tu nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="bordered"
              size="lg"
              classNames={{
                input: "text-white",
                inputWrapper: "bg-transparent border-gray-700 hover:border-gray-600 data-[hover=true]:border-gray-600"
              }}
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="text-sm text-white mb-2 block">
              Apellido <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ingresa tu apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="bordered"
              size="lg"
              classNames={{
                input: "text-white",
                inputWrapper: "bg-transparent border-gray-700 hover:border-gray-600 data-[hover=true]:border-gray-600"
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-white mb-2 block">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Ingresa tu email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="bordered"
              size="lg"
              classNames={{
                input: "text-white",
                inputWrapper: "bg-transparent border-gray-700 hover:border-gray-600 data-[hover=true]:border-gray-600"
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-white mb-2 block">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <Input
              type={isVisible ? "text" : "password"}
              placeholder="Mínimo 6 caracteres"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="bordered"
              size="lg"
              classNames={{
                input: "text-white",
                inputWrapper: "bg-transparent border-gray-700 hover:border-gray-600 data-[hover=true]:border-gray-600"
              }}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Icon
                      icon="solar:eye-closed-linear"
                      className="text-2xl text-gray-400 hover:text-gray-300 transition-colors"
                    />
                  ) : (
                    <Icon
                      icon="solar:eye-bold"
                      className="text-2xl text-gray-400 hover:text-gray-300 transition-colors"
                    />
                  )}
                </button>
              }
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-white mb-2 block">
              Confirmar Contraseña <span className="text-red-500">*</span>
            </label>
            <Input
              type={isConfirmVisible ? "text" : "password"}
              placeholder="Repite tu contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="bordered"
              size="lg"
              classNames={{
                input: "text-white",
                inputWrapper: "bg-transparent border-gray-700 hover:border-gray-600 data-[hover=true]:border-gray-600"
              }}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleConfirmVisibility}
                >
                  {isConfirmVisible ? (
                    <Icon
                      icon="solar:eye-closed-linear"
                      className="text-2xl text-gray-400 hover:text-gray-300 transition-colors"
                    />
                  ) : (
                    <Icon
                      icon="solar:eye-bold"
                      className="text-2xl text-gray-400 hover:text-gray-300 transition-colors"
                    />
                  )}
                </button>
              }
            />
          </div>

          {/* Checkbox términos */}
          <Checkbox
            size="sm"
            isSelected={acceptTerms}
            onValueChange={setAcceptTerms}
            classNames={{
              label: "text-white text-sm"
            }}
          >
            <span className="text-sm text-white">
              Acepto los{' '}
              <Link to="#" className="text-primary hover:underline">
                Términos y Condiciones
              </Link>
              {' '}y la{' '}
              <Link to="#" className="text-primary hover:underline">
                Política de Privacidad
              </Link>
            </span>
          </Checkbox>

          {/* Botón Crear Cuenta */}
          <Button
            type="submit"
            size="lg"
            color="primary"
            className="w-full font-semibold"
            isLoading={isLoading}
          >
            Crear Cuenta
          </Button>
        </form>

        {/* Link a Login */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-primary hover:underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;