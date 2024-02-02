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
    loadingProducts,
}) => {
    const [firstAllProducts, setFirstAllProducts] = useState(0);
    const [rowsAllProducts, setRowsAllProducts] = useState(10);
    const [firstDrafts, setFirstDrafts] = useState(0);
    const [rowsDrafts, setRowsDrafts] = useState(10);
    const [allProducts, setAllProducts] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const navigate = useNavigate();
    const onPageChangeAllProducts = (event) => {
        setFirstAllProducts(event.first);
        setRowsAllProducts(event.rows);
    };

    const onPageChangeDrafts = (event) => {
        setFirstDrafts(event.first);
        setRowsDrafts(event.rows);
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
    products.filter((i) => console.log(i.productPublish, "i.productPublish"));
    const currentItemsAllProducts = allProducts?.slice(
        firstAllProducts,
        firstAllProducts + rowsAllProducts
    );
    const currentItemsDrafts = drafts?.slice(
        firstDrafts,
        firstDrafts + rowsDrafts
    );
    const listProduct = (productsget) => {
        const productPage = (rowData) => {
            navigate("/products/" + encodeURIComponent(rowData.productName));
        };
        const imageBodyTemplate = (rowData) => {
            const imageUrl =
                rowData.imageUrls && rowData.imageUrls.length > 0
                    ? `https://3522.somee.com${rowData.imageUrls[0]}`
                    : "default-image-url"; // Replace 'default-image-url' with the URL to a default image

            return (
                <Image
                    src={imageUrl}
                    alt={rowData.name}
                    width="100"
                    height="100"
                    className={cssStyles.ProductImage}
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

        return loadingProducts ? (
            <>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
            </>
        ) : (
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
            <TabView activeIndex={0}>
                <TabPanel header={`All Products(${allProducts?.length})`}>
                    <div className={cssStyles.ProductItemContainer}>
                        {listProduct(currentItemsAllProducts)}
                    </div>
                    <Paginator
                        first={firstAllProducts}
                        rows={rowsAllProducts}
                        totalRecords={allProducts?.length}
                        onPageChange={onPageChangeAllProducts}
                        rowsPerPageOptions={allProducts ? [20, 40, 60] : []}
                    />
                </TabPanel>
                <TabPanel header={`Drafts(${drafts?.length})`}>
                    <div className={cssStyles.ProductItemContainer}>
                        {listProduct(currentItemsDrafts)}
                    </div>
                    <Paginator
                        first={firstDrafts}
                        rows={rowsDrafts}
                        totalRecords={drafts?.length}
                        onPageChange={onPageChangeDrafts}
                        rowsPerPageOptions={drafts ? [20, 40, 60] : []}
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
