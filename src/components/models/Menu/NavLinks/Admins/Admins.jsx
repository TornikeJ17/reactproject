import React, { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { buttonIcons } from "../../../Icons/Icons";
const Admins = ({ getUserDetails, userDeleteOnClick }) => {
    const getUserAvatar = (data) => {
        return (
            data.imageUrls && (
                <img
                    src={data?.imageUrls}
                    alt="User Avatar"
                    style={{ width: "50px", height: "50px" }}
                />
            )
        );
    };
    const getEmail = (data) => {
        return <div>{data?.email}</div>;
    };
    const getUsername = (data) => {
        return (
            <div>
                {data.firstName} {data.lastName}
            </div>
        );
    };
    const getCompany = (data) => {
        return <div>{data?.company}</div>;
    };
    const getContactNumber = (data) => {
        return data.contactNumber === 0 ? (
            <div></div>
        ) : (
            <div>{data?.contactNumber}</div>
        );
    };
    const deleteAdminById = (userId) => {
        return (
            <Button
                severity="danger"
                icon={buttonIcons[21].icon}
                onClick={() => userDeleteOnClick(userId.id)}
            />
        );
    };
    return (
        <Card>
            <DataTable value={getUserDetails}>
                <Column
                    field="imageUrls"
                    header="Email"
                    sortable
                    body={getUserAvatar}
                />
                <Column field="email" header="Email" sortable body={getEmail} />
                <Column
                    field="firstName"
                    header="FullName"
                    sortable
                    body={getUsername}
                />
                <Column
                    field="company"
                    header="Company"
                    sortable
                    body={getCompany}
                />
                <Column
                    field="contactNumber"
                    header="Contact Phone"
                    sortable
                    body={getContactNumber}
                />
                <Column field="delete" header="" body={deleteAdminById} />
            </DataTable>
        </Card>
    );
};

export default Admins;
