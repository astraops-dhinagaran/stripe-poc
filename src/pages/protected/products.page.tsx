import { Button } from "primereact/button";
import ProductsList from "../../features/products/components/ProductList";
import { useLocation } from "@tanstack/react-router";

function ProductsPage() {

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-5">
                <h1 className="">Purchase</h1>
                {/* <Button >Create</Button> */}
            </div>
            <ProductsList />
        </div>
    );
}

export default ProductsPage;