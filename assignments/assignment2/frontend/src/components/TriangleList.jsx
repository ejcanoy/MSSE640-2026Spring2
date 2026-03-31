import { useState, useEffect } from 'react';
import { getAllTriangles, updateTriangle, deleteTriangle } from '../api';
import TriangleEditModal from './TriangleEditModal';

export default function TriangleList({ refreshTrigger, onTriangleUpdated }) {
  const [triangles, setTriangles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTriangle, setSelectedTriangle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTriangles = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getAllTriangles();
      setTriangles(data);
    } catch (err) {
      setError(err.message || 'Failed to load triangles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTriangles();
  }, [refreshTrigger]);

  const handleEdit = (triangle) => {
    setSelectedTriangle(triangle);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this triangle?')) return;
    
    try {
      await deleteTriangle(id);
      setTriangles(triangles.filter(t => t.id !== id));
      onTriangleUpdated?.();
    } catch (err) {
      alert('Failed to delete triangle: ' + err.message);
    }
  };

  const handleSave = async (id, sides) => {
    try {
      const updated = await updateTriangle(id, sides);
      setTriangles(triangles.map(t => t.id === id ? updated : t));
      setShowModal(false);
      onTriangleUpdated?.();
    } catch (err) {
      alert('Failed to update triangle: ' + err.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Triangle History</h2>
        <button
          onClick={fetchTriangles}
          disabled={isLoading}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {triangles.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No triangles yet. Try classifying one!
          </div>
        ) : (
          <div className="space-y-2">
            {triangles.map((triangle) => (
              <div
                key={triangle.id}
                className={`p-3 rounded border ${
                  triangle.valid
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">
                      {triangle.triangleType || 'Invalid'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Sides: {triangle.sideA.toFixed(2)}, {triangle.sideB.toFixed(2)}, {triangle.sideC.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ID: {triangle.id} • {triangle.valid ? 'Valid' : 'Invalid'}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleEdit(triangle)}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(triangle.id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedTriangle && (
        <TriangleEditModal
          triangle={selectedTriangle}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
