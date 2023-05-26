import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #f1efed;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 1.35rem;

  &:hover {
    background: #ff7070;
    cursor: pointer;
    color: #333333;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #ffa784;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333333;
  font-size: 1.15rem;
  max-width: 95%;

  &:hover {
    color: #f1efed;
    cursor: pointer;
    border-left: 4px solid #333333;
    border-top: 4px solid #333333;
  }
`;

const SubMenu = ({ item, subMenuList, user }) => {
    const [subnav, setSubnav] = useState(false);
    // console.log(user)
    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarLink>
            {subnav && user && 
              user.map((index) => {
                return (
                  <DropdownLink to={`dashboard/profile`} key={index}>
                    <SidebarLabel>Edit Your Profile</SidebarLabel>
                  </DropdownLink>
                )
              })}
            {subnav && subMenuList && 
                subMenuList.map((item, index) => {
                    return (
                        <DropdownLink to={`trips/${item.trip_id}`} key={index}>
                            {item.icon}
                            <SidebarLabel>{item.trip_name}</SidebarLabel>
                        </DropdownLink>
                    );
                })}     
        </>
    );
};

export default SubMenu;