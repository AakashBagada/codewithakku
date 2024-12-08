export default function ProductDetails( { params } : {
    params: {productId : String;}
}){
    return <h1>detials of products {params.productId}</h1>;
}