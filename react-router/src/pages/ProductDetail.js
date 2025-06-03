import { useParams } from "react-router-dom";

function ProductDetailsPage() {
    const params = useParams(); // using useParams hook we can get hold of the url parameter data which we use it to make API calls

    return (
        <>
            <h1>Product Details Page</h1>
            <p>{params.productId}</p>
        </>
    )
}

export default ProductDetailsPage