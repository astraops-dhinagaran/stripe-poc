import { Button } from "primereact/button";
import ProductsList from "../../features/products/components/ProductList";
import { useState } from "react";
import ProductForm from "../../features/products/components/ProductForm";
import { Dialog } from "primereact/dialog";

function ProductsPage() {

    const [showProductForm, setShowProductForm] = useState(false)

    

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-5">
                <h1 className="">Products</h1>
                <Button onClick={() => setShowProductForm(true)} >Create</Button>
            </div>
            <ProductsList />
            {showProductForm && <Dialog visible={showProductForm} onHide={() => setShowProductForm(false)}><ProductForm setShowProductForm={setShowProductForm} /></Dialog>}
        </div>
    );
}

export default ProductsPage;