// "use client";

// import React, { useEffect } from "react";
// import { useInView } from "react-intersection-observer";

// import { ProductPreviewType } from "types/global"
// import { Region } from "@medusajs/medusa"
// import ProductCard from "@/components/ProductCard/ProductCard"
// import useGetProducts from "@/hooks/useGetProducts";


// const PostsWrapper = ({
//     productPreview,
//     isFeatured,
//     region,
//   }: {
//     productPreview: ProductPreviewType[]
//     isFeatured?: boolean
//     region: Region
//   }) => {
//   const { ref, inView } = useInView();
//   const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
//     useGetProducts(productPreview, c);

//   useEffect(() => {
//     if (inView) {
//       fetchNextPage();
//     }
//   }, [inView]);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl">Personalised Post for you</h1>
//       <div className="grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3">
//         {data?.pages.map((group, i) => (
//           <React.Fragment key={i}>
//             {group?.map((post) => (
//               <ProductCard productPreview={productPreview} region={region} />
//             ))}
//           </React.Fragment>
//         ))}
//       </div>
//       {isFetchingNextPage && hasNextPage ? (
//         <p className="text-center">Loading more posts...</p>
//       ) : (
//         <p className="text-center">No more posts found</p>
//       )}

//       <div ref={ref} />
//     </div>
//   );
// };

// export default PostsWrapper;