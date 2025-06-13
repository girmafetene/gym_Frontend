import { useState } from "react";

// import Link from "next/link";
import {
  CandlestickChartIcon,
  Car,
  CaravanIcon,
  CarTaxiFront,
  HomeIcon,
  LocateIcon,
  RouteIcon,
  Settings,
  ShoppingBasket,
  UserCheck2,
} from "lucide-react";
import logo from "../assets/logo.svg";
// import logo from ".././public/logo.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
const MenuList = [
  {
    name: "Dashboard",
    path: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
  },

  {
    name: "Company",
    path: "company",
    icon: <CandlestickChartIcon className="h-5 w-5 " />,
  },
  {
    name: "Product",
    path: "Product",
    icon: <ShoppingBasket className="h-5 w-5" />,
  },
  {
    name: "Lookup",
    path: "Lookup",
    icon: <LocateIcon className="h-5 w-5" />,
  },
  {
    name: "Category",
    path: "Category",
    icon: <CaravanIcon className="h-5 w-5" />,
  },
  {
    name: "Messages",
    path: "Messages",
    icon: <UserCheck2 className="h-5 w-5" />,
  },
  
];

const SideNav = () => {
  const [SelectLink, setSelectLink] = useState("Dashboard");
  const ShowSelected = (name: string) => {
    setSelectLink(name);
  };
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <div className="flex space-x-3 items-center  border-b ">
          {/* <img src={logo} alt="logo" className="mb-3" /> */}
          <img src={logo} alt="logo" className="mb-3 cursor-pointer" />
        </div>

        <TooltipProvider>
          {MenuList.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild onClick={() => ShowSelected(item?.path)}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-slate-50",
                    SelectLink === item.path ? "bg-blue-500 text-white" : ""
                  )}
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default SideNav;
