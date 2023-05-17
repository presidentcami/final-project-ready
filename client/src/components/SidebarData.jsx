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
                path: '/dashboard/users',
                icon: <IoIcons.IoIosPaper />
            },
        //     {
        //         title: 'Revenue',
        //         path: '/overview/revenue',
        //         icon: <IoIcons.IoIosPaper />
        //     }
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
            //     title: 'Specific Trip',
            //     path: '/dashboard/trips/:trip_id',
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
    // {
    //     title: 'Products',
    //     path: '/products',
    //     icon: <FaIcons.FaCartPlus />
    // },
    // {
    //     title: 'Team',
    //     path: '/team',
    //     icon: <IoIcons.IoMdPeople />
    // },
    // {
    //     title: 'List Templates',
    //     path: '/list-templates',
    //     icon: <FaIcons.FaEnvelopeOpenText />,

    //     iconClosed: <RiIcons.RiArrowDownSFill />,
    //     iconOpened: <RiIcons.RiArrowUpSFill />,

    //     subNav: [
    //     //     {
    //     //         title: 'Message 1',
    //     //         path: '/messages/message1',
    //     //         icon: <IoIcons.IoIosPaper />
    //     //     },
    //     //     {
    //     //         title: 'Message 2',
    //     //         path: '/messages/message2',
    //     //         icon: <IoIcons.IoIosPaper />
    //     //     }
    //     ]
    // },
    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />
    }
];

export default SidebarData;