// src/components/layout/Header.jsx
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Input,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button
} from "@nextui-org/react";
import { Search, ShoppingCart, Heart, Moon } from "lucide-react";

function Header() {
  return (
    <Navbar 
      maxWidth="full" 
      className="bg-white/80 backdrop-blur-md border-b border-brand-gray-200"
    >
      {/* LOGO - IZQUIERDA */}
      <NavbarBrand>
        <p className="font-bold text-3xl bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
          TechStore
        </p>
      </NavbarBrand>

      {/* BÚSQUEDA - CENTRO */}
      <NavbarContent justify="center" className="hidden md:flex">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-brand-gray-50 hover:bg-brand-gray-100",
          }}
          placeholder="Buscar productos..."
          size="sm"
          startContent={<Search size={18} />}
          type="search"
        />
      </NavbarContent>

      {/* ICONOS - DERECHA */}
      <NavbarContent justify="end">
        {/* Icono de tema oscuro */}
        <NavbarItem>
          <Button isIconOnly variant="light" aria-label="Cambiar tema">
            <Moon size={20} />
          </Button>
        </NavbarItem>

        {/* Icono de favoritos */}
        <NavbarItem>
          <Button isIconOnly variant="light" aria-label="Favoritos">
            <Heart size={20} />
          </Button>
        </NavbarItem>

        {/* Icono de carrito con badge */}
        <NavbarItem>
          <Badge content="3" color="danger" size="sm">
            <Button isIconOnly variant="light" aria-label="Carrito">
              <ShoppingCart size={20} />
            </Button>
          </Badge>
        </NavbarItem>

        {/* Dropdown de usuario */}
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="Usuario"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Opciones de usuario" variant="flat">
              <DropdownItem key="profile">
                <p className="font-semibold">Perfil</p>
              </DropdownItem>
              <DropdownItem key="settings">Configuración</DropdownItem>
              <DropdownItem key="orders">Mis pedidos</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;