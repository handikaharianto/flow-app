import { getUser, logoutUser } from "@/lib/actions/user.actions";

async function Header() {
  const user = await getUser();

  return (
    <header>
      <div>{user ? `Hello, ${user.name}` : "Hello, Guest"}</div>
      <div>
        <form action={logoutUser}>
          <button>Logout</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
