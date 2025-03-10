// Button.js
const Button = ({ color, children, ...props }) => {
  const colorClasses = {
    blue: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    yellow:
      "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
    gray: "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800",
  };

  return (
    <button
      {...props}
      className={`font-medium rounded-sm text-sm px-5 py-2.5 ${colorClasses[color]} ${props.className} `}
    >
      {children}
    </button>
  );
};

export default Button;
