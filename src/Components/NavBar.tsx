const NavBar = () => {
  return (
    <header className="bg-slate-600 mb-10">
      <nav className="container mx-auto text-white font-bold flex items-center px-2 sm:px-0 justify-between h-16">
        <h1>Agenda Virtual</h1>
        <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-800">
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
