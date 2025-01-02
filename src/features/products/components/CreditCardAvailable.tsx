import { Badge } from "primereact/badge";

function CreditCardAvailable(product) {
    if (product.isCreditCardRequired) {
        return (
            <Badge value={'Available'} severity={'success'} />
        )
    } else {
        return (
            <Badge value={'Not Available'} severity={'danger'} />
        ) 
    }
}

export default CreditCardAvailable;