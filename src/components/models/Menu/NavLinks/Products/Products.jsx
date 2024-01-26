import React, { useEffect, useState } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import { ordersItems } from "../../../../api/order";
import cssStyles from "./Products.module.scss";
import { Button } from "primereact/button";
import { buttonIcons } from "../../../Icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import { getResponsiveItemCount } from "../../../Widgets/Responsive/Responsive";
import { TabView, TabPanel } from "primereact/tabview";
import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";
import { Paginator } from "primereact/paginator";
import { Image } from "primereact/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Tag } from "primereact/tag";

const Products = ({
    products,
    setProducts,
    productDelete,
    loading,
    loadingCreateProduct,
}) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [allProducts, setAllProducts] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const navigate = useNavigate();
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    useEffect(() => {
        const handleResize = () => {};
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setAllProducts(products.filter((i) => i.productPublish === 1));
        setDrafts(products.filter((i) => i.productPublish === 0));
    }, [products]);

    const currentItemsAllProducts = allProducts?.slice(first, first + rows);
    const currentItemsDrafts = drafts?.slice(first, first + rows);
    const listProduct = (productsget) => {
        const productPage = (rowData) => {
            navigate("/products/" + encodeURIComponent(rowData.productName));
        };
        const imageBodyTemplate = (rowData) => {
            const imageUrl =
                rowData.imageUrls && rowData.imageUrls.length > 0
                    ? `http://localhost:5130${rowData.imageUrls[0]}`
                    : "default-image-url"; // Replace 'default-image-url' with the URL to a default image

            return (
                <img
                    src={imageUrl}
                    alt={rowData.productName}
                    style={{ width: "80px" }}
                />
            );
        };
        const priceBodyTemplate = (rowData) => {
            return <div>${rowData.productPrice}</div>;
        };
        const categoryBodyTemplate = (rowsData) => {
            const productCategoryDropdown = [
                { name: "Rings", code: 0 },
                { name: "Earrings", code: 1 },
                { name: "Necklaces", code: 2 },
                { name: "Bracelets", code: 3 },
                { name: "Others", code: 4 },
            ];
            return productCategoryDropdown.map((i) =>
                i.code === rowsData.productCategory ? i.name : null
            );
        };
        const inStockBodyTemplate = (rowsData) => {
            return rowsData.inStock ? (
                <Tag className="mr-2" severity="success" value="INSTOCK"></Tag>
            ) : (
                <Tag className="mr-2" severity="warning" value="OUTSTOCK"></Tag>
            );
        };

        return (
            <DataTable
                value={productsget}
                onRowClick={(e) => productPage(e.data)}
                style={{ cursor: "pointer" }}
            >
                <Column field="productName" header="Name" sortable />
                <Column
                    field="imageUrls"
                    body={imageBodyTemplate}
                    header="Image"
                    sortable
                />
                <Column
                    field="productPrice"
                    header="Price"
                    body={priceBodyTemplate}
                    sortable
                />
                <Column field="productCode" header="Product Code" sortable />
                <Column
                    field="productCategory"
                    header="Category"
                    body={categoryBodyTemplate}
                    sortable
                />
                <Column
                    field="inStock"
                    header="Status"
                    body={inStockBodyTemplate}
                    sortable
                />
            </DataTable>
        );
    };
    return (
        <Card className={cssStyles.CardContainer}>
            <TabView>
                <TabPanel header={`All Products(${allProducts?.length})`}>
                    <div className={cssStyles.ProductItemContainer}>
                        {listProduct(currentItemsAllProducts)}
                    </div>
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={allProducts?.length}
                        onPageChange={onPageChange}
                    />
                </TabPanel>
                <TabPanel header={`Drafts(${drafts?.length})`}>
                    <div className={cssStyles.ProductItemContainer}>
                        {loading ? (
                            <>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                            </>
                        ) : (
                            listProduct(currentItemsDrafts)
                        )}
                    </div>
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={drafts?.length}
                        onPageChange={onPageChange}
                    />
                </TabPanel>
                <TabPanel
                    className={cssStyles.addProductBlock}
                    header={
                        <Link to={"/products/product-editor"}>
                            <Button
                                label={"Add new product"}
                                icon={buttonIcons[2].icon}
                                severity="success"
                                size="small"
                                style={{ gap: "13px" }}
                            />
                        </Link>
                    }
                />
            </TabView>
        </Card>
    );
};

export default Products;
