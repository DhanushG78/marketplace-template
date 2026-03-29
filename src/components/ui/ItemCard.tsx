import { appConfig } from "@/config/appConfig";
import { deleteItem } from "@/services/itemService";

type Props = {
  item: Record<string, any>;
  onEdit?: (item: any) => void;
  onDelete?: () => void;
};

export const ItemCard = ({ item, onEdit, onDelete }: Props) => {
  const { ui, fields } = appConfig;

  // Find image and price dynamically based on config
  const imageField = fields.find(f => f.type === 'file' || f.name === 'image' || f.name === 'images');
  const priceField = fields.find(f => f.type === 'number' && f.name === 'price');
  const titleField = fields.find(f => f.name === 'title' || f.name === 'name' || f.name === 'brand');

  const imageValue = imageField ? item[imageField.name] : null;
  const imgSrc = Array.isArray(imageValue) ? imageValue[0] : imageValue;
  const uiShowImage = ui?.showImage !== false;

  const priceValue = priceField ? item[priceField.name] : null;
  const uiShowPrice = ui?.showPrice !== false;

  let titleValue = item.title;
  if (!titleValue) {
    titleValue = titleField ? item[titleField.name] : "Untitled Item";
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteItem(item.id);
      onDelete?.();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full group">
      {uiShowImage && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img 
            src={imgSrc || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"} 
            alt={titleValue} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">{titleValue}</h2>
        
        {uiShowPrice && priceValue !== undefined && priceValue !== null && (
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">₹ {Number(priceValue).toLocaleString()}</p>
        )}

        {/* Fallback rendering for any additional fields could be placed here if needed */}

        <div className="mt-auto pt-5 flex gap-2">
          {(!onEdit && !onDelete) ? (
            <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-xl font-semibold shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              View Details
            </button>
          ) : (
            <div className="flex w-full gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
