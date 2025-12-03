// src/components/layout/Header.jsx
// VERSIÓN FINAL - Con favoritos, dark mode, auth, carrito funcionando

import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Badge,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ShoppingCart, Heart, Sun, Moon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  
  // Estados locales
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Handler para logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Items del menú para móvil
  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Productos', path: '/products' },
    ...(isAuthenticated 
      ? [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Cerrar Sesión', action: handleLogout }
        ]
      : [
          { label: 'Iniciar Sesión', path: '/login' },
          { label: 'Registrarse', path: '/register' }
        ]
    )
  ];

  return (
    <Navbar 
      isBordered 
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full" 
      className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
    >
      {/* Logo - Izquierda */}
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden text-white" />
        <NavbarBrand>
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="text-2xl">🪐</div>
            <p className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TechStore
            </p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Navegación Central - Desktop */}
      <NavbarContent justify="center" className="hidden sm:flex gap-8">
        <NavbarItem>
          <Button
            variant="light"
            className="text-gray-300 hover:text-white"
            onClick={() => navigate('/')}
          >
            Inicio
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            className="text-gray-300 hover:text-white"
            onClick={() => navigate('/products')}
          >
            Productos
          </Button>
        </NavbarItem>
        {isAuthenticated && (
          <NavbarItem>
            <Button
              variant="light"
              className="text-gray-300 hover:text-white"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Acciones - Derecha */}
      <NavbarContent justify="end">
        {/* Dark Mode Toggle */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onPress={toggleDarkMode}
            className="text-gray-300"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </NavbarItem>

        {/* Carrito */}
        <NavbarItem>
          <Badge 
            content={cart?.length || 0} 
            color="danger" 
            shape="circle"
            size="sm"
          >
            <Button
              isIconOnly
              variant="light"
              className="text-gray-300"
              onClick={() => navigate('/dashboard')}
            >
              <ShoppingCart size={20} />
            </Button>
          </Badge>
        </NavbarItem>

        {/* Favoritos */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            className="text-red-500 hover:text-red-400"
          >
            <Heart size={20} />
          </Button>
        </NavbarItem>

        {/* Usuario / Login */}
        <NavbarItem>
          {isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  size="sm"
                  name={user?.fullName || 'Usuario'}
                  classNames={{
                    base: "bg-gradient-to-br from-blue-500 to-purple-500"
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="User Actions" 
                variant="flat"
                className="bg-gray-900 border border-gray-800"
              >
                <DropdownItem 
                  key="profile" 
                  className="h-14 gap-2"
                  textValue="Profile Info"
                >
                  <p className="font-semibold text-white">{user?.fullName}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </DropdownItem>
                <DropdownItem 
                  key="dashboard"
                  onClick={() => navigate('/dashboard')}
                  className="text-white hover:bg-gray-800"
                >
                  Mi Dashboard
                </DropdownItem>
                <DropdownItem 
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="primary"
              variant="flat"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Menú Móvil */}
      <NavbarMenu className="bg-gray-900/95 backdrop-blur-md border-r border-gray-800 pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            {item.action ? (
              <Button
                variant="light"
                className="w-full justify-start text-white hover:bg-gray-800"
                onClick={item.action}
              >
                {item.label}
              </Button>
            ) : (
              <Button
                variant="light"
                className="w-full justify-start text-white hover:bg-gray-800"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Button>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}