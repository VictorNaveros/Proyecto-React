// src/pages/Login.jsx
// 🔐 PÁGINA DE INICIO DE SESIÓN - DISEÑO NEGRO PROFESIONAL
// Copia este código completo en: src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { Button, Input, Checkbox } from '@nextui-org/react';
import { Icon } from '@iconify/react';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación con toast
    if (!email || !password) {
      error('Por favor completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      error('Email inválido');
      return;
    }

    setIsLoading(true);

    const result = await login(email, password);

    setIsLoading(false);

    if (result.success) {
      success(`Bienvenido ${result.user.fullName}`);
      navigate('/dashboard');
    } else {
      error(result.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md px-6">
        {/* Título */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Iniciar Sesión 👋
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm text-white mb-2 block">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <Checkbox
              size="sm"
              isSelected={rememberMe}
              onValueChange={setRememberMe}
              classNames={{
                label: "text-white text-sm"
              }}
            >
              Recordarme
            </Checkbox>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón Iniciar Sesión */}
          <Button
            type="submit"
            size="lg"
            color="primary"
            className="w-full font-semibold"
            isLoading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Link a Register */}
        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-sm text-primary hover:underline"
          >
            Crear una cuenta
          </Link>
        </div>

        {/* Credenciales de prueba */}
        <div className="mt-8 p-4 border border-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 text-center mb-2">
            🔐 Credenciales de prueba:
          </p>
          <p className="text-xs text-gray-500 text-center">
            <strong>Email:</strong> admin@techstore.com
          </p>
          <p className="text-xs text-gray-500 text-center">
            <strong>Contraseña:</strong> Admin123!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;