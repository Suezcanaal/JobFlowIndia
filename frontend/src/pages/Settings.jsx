import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { userApi } from '../api/userApi';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import { Trash2, Download, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await userApi.deleteAccount();
      toast.success('Account deleted successfully');
      logout();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    } finally {
      setLoading(false);
      setDeleteModal(false);
    }
  };

  const handleExportData = () => {
    // This would typically make an API call to export user data
    toast.success('Data export feature coming soon!');
  };

  const handleImportData = () => {
    // This would typically handle file upload for data import
    toast.success('Data import feature coming soon!');
  };

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your application preferences and account settings</p>
      </div>

      {/* Appearance */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="form-label mb-0">Theme</label>
              <p className="text-sm text-gray-600">Choose your preferred theme</p>
            </div>
            <Select
              options={themeOptions}
              value={theme}
              onChange={(e) => e.target.value !== theme && toggleTheme()}
              className="w-32"
            />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="form-label mb-0">Email Notifications</label>
              <p className="text-sm text-gray-600">Receive email updates about your applications</p>
            </div>
            <input
              type="checkbox"
              className="form-checkbox"
              defaultChecked
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="form-label mb-0">Follow-up Reminders</label>
              <p className="text-sm text-gray-600">Get reminded about follow-up dates</p>
            </div>
            <input
              type="checkbox"
              className="form-checkbox"
              defaultChecked
            />
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Data Management</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="form-label mb-0">Export Data</label>
              <p className="text-sm text-gray-600">Download all your job application data</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportData}
            >
              <Download size={16} />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="form-label mb-0">Import Data</label>
              <p className="text-sm text-gray-600">Import job applications from a file</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleImportData}
            >
              <Upload size={16} />
              Import
            </Button>
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Privacy & Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="form-label mb-0">Two-Factor Authentication</label>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Button variant="secondary" size="sm">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="form-label mb-0">Login Sessions</label>
              <p className="text-sm text-gray-600">Manage your active login sessions</p>
            </div>
            <Button variant="secondary" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <h2 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="form-label mb-0 text-red-600">Delete Account</label>
              <p className="text-sm text-gray-600">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setDeleteModal(true)}
            >
              <Trash2 size={16} />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete Account Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-medium text-red-800 mb-2">Warning</h3>
            <p className="text-sm text-red-700">
              This action cannot be undone. This will permanently delete your account
              and remove all your data from our servers.
            </p>
          </div>
          
          <p className="text-sm text-gray-600">
            Are you sure you want to delete your account? All your job applications,
            notes, and settings will be permanently removed.
          </p>
          
          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              loading={loading}
              disabled={loading}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;