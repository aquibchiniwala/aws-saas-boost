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

import React from "react";
import { useField } from "formik";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormText,
} from "reactstrap";
import FormFeedback from "reactstrap/lib/FormFeedback";
import { SaasBoostTooltippedLabel } from "./SaasBoostTooltippedLabel";

export const SaasBoostInput = ({
  icon,
  label,
  description,
  tooltip,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormGroup>
      <SaasBoostTooltippedLabel
        field={field}
        label={label}
        tooltip={tooltip}
        {...props}
      />
      {description && <FormText color="muted">{description}</FormText>}
      <InputGroup className="mb-3">
        {icon && (
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={icon}></i>
            </InputGroupText>
          </InputGroupAddon>
        )}

        <Input
          {...field}
          {...props}
          invalid={meta.touched && !!meta.error}
          valid={meta.touched && !meta.error}
        />

        <FormFeedback
          invalid={meta.touched && meta.error ? meta.error : undefined}
        >
          {meta.error}
        </FormFeedback>
      </InputGroup>
    </FormGroup>
  );
};
