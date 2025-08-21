import { useState } from 'react';
import { storage, db } from '../firebase';
import { Camera, Video, Upload, X, Check } from 'lucide-react';

const ChallengeModal = ({ challenge, onClose, user }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
        setError('Please select an image or video file');
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Upload file to Storage (works with both real Firebase and demo)
      const fileRef = storage.ref(`submissions/${user.uid}/${Date.now()}_${file.name}`);
      const uploadResult = await fileRef.uploadBytes(file);
      const downloadURL = await uploadResult.ref.getDownloadURL();

      // Save metadata to Firestore (works with both real Firebase and demo)
      await db.collection('submissions').addDoc({
        userId: user.uid,
        userName: user.displayName || user.email,
        userPhotoURL: user.photoURL,
        locationId: challenge.location.id,
        locationName: challenge.location.name,
        challenge: challenge.challenge,
        fileURL: downloadURL,
        fileType: file.type,
        fileName: file.name,
        votes: 0,
        timestamp: new Date() // Use regular Date for demo compatibility
      });

      setUploadSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Challenge!</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Location Info */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{challenge.location.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {challenge.location.name}
            </h3>
            <p className="text-sm text-gray-600">
              {challenge.location.description}
            </p>
          </div>

          {/* Challenge */}
          <div className="bg-hamburg-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Your Challenge:</h4>
            <p className="text-gray-700">{challenge.challenge}</p>
          </div>

          {!uploadSuccess ? (
            <>
              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo or Video
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-hamburg-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {file ? (
                      <div className="space-y-2">
                        {file.type.startsWith('image/') ? (
                          <Camera className="w-8 h-8 text-hamburg-600 mx-auto" />
                        ) : (
                          <Video className="w-8 h-8 text-hamburg-600 mx-auto" />
                        )}
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-sm font-medium text-gray-900">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, MP4 up to 10MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="btn-secondary flex-1"
                >
                  Skip Challenge
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Challenge Submitted!
              </h3>
              <p className="text-gray-600">
                Your submission has been uploaded successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
