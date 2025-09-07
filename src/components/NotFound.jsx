import { useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-2">
        {error?.statusText || "Sorry, the page you are looking for does not exist."}
      </p>
      <p className="text-sm text-gray-500">
        {error?.message || "Please check the URL or go back to the home page."}
      </p>
    </div>
  );
}

export default NotFound;
