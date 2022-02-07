/*
 * Copyright nagarro.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";

const propTypes = {
  children: PropTypes.node,
};

const notifications = () => {
  return false ? ( //some kinda notification check? getNumNotifications()??
    <Badge pill color="danger">
      0
    </Badge>
  ) : null;
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { handleProfileClick, handleChangePasswordClick, user } = this.props;
    return (
      <>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand>
          <img src="/nagarro.png" alt="logo" height="20" className="ml-4 mr-2"/>
          <span style={{color: "#FF9900"}}><strong>SaaSify</strong></span>&nbsp;
          {/* <span style={{color: "#232F3E"}}>SaaS Boost</span> */}
        </AppNavbarBrand>
        <Nav className="ml-auto mr-2" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-bell"></i>
              {notifications()}
            </NavLink>
          </NavItem>

          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <div>
                <span className="mx-2">
                  <i className="icon-user"></i> {user?.username}
                </span>
              </div>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Settings</strong>
              </DropdownItem>
              <DropdownItem onClick={() => handleProfileClick()}>
                <i className="fa fa-user"></i> Profile
              </DropdownItem>

              <DropdownItem onClick={() => handleChangePasswordClick()}>
                <i className="fa fa-shield"></i> Change Password
              </DropdownItem>
              <DropdownItem onClick={(e) => this.props.onLogout(e)}>
                <i className="fa fa-lock"></i> Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </>
    );
  }
}
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
