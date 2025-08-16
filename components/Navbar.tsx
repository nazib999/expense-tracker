import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";



const Navbar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const payload = token ? verifyJwt(token) : null;
  const isAuthed = !!payload;



  return (

    <header className={"bg-primary fixed top-0 w-full z-50"}>
      <nav className={"main-container"}>
        <div className={"flex justify-between items-center"}>
          <Link href={'/'} className={'text-cyan-700 font-semibold font-mono'}>Expense<span className={'text-red-700'}>Tracker</span></Link>

          {!isAuthed ? (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button className={'rounded-2xl ring-2 bg-cyan-700'}>Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className={'rounded-2xl bg-cyan-600'}>Register</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-white border-white px-2 py-1 border rounded-3xl bg-blue-800">{payload?.name || payload?.email}</span>
              <form action="/api/auth/logout" method="post">
                <Button type="submit" variant="destructive" className={'rounded-2xl'}>
                  Logout
                </Button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </header>

  );
};
export default Navbar;
