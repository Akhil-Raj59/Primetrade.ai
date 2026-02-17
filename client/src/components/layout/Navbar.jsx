import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Primetrade Dashboard</h1>

      <div className="flex items-center gap-4">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <span className="text-sm font-medium">{user?.fullName}</span>

        <button
          onClick={logout}
          className="text-sm bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
