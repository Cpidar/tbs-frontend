"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getProductsListWithSort } from "@/lib/data";
import { ProductPreviewType } from "@/types/global";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { StoreGetProductsParams } from "@medusajs/medusa"

type PaginatedProductsParams = {
    limit: number
    collection_id?: string[]
    category_id?: string[]
    id?: string[]
}

type PaginatedProductsResponse = {
    response: { products: ProductPreviewType[]; count: number }
    nextPage: number | null
    queryParams?: StoreGetProductsParams
}

export default function useGetProducts(initialData: PaginatedProductsResponse, countryCode: string, sortBy?: SortOptions, queryParams?: PaginatedProductsParams) {
    return useInfiniteQuery<PaginatedProductsResponse>({
        queryKey: ["products"],
        queryFn: ({ pageParam }: { pageParam: number }) => getProductsListWithSort({ page: pageParam, sortBy, countryCode, queryParams }) as unknown as Promise<PaginatedProductsResponse>,
        initialData: { pages: [initialData], pageParams: [1] },
        initialPageParam: 1,
        getNextPageParam(lastPage, allPages) {
            return lastPage.response.products.length > 0 ? allPages.length + 1 : undefined;
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}