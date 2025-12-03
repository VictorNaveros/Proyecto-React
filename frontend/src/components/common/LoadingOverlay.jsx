// src/components/common/LoadingOverlay.jsx

import { useLoading } from '../../hooks/useLoading';
import { Spinner } from '@nextui-org/react';

function LoadingOverlay() {
  const { isLoading, message } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-2xl">
        <Spinner size="lg" />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;