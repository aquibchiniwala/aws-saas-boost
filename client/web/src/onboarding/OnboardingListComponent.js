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
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  Spinner,
  Alert,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import OnboardingListItemComponent from "./OnboardingListItemComponent";
import ECRInstructions from "../components/ECRInstructions";

const showError = (error, dismissError) => {
  return (
    <Alert color="danger" isOpen={!!error} toggle={() => dismissError()}>
      <h4 className="alert-heading">Error</h4>
      <p>{error}</p>
    </Alert>
  );
};

export const OnboardingListComponent = (props) => {
  const {
    clickOnboardingRequest,
    dismissError,
    doRefresh,
    error,
    loading,
    onboardingRequests,
    showOnboardRequestForm,
    ecrRepository,
    awsAccount,
    awsRegion,
    showEcrPushModal,
    toggleEcrPushModal,
    clickTenantDetails,
  } = props;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const terminus = ["deployed", "updated", "failed"];

  const checkRefresh = (refreshFn) => {
    if (
      !isRefreshing &&
      onboardingRequests.some((ob) => !terminus.includes(ob?.status))
    ) {
      setIsRefreshing(true);
      const id = setTimeout(() => {
        refreshFn();
      }, 30000);
      setTimeoutId(id);
    }
  };

  useEffect(() => {
    checkRefresh(doRefresh);
    return () => {
      if (isRefreshing) {
        clearTimeout(timeoutId);
        setIsRefreshing(false);
      }
    };
  });

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>{!!error && showError(error, dismissError)}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={{ size: 12 }} md={{ size: 8 }} lg={{ size: 9 }}>
          <Alert color="light">
            Onboarding tenants requires an application image to be uploaded. For
            more detail, click{" "}
            <ECRInstructions
              awsAccount={awsAccount}
              awsRegion={awsRegion}
              ecrRepo={ecrRepository}
            >
              here.
            </ECRInstructions>
          </Alert>
        </Col>
        <Col sm={{ size: 12 }} md={{ size: 4 }} lg={{ size: 3 }}>
          <div className="float-right">
            <Button color="secondary" className="mr-2" onClick={doRefresh}>
              <span>
                {" "}
                <i className="fa fa-refresh" />
              </span>
            </Button>
            <Button color="primary" onClick={showOnboardRequestForm}>
              Provision Tenant
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              Onboarding Requests
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th>Request Id</th>
                    <th>Tenant</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {loading === "idle" &&
                    onboardingRequests.map((onboarding) => {
                      return (
                        <OnboardingListItemComponent
                          onboarding={onboarding}
                          key={onboarding.id}
                          clickOnboardingRequest={clickOnboardingRequest}
                          clickTenantDetails={clickTenantDetails}
                        />
                      );
                    })}
                  {loading === "idle" && onboardingRequests.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <p className="font-weight-bold">No results</p>
                        <p>There are no Onboarding Requests to display.</p>
                      </td>
                    </tr>
                  )}
                  {loading === "pending" && (
                    <tr>
                      <td colSpan="5">
                        <Spinner animation="border" role="status">
                          Loading...
                        </Spinner>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OnboardingListComponent;
