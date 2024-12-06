import { faHome, faTicket, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-6">
        {/* Home Link */}
        <Link href="/" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faHome} className="text-xl text-white" />
          <span className="text-white">Home</span>
        </Link>

        {/* New Ticket Link */}
        <Link href="/TicketPage/new" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faTicket} className="text-xl text-white" />
          <span className="text-white">New Ticket</span>
        </Link>

        {/* Dashboard Link */}
        <Link href="/Dashboard" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faChartBar} className="text-xl text-white" />
          <span className="text-white">Dashboard</span>
        </Link>
      </div>

      {/* User Information */}
      <div>
        <p className="text-default-text">jake.lower17@gmail.com</p>
      </div>
    </nav>
  );
};

export default Nav;
