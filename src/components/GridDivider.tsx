interface GridDividerProps {
  label?: string;
}

export default function GridDivider({ label }: GridDividerProps) {
  return (
    <div className="col-span-full flex items-center justify-center py-1 my-1 lg:mt-0 lg:mb-0">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
      {label && (
        <>
          <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-900 rounded-2xl">
            {label}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </>
      )}
    </div>
  );
}
