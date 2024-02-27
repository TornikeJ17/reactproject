import React, { useEffect, useState } from "react";
import cssStyles from "./Profile.module.scss";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import useRequestDataProvider from "../../api/useRequestDataProvider";
import { TabPanel, TabView } from "primereact/tabview";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { buttonIcons } from "../Icons/Icons";
import { Link } from "react-router-dom";

const Profile = ({
    user,
    productsByUser,
    userDetailsUpdate,
    getUserDetailById,
    setGetUserDetailById,
    getUserAvatarsImages,
}) => {
    const { capitalizeFirstLetter } = useRequestDataProvider();
    const [dialog, setDialog] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const avatarBaseUrl = "https://3522.somee.com/Avatars";

    useEffect(() => {
        const currentUserAvatarFilename = decodeURIComponent(
            getUserDetailById.imageUrls
        )
            .split("/")
            .pop();
        setSelectedAvatar(currentUserAvatarFilename);
    }, [getUserDetailById]);

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = buildFormData(event.target);

        try {
            const updateUsers = await userDetailsUpdate(user.id, formData);
            updateUser(updateUsers);
        } catch (error) {
            console.log(error);
        }
    };
    const buildFormData = (event) => {
        const formData = new FormData();
        for (const element of event.elements) {
            if (!element.name) continue;
            formData.append(element.name, element.value);
        }

        if (selectedAvatar && selectedAvatar !== getUserDetailById.imageUrls) {
            formData.append("avatarImage", selectedAvatar);
            formData.set("ImageUrls", `${avatarBaseUrl}/${selectedAvatar}`);
        }
        return formData;
    };
    const updateUser = (updatedUserDetails) => {};
    const digitNumber = (str) => {
        return /^\d{9}$/.test(str);
    };
    const footerContent = (
        <div>
            <Button
                label="No"
                icon="pi pi-times"
                onClick={() => {
                    setSelectedAvatar("");
                    setDialog(false);
                }}
                className="p-button-text"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                onClick={() => setDialog(false)}
                autoFocus
            />
        </div>
    );

    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <Image
                        src={"https://3522.somee.com" + product.imageUrls[0]}
                        alt={product.name}
                        width="100"
                        height="100"
                    />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">
                                    {product.name}
                                </div>
                                <div className="text-700">
                                    {product.description}
                                </div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <Rating
                                    value={product.rating}
                                    readOnly
                                    cancel={false}
                                ></Rating>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">
                                        {product.productCategory}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">
                                ${product.productPrice}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const OverviewTab = () => {
        return (
            <TabPanel header="Overview">
                <Card
                    title={
                        <>
                            <span>Profile Details</span>
                            <Divider />
                        </>
                    }
                    className={cssStyles.OverviewCard}
                >
                    <div className={cssStyles.ContainerUserDetails}>
                        <div className={cssStyles.UserDetailsTitles}>
                            Full Name
                        </div>
                        <div className={cssStyles.UserDetailsProps}>
                            {capitalizeFirstLetter(getUserDetailById.firstName)}{" "}
                            {capitalizeFirstLetter(getUserDetailById.lastName)}
                        </div>
                        <div className={cssStyles.UserDetailsTitles}>Email</div>
                        <div className={cssStyles.UserDetailsProps}>
                            {getUserDetailById.email}
                        </div>
                        <div className={cssStyles.UserDetailsTitles}>
                            Company
                        </div>
                        <div className={cssStyles.UserDetailsProps}>
                            {getUserDetailById.company}
                        </div>
                        <div className={cssStyles.UserDetailsTitles}>
                            Contact Phone
                        </div>
                        <div className={cssStyles.UserDetailsProps}>
                            +(995) {getUserDetailById.contactNumber}
                        </div>
                        <div className={cssStyles.UserDetailsTitles}>
                            Company Site
                        </div>
                        <div className={cssStyles.UserDetailsProps}>
                            <Link
                                to={getUserDetailById.companySite}
                                target="_blank"
                            >
                                {getUserDetailById.companySite}
                            </Link>
                        </div>
                        <div className={cssStyles.UserDetailsTitles}>
                            Country
                        </div>
                        <div className={cssStyles.UserDetailsProps}>
                            {getUserDetailById.country}
                        </div>
                        <div className={cssStyles.UserDetailsTitles}>
                            Address
                        </div>
                        <div className={cssStyles.UserDetailsProps}>
                            {getUserDetailById.address}
                        </div>
                    </div>
                </Card>
                <div className={cssStyles.ContentDataBlock}>
                    <Card>
                        <DataScroller
                            value={productsByUser}
                            itemTemplate={itemTemplate}
                            rows={5}
                            inline
                            scrollHeight="400px"
                            header="List of Products"
                        />
                    </Card>
                    <Card>
                        <DataScroller
                            value={productsByUser}
                            itemTemplate={itemTemplate}
                            rows={5}
                            inline
                            scrollHeight="400px"
                            header="List of Products"
                        />
                    </Card>
                    <Card>
                        <DataScroller
                            value={productsByUser}
                            itemTemplate={itemTemplate}
                            rows={5}
                            inline
                            scrollHeight="400px"
                            header="List of Products"
                        />
                    </Card>
                    <Card>
                        <DataScroller
                            value={productsByUser}
                            itemTemplate={itemTemplate}
                            rows={5}
                            inline
                            scrollHeight="400px"
                            header="List of Products"
                        />
                    </Card>
                </div>
            </TabPanel>
        );
    };
    const SettingsTab = () => {
        return (
            <TabPanel header="Settings">
                <Card
                    title={
                        <>
                            <span>Profile Details</span>
                            <Divider />
                        </>
                    }
                >
                    <form
                        onSubmit={onSubmit}
                        enctype="multipart/form-data"
                        className={cssStyles.FormContainer}
                    >
                        <div className={cssStyles.fieldLarge}>
                            <label htmlFor="avatar">Avatar</label>
                            <div className={cssStyles.AvatarContainer}>
                                <Image
                                    src={
                                        !getUserDetailById.imageUrls
                                            ? "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                                            : getUserDetailById.imageUrls &&
                                              selectedAvatar
                                            ? `${avatarBaseUrl}/${selectedAvatar}`
                                            : getUserDetailById.imageUrls
                                    }
                                    alt="Image"
                                    width="200"
                                    height="200"
                                    className={cssStyles.Avatar}
                                />

                                <Badge
                                    onClick={() => setDialog(true)}
                                    value={buttonIcons[0].icon}
                                    severity="success"
                                />
                            </div>
                        </div>
                        {/* Use 'register' from 'useForm' to connect inputs to the form */}
                        <div className={cssStyles.fieldSmall}>
                            <label htmlFor="firstName">Full Name</label>
                            <div>
                                {" "}
                                <InputText
                                    type="text"
                                    name="firstName"
                                    value={getUserDetailById.firstName}
                                    onChange={(e) =>
                                        setGetUserDetailById({
                                            ...getUserDetailById,
                                            firstName: e.target.value,
                                        })
                                    }
                                />
                                <InputText
                                    type="text"
                                    name="lastName"
                                    value={getUserDetailById.lastName}
                                    onChange={(e) =>
                                        setGetUserDetailById({
                                            ...getUserDetailById,
                                            lastName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className={cssStyles.fieldLarge}>
                            <label htmlFor="company">Company</label>

                            <InputText
                                type="text"
                                name="Company"
                                defaultValue={getUserDetailById.company}
                                onChange={(e) =>
                                    setGetUserDetailById({
                                        ...getUserDetailById,
                                        company: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cssStyles.fieldLarge}>
                            <label htmlFor="contactNumber">Contact Phone</label>

                            <InputText
                                type="number"
                                name="ContactNumber"
                                defaultValue={getUserDetailById.contactNumber}
                                onChange={(e) =>
                                    setGetUserDetailById({
                                        ...getUserDetailById,
                                        contactNumber: e.target.value,
                                    })
                                }
                                pattern="\d{9}"
                            />
                        </div>
                        <div className={cssStyles.fieldLarge}>
                            <label htmlFor="companySite">Company Site</label>

                            <InputText
                                type="text"
                                name="CompanySite"
                                defaultValue={getUserDetailById.companySite}
                                onChange={(e) =>
                                    setGetUserDetailById({
                                        ...getUserDetailById,
                                        companySite: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cssStyles.fieldLarge}>
                            <label htmlFor="country">Country</label>

                            <InputText
                                type="text"
                                name="Country"
                                defaultValue={getUserDetailById.country}
                                onChange={(e) =>
                                    setGetUserDetailById({
                                        ...getUserDetailById,
                                        country: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cssStyles.fieldLarge}>
                            <label htmlFor="address">Address</label>

                            <InputText
                                type="text"
                                name="Address"
                                defaultValue={getUserDetailById.address}
                                onChange={(e) =>
                                    setGetUserDetailById({
                                        ...getUserDetailById,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {dialog && (
                            <Dialog
                                visible={dialog}
                                onHide={() => setDialog(false)}
                                header="Select Avatar"
                                modal
                                draggable={false}
                                className={cssStyles.AvatarDialog}
                                footer={footerContent}
                            >
                                {getUserAvatarsImages.map(
                                    (avatarPath, index) => {
                                        const currentUserAvatarFilename =
                                            decodeURIComponent(
                                                getUserDetailById.imageUrls
                                            )
                                                .split("/")
                                                .pop();
                                        // Check if avatarPath matches the filename of the current user's avatar
                                        const isCurrentAvatar =
                                            avatarPath ===
                                            currentUserAvatarFilename;
                                        return (
                                            <label key={index}>
                                                <input
                                                    type="radio"
                                                    name="avatarImage"
                                                    value={avatarPath} // use a value that corresponds with how you will handle the avatar on the server
                                                    defaultChecked={
                                                        isCurrentAvatar
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedAvatar(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <img
                                                    src={`${avatarBaseUrl}/${encodeURIComponent(
                                                        avatarPath
                                                    )}`}
                                                    alt={`Avatar ${index + 1}`}
                                                    height="100"
                                                />
                                            </label>
                                        );
                                    }
                                )}
                            </Dialog>
                        )}
                        <input
                            type="file"
                            name="Image"
                            style={{ display: "none" }}
                        />
                        <div className={cssStyles.fieldButton}>
                            <Button
                                label="Save Changes"
                                type="submit"
                                // disabled={!hasFormChanged()}
                            />
                        </div>
                    </form>
                </Card>
            </TabPanel>
        );
    };
    return (
        <div className={cssStyles.profileContainer}>
            <Card className={cssStyles.ProfileInfoContainer}>
                <div className={cssStyles.Container}>
                    <div className={cssStyles.ContainerTitle}>
                        <div className={cssStyles.AvatarContainer}>
                            {!getUserDetailById?.imageUrls ? (
                                <Image
                                    src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                                    alt="Image"
                                    width="200"
                                    height="200"
                                    className={cssStyles.Avatar}
                                />
                            ) : (
                                <Image
                                    src={getUserDetailById?.imageUrls}
                                    alt="Image"
                                    width="200"
                                    height="200"
                                    className={cssStyles.Avatar}
                                />
                            )}
                        </div>
                        <div className={cssStyles.ProfileTitle}>
                            {capitalizeFirstLetter(getUserDetailById.firstName)}{" "}
                            {capitalizeFirstLetter(getUserDetailById.lastName)}
                        </div>
                    </div>
                </div>
            </Card>
            <TabView>
                {OverviewTab()}
                {SettingsTab()}
                <TabPanel header="Billing"></TabPanel>
            </TabView>
        </div>
    );
};

export default Profile;
