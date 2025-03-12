import React from "react";

const ConfirmationModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Pesanan</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item:
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {data.selectedItem?.name}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harga:
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {formatPrice(calculateDiscountedPrice(data.selectedItem))}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jumlah:
            </label>
            <p className="mt-1 text-sm text-gray-900">{data.quantity}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total:
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {formatPrice(
                calculateDiscountedPrice(data.selectedItem) * data.quantity
              )}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              No. WhatsApp:
            </label>
            <p className="mt-1 text-sm text-gray-900">{data.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID Game:
            </label>
            <p className="mt-1 text-sm text-gray-900">{data.gameUid}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
