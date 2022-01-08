/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

package com.amazon.aws.partners.saasfactory.saasboost.appconfig;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.Objects;

@JsonDeserialize(builder = FsxFilesystem.Builder.class)
public class FsxFilesystem {

    private Integer storageGb;
    private Integer throughputMbs;
    private Integer backupRetentionDays;
    private String dailyBackupTime;
    private String weeklyMaintenanceTime;
    private String windowsMountDrive;

    private FsxFilesystem(Builder builder) {
        this.storageGb = builder.storageGb;
        this.throughputMbs = builder.throughputMbs;
        this.backupRetentionDays = builder.backupRetentionDays;
        this.dailyBackupTime = builder.dailyBackupTime;
        this.weeklyMaintenanceTime = builder.weeklyMaintenanceTime;
        this.windowsMountDrive = builder.windowsMountDrive;
    }

    public static FsxFilesystem.Builder builder() {
        return new FsxFilesystem.Builder();
    }

    public Integer getStorageGb() {
        return storageGb;
    }

    public Integer getThroughputMbs() {
        return throughputMbs;
    }

    public Integer getBackupRetentionDays() {
        return backupRetentionDays;
    }

    public String getDailyBackupTime() {
        return dailyBackupTime;
    }

    public String getWeeklyMaintenanceTime() {
        return weeklyMaintenanceTime;
    }

    public String getWindowsMountDrive() {
        return windowsMountDrive;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        // Same reference?
        if (this == obj) {
            return true;
        }
        // Same type?
        if (getClass() != obj.getClass()) {
            return false;
        }
        final FsxFilesystem other = (FsxFilesystem) obj;
        return (
                ((storageGb == null && other.storageGb == null) || (storageGb != null && storageGb.equals(other.storageGb)))
                && ((throughputMbs == null && other.throughputMbs == null) || (throughputMbs != null && throughputMbs.equals(other.throughputMbs)))
                && ((backupRetentionDays == null && other.backupRetentionDays == null) || (backupRetentionDays != null && backupRetentionDays.equals(other.backupRetentionDays)))
                && ((dailyBackupTime == null && other.dailyBackupTime == null) || (dailyBackupTime != null && dailyBackupTime.equals(other.dailyBackupTime)))
                && ((weeklyMaintenanceTime == null && other.weeklyMaintenanceTime == null) || (weeklyMaintenanceTime != null && weeklyMaintenanceTime.equals(other.weeklyMaintenanceTime)))
                && ((windowsMountDrive == null && other.windowsMountDrive == null) || (windowsMountDrive != null && windowsMountDrive.equals(other.windowsMountDrive)))
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(storageGb, throughputMbs, backupRetentionDays, dailyBackupTime, weeklyMaintenanceTime, windowsMountDrive);
    }

    @JsonPOJOBuilder(withPrefix = "") // setters aren't named with[Property]
    public static final class Builder {
        private Integer storageGb;
        private Integer throughputMbs;
        private Integer backupRetentionDays;
        private String dailyBackupTime;
        private String weeklyMaintenanceTime;
        private String windowsMountDrive;

        private Builder() {
        }

        public Builder storageGb(Integer storageGb) {
            this.storageGb = storageGb;
            return this;
        }

        public Builder throughputMbs(Integer throughputMbs) {
            this.throughputMbs = throughputMbs;
            return this;
        }

        public Builder backupRetentionDays(Integer backupRetentionDays) {
            this.backupRetentionDays = backupRetentionDays;
            return this;
        }

        public Builder dailyBackupTime(String dailyBackupTime) {
            this.dailyBackupTime = dailyBackupTime;
            return this;
        }

        public Builder windowsMountDrive(String windowsMountDrive) {
            this.windowsMountDrive = windowsMountDrive;
            return this;
        }

        public Builder weeklyMaintenanceTime(String weeklyMaintenanceTime) {
            this.weeklyMaintenanceTime = weeklyMaintenanceTime;
            return this;
        }

        public FsxFilesystem build() {
            return new FsxFilesystem(this);
        }
    }
}
