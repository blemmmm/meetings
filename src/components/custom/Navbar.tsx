import Link from "next/link";
import { Icon } from "@iconify/react";
import { DateTime } from "luxon";

const Navbar = () => {
  return (
    <nav className="h-14 px-7 flex items-center justify-between w-full">
      <Link
        href="/"
        className="flex items-center gap-3 text-zinc-500 font-medium"
      >
        <Icon icon="flat-color-icons:video-call" height={54} width={54} />{" "}
        <h1>Meetings</h1>
      </Link>
      <span className="text-zinc-500">
        {DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
      </span>
    </nav>
  );
};

export default Navbar;
