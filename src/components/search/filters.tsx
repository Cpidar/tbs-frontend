import { CategoryFilter } from "./category-filter"
// import { BrandFilter } from './brand-filter';
import { FilteredItems } from "./filtered-items"
import { getCategoriesList, getCollectionsList, getParentCategoriesList, listCategories, listMainCategories } from "@lib/data"

export const ShopFilters: React.FC = async () => {
  const product_categories = await listMainCategories()
  return (
    <div className="space-y-10">
        <FilteredItems items={product_categories} />
      
      <CategoryFilter product_categories={product_categories} />
      {/* <DietaryFilter /> */}
      {/* <BrandFilter /> */}
    </div>
  )
}
