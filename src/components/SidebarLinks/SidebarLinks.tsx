import Link from 'next/link'
import React, { FC } from 'react'
import { FaCog } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { IconType } from 'react-icons';

interface SidebarLinksProps {
path: string;
icon: IconType;
}
const SidebarLinks:FC<SidebarLinksProps> = ({path, icon: Icon}) => {
    const pathname = usePathname();
  return (
    <li>
      <Link
        // href={path === "dashboard" ? "/ " : `/${path}`}
        href={`/${path}`}
        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          pathname.includes(`${path}`) && "bg-graydark dark:bg-meta-4"
        } `}
      >
        <Icon size={20} />
        {path.slice(0, 1).toUpperCase() + path.slice(1)}
      </Link>
    </li>
  );
}
export default SidebarLinks;
