import { useState } from 'react';

export default function TriangleEditModal({ triangle, onSave, onClose }) {
  const [sideA, setSideA] = useState(triangle.sideA.toString());
  const [sideB, setSideB] = useState(triangle.sideB.toString());
  const [sideC, setSideC] = useState(triangle.sideC.toString());
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateInputs = () => {
    const newErrors = {};

    if (!sideA || parseFloat(sideA) <= 0) {
      newErrors.sideA = 'Must be a positive number';
    }
    if (!sideB || parseFloat(sideB) <= 0) {
      newErrors.sideB = 'Must be a positive number';
    }
    if (!sideC || parseFloat(sideC) <= 0) {
      newErrors.sideC = 'Must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    setIsSaving(true);
    try {
      await onSave(triangle.id, {
        sideA: parseFloat(sideA),
        sideB: parseFloat(sideB),
        sideC: parseFloat(sideC)
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Edit Triangle</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Side A
            </label>
            <input
              type="number"
              step="0.01"
              value={sideA}
              onChange={(e) => setSideA(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                errors.sideA ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSaving}
            />
            {errors.sideA && (
              <p className="text-red-500 text-xs mt-1">{errors.sideA}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Side B
            </label>
            <input
              type="number"
              step="0.01"
              value={sideB}
              onChange={(e) => setSideB(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                errors.sideB ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSaving}
            />
            {errors.sideB && (
              <p className="text-red-500 text-xs mt-1">{errors.sideB}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Side C
            </label>
            <input
              type="number"
              step="0.01"
              value={sideC}
              onChange={(e) => setSideC(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                errors.sideC ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSaving}
            />
            {errors.sideC && (
              <p className="text-red-500 text-xs mt-1">{errors.sideC}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
