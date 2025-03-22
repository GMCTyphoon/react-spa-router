import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Ой!</h1>
        <p className="text-lg text-gray-700 mb-4">
          Извините, произошла непредвиденная ошибка.
        </p>
        <p className="text-sm text-gray-500 italic">
          {error.statusText || error.message}
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
