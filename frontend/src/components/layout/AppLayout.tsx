import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Package, Trophy, Share, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Friends from "@/icons/Friends";

interface AppLayoutProps {
  children: ReactNode;
}
type MenuItem = {
  id: number;
  title: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
};

const mainMenuItems: MenuItem[] = [
  { id: 1, title: "Dashboard", path: "/", icon: Home },
  { id: 3, title: "Leaderboard", path: "/leaderboard", icon: Trophy },
  { id: 2, title: "Earn", path: "/tasks", icon: Package },
  { id: 4, title: "Friends", path: "/referrals", icon: Friends },
];

const userMenuItems: MenuItem[] = [
  { id: 5, title: "Profile", path: "/profile", icon: User },
  { id: 6, title: "Settings", path: "/settings", icon: Settings },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const { pathname } = location;

  console.log(pathname);

  return (
    <div className="flex min-h-screen w-full max-w-md mx-auto">
      <div
        className={`${
          pathname === "/" ? "special_background" : "bg-[#041c31]"
        } relative max-w-md mx-auto flex flex-col items-center flex-1`}
      >
        {/* <div className="flex flex-nowrap justify-center w-full bg-black z-10">
          <div className="fixed top-0 w-full max-w-md px-4 py-3 bg-[#151516] cursor-pointer">
            <div className="flex justify-between items-center pl-2 border-l-[2px] border-[#041c31]">
              <div className="text-base text-white font-medium">
                Check the footprint map
              </div>
              <button className="bg-[#041c31] rounded-full px-2 py-1">
                <ArrowRight className="w-8 h-5 stroke-white" />
              </button>
            </div>
          </div>
        </div> */}
        {/* Main content */}
        <main className="w-full max-w-md flex-1 ">{children}</main>

        {/* Bottom nav */}
        <div className="w-full max-w-md fixed bottom-10 bg-[#041c31] opacity-85 ">
          <div className="flex justify-between border px-4 py-4 w-[90%] border-gray-4 rounded-2xl 00 mx-auto">
            {mainMenuItems.map((item) => {
              const isActive = item.path === pathname;
              return (
                <button
                  key={item.id}
                  className={`flex flex-col items-center justify-center `}
                >
                  <Link
                    className="text-center flex flex-col items-center justify-center gap-2"
                    to={item.path}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-[#4c9ce2]" : "text-[#727272]"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isActive ? "text-[#4c9ce2]" : "text-[#727272]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </button>
              );
            })}
          </div>
        </div>

        <div  className={`${
          pathname === "/referrals" ? "bg-[#041c31]" : "bg-[]"
        } fixed bottom-0 w-full max-w-md h-[40px]`}></div>
      </div>
    </div>
  );
};

export default AppLayout;
