import Heading from '@/shared/Heading/Heading2';
import CategoryFilterMenu from '@/components/search/category-filter-menu';
import Alert from '@/shared/Alert/Alert2';
// import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@/components/loaders/category-list-card-loader';
import { ProductCategoryWithChildren } from '@/types/global';

export const CategoryFilter = async ({
  product_categories
}: {
  product_categories: ProductCategoryWithChildren[]
}) => {

  // if (product_categories?.length) {
  //   return (
  //     <div className="hidden xl:block">
  //       <div className="w-72 mt-8 px-2">
  //         <CategoryListCardLoader uniqueKey="category-list-card-loader" />
  //       </div>
  //     </div>
  //   );
  // }
  // if (error) return <Alert message={error.message} />;

  return (
    <div className="block">
      <Heading className="mb-5 -mt-1">Categories</Heading>
      <div className="max-h-full overflow-hidden rounded border border-border-base">
        {/* <Scrollbar className="w-full category-filter-scrollbar"> */}
        <div className="w-full category-filter-scrollbar">

          {product_categories?.length ? (
            <CategoryFilterMenu items={product_categories} />
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              No Result
            </div>
          )}
          </div>
        {/* </Scrollbar> */}
      </div>
    </div>
  );
};
