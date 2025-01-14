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

import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

export default function CurrentUserComponent(props) {
  const { username, handleSignOut } = props;

  console.log(username);

  return (
    <Fragment>
      <span className="pr-2">
        Signed in as: <a href="#login">{username}</a>
      </span>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => handleSignOut()}
      >
        Logout
      </Button>
    </Fragment>
  );
}
