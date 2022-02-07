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

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Alert,
  Button,
  NavLink,
} from "reactstrap";
import Display from "../components/Display";
import Moment from "react-moment";
import { OnboardingStatus } from "./OnboardingStatus";
import { OnboardingTenantLink } from "./OnboardingTenantLink";

const showError = (error, clearError) => {
  return (
    !!error && (
      <Row>
        <Col sm={12}>
          <Alert color="danger" isOpen={!!error} toggle={() => clearError()}>
            <h4 className="alert-heading">Error</h4>
            <p>{error}</p>
          </Alert>
        </Col>
      </Row>
    )
  );
};

export const OnboardingDetailComponent = (props) => {
  const { onboarding, error, clearError, refresh, showTenant } = props;
  const terminus = ["deployed", "updated", "failed"];

  const [actionsDropdownExpanded, setActionsDropdownExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const toggleActions = () => {
    setActionsDropdownExpanded(!actionsDropdownExpanded);
  };

  const refreshStatus = (status, refreshFn) => {
    if (!isRefreshing && !terminus.includes(status)) {
      setIsRefreshing(true);
      const id = setTimeout(() => {
        refreshFn();
      }, 30000);
      setTimeoutId(id);
    }
  };

  useEffect(() => {
    refreshStatus(onboarding?.status, refresh);
    return () => {
      if (isRefreshing) {
        clearTimeout(timeoutId);
        setIsRefreshing(false);
      }
    };
  });

  return (
    <div className="animated fadeIn">
      {showError(error, clearError)}
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <div>
            <Button color="secondary" className="mr-2" onClick={refresh}>
              <span>
                <i className={"fa fa-refresh"} />
              </span>
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-info" />
              Onboarding Request Detail
            </CardHeader>
            <CardBody>
              <Row className="pt-3">
                <Col
                  sm={4}
                  className="border border border-top-0 border-bottom-0 border-left-0"
                >
                  <dt>Id</dt>
                  <dd>
                    <Display>{onboarding && onboarding.id}</Display>
                  </dd>
                  <dt>Status</dt>
                  <dd>
                    <Display>
                      <OnboardingStatus status={onboarding?.status} />
                    </Display>
                  </dd>
                </Col>
                <Col
                  sm={4}
                  className="border border border-top-0 border-bottom-0 border-left-0"
                >
                  <dt>Tenant</dt>
                  <dd>
                    <Display>
                      {onboarding && onboarding.tenantId && (
                        <OnboardingTenantLink
                          tenantId={onboarding.tenantId}
                          tenantName={onboarding.tenantName}
                          clickTenantDetails={showTenant}
                        />
                      )}
                    </Display>
                  </dd>
                  <dt>Stack Id</dt>
                  <dd>
                    <Display>
                      {onboarding && onboarding.stackId && (
                        <NavLink
                          active={true}
                          target="_blank"
                          href={onboarding.cloudFormationUrl}
                          className="pl-0"
                        >
                          {onboarding.stackId}
                          <i
                            className="fa fa-external-link ml-2"
                            aria-hidden="true"
                          ></i>
                        </NavLink>
                      )}
                    </Display>
                  </dd>
                </Col>
                <Col sm={4}>
                  <dt>Created On</dt>
                  <dd>
                    <Display>
                      {onboarding && (
                        <Moment format="LLLL" date={onboarding.created} />
                      )}
                    </Display>
                  </dd>
                  <dt>Modified On</dt>
                  <dd>
                    <Display>
                      {onboarding && (
                        <Moment
                          format="dddd, MMMM Do YYYY, h:mm:ss a"
                          date={onboarding.modified}
                        />
                      )}
                    </Display>
                  </dd>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OnboardingDetailComponent;
