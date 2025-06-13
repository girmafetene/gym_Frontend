import { useState } from "react";
import {
  CandlestickChartIcon,
  Car,
  CaravanIcon,
  CarTaxiFront,
  HomeIcon,
  LocateIcon,
  Menu,
  RouteIcon,
  ShoppingBasket,
  UserCheck2,
} from "lucide-react";

import { Button } from "./ui/button";
import logo from "../assets/logo.svg";
//import logo from ".././public/logo.svg";
import { cn } from "../lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";
const MobileNav = () => {
  const [Selected, setSelected] = useState("Dashboard");
  const ShowSelected = (name: string) => {
    setSelected(name);
  };
  const MenuList = [
    {
      name: "Dashboard",
      path: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
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
      path: "company",
      icon: <CaravanIcon className="h-5 w-5" />,
    },
    {
      name: "Users",
      path: "Users",
      icon: <UserCheck2 className="h-5 w-5" />,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <div className="flex space-x-3 items-center  border-b ">
            <img src={logo} alt="logo" className="mb-3 cursor-pointer" />
            <p>Tel Bar </p>
          </div>

          {MenuList.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              // className="flex items-center gap-3 text-lg font-medium"
              // className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              className={cn(
                "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                {
                  "text-foreground": Selected === item.name,
                }
              )}
              onClick={() => ShowSelected(item?.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
