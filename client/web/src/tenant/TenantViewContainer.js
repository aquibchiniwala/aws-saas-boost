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
import { connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { withRouter } from "react-router";

import TenantForm from "./TenantFormComponent";
import {
  fetchTenantThunk,
  dismissError,
  editedTenant,
  disableTenant,
  enableTenant,
  deleteTenant,
} from "./ducks";
import TenantViewComponent from "./TenantViewComponent";
import {
  selectConfig,
  selectSettingsById,
  fetchConfig,
} from "../settings/ducks";
import { selectAllPlans, fetchPlans } from "../billing/ducks";
import * as SETTINGS from "../settings/common";

const mapDispatchToProps = {
  fetchTenantThunk,
  fetchPlans,
  fetchConfig,
  dismissError,
  editedTenant,
  enableTenant,
  disableTenant,
  deleteTenant,
};

const mapStateToProps = (state, props) => {
  const { match } = props;
  const { params } = match;
  const { tenantId } = params;
  const { tenants } = state;
  const domainName = selectSettingsById(state, SETTINGS.DOMAIN_NAME);
  const tenant = !!tenantId ? tenants.entities[tenantId] : undefined;
  const plans = selectAllPlans(state);
  const config = selectConfig(state);

  const detail = !!tenant
    ? {
        ...tenant,
        // What to do about http vs. https here?
        fullCustomDomainName: !!domainName.value
          ? `http://${tenant?.subdomain}.${domainName.value}`
          : undefined,
      }
    : undefined;

  return {
    detail: detail,
    loading: tenants.loading,
    error: tenants.error,
    plans: plans,
    config: config,
  };
};

class TenantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenantId: null,
      isEditing: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveTenant = this.saveTenant.bind(this);
    this.handleError = this.handleError.bind(this);
    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.deleteTenant = this.deleteTenant.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { tenantId } = params;
    

    if (tenantId != null) {
      try {
        await this.props.fetchTenantThunk(tenantId);
        this.setState((state, props) => {
          if (tenantId === state.tenantId) {
            return state;
          }
          return { tenantId: tenantId };
        });
      } catch (err) {
        console.error("error when dispatching tenant thunk.");
      }
    }
    this.props.fetchConfig();
    this.props.fetchPlans();
  }

  toggleEdit() {
    const { error } = this.props;
    if (error) {
      const { dismissError } = this.props;
      dismissError();
    }
    this.setState((state) => ({ isEditing: !state.isEditing }));
  }

  saveTenant(values, { setSubmitting }) {
    // dispatch save tenant call to thunk
    //remove the "hasBilling" field as it's only a client side property for convenience
    const { hasBilling, ...valToSend } = values;
    const dispatchResponse = this.props.editedTenant({values: valToSend});
    dispatchResponse
      .then(unwrapResult)
      .then((tenant) => {
        setSubmitting(false);
        this.toggleEdit();
      })
      .catch((e) => {
        setSubmitting(false);
      });
  }

  enable() {
    this.props.enableTenant(this.state.tenantId);
  }

  disable() {
    this.props.disableTenant(this.state.tenantId);
  }

  deleteTenant() {
    const valToSend = {
      tenantId: this.state.tenantId,
      history: this.props.history,
    }
    this.props.deleteTenant(valToSend);
  }

  handleError() {
    this.props.dismissError();
  }

  render() {
    const { detail, error, dismissError, loading, config, plans } = this.props;
    const { tenantId, isEditing } = this.state;
    return (
      <div>
        {!isEditing && (
          <TenantViewComponent
            tenant={detail}
            tenantId={tenantId}
            loading={loading}
            error={error}
            handleError={this.handleError}
            toggleEdit={this.toggleEdit}
            enable={this.enable}
            disable={this.disable}
            deleteTenant={this.deleteTenant}
          />
        )}
        {isEditing && (
          <TenantForm
            tenant={detail}
            error={error}
            handleCancel={this.toggleEdit}
            handleSubmit={this.saveTenant}
            dismissError={dismissError}
            config={config}
            plans={plans}
          />
        )}
      </div>
    );
  }
}

export const TenantContainerWithRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TenantContainer));

export default TenantContainerWithRouter;
