import { appConfig } from "@/config/appConfig";
import { deleteItem } from "@/services/itemService";

type Props = {
  item: Record<string, any>;
  onEdit?: (item: any) => void;
  onDelete?: () => void;
};

export const ItemCard = ({ item, onEdit, onDelete }: Props) => {
  const { ui, fields } = appConfig;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this listing?")) {
      await deleteItem(item.id);
      onDelete?.();
    }
  };

  return (
    <div className="flex flex-col border border-gray-200 p-4 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900 dark:border-gray-800 h-full">
      {/* 
        Fully Config-Driven Component: 
        We map directly over the configuration array rather than hardcoding `item.title` or `item.image`.
      */}
      {fields.map((field) => {
        const value = item[field.name];

        // Ensure we don't render empty fields
        if (value === undefined || value === null || value === "") return null;

        /**
         * 1. Dynamic File/Image Rendering
         * Respects `ui.showImage`
         */
        if (field.type === 'file' || field.name === 'image' || field.name === 'images') {
          if (ui?.showImage === false) return null;
          
          // Handles arrays from our mock DB or single strings
          const imgSrc = Array.isArray(value) ? value[0] : value;
          return (
             <img
               key={field.name}
               src={imgSrc || "https://via.placeholder.com/300"}
               alt={item.title || "Image"}
               className="w-full h-48 object-cover rounded-lg mb-3"
             />
          );
        }

        /**
         * 2. Dynamic Price Rendering
         * Respects `ui.showPrice` 
         */
        if (field.type === 'number' && field.name === 'price') {
          if (ui?.showPrice === false) return null;
          return (
            <p key={field.name} className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              ₹ {Number(value).toLocaleString()}
            </p>
          );
        }

        /**
         * 3. Dynamic Title Rendering
         */
        if (field.name === 'title') {
          return (
            <h2 key={field.name} className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mt-1">
              {value}
            </h2>
          );
        }

        /**
         * 4. Fallback Generic Attribute Rendering (e.g., Description, Mileage, Area)
         */
        return (
          <p key={field.name} className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">
              {field.label}:
            </span>
            {value}
          </p>
        );
      })}

      {(onEdit || onDelete) && (
        <div className="mt-auto pt-4 flex gap-3 border-t border-gray-100 dark:border-gray-800">
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 px-3 py-2 rounded-lg font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};