import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Users',
                path: '/dashboard/profile',
                icon: <IoIcons.IoIosPaper />
            },
        ]
    },
    {
        title: 'Trips',
        path: '/trips',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            // {
            //     title: 'All Trips',
            //     path: '/trips',
            //     icon: <IoIcons.IoIosPaper />,
            //     cName: 'sub-nav'
            // },
            // {
            //     title: 'Reports 2',
            //     path: '/reports/reports2',
            //     icon: <IoIcons.IoIosPaper />,
            //     cName: 'sub-nav'
            // },
            // {
            //     title: 'Reports 3',
            //     path: '/reports/reports3',
            //     icon: <IoIcons.IoIosPaper />
            // }
        ]
    },
    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />
    }
];

export default SidebarData;