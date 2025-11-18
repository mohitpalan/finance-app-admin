'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Finance App',
    supportEmail: 'support@financeapp.com',
    maintenanceMode: false,
    allowRegistration: true,
    maxLoginAttempts: 5,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        {/* Info Banner */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900">
                  Local Settings (Backend Integration Pending)
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  These settings are currently stored locally in your browser. Backend API
                  endpoints for persisting settings are not yet implemented. Settings will be
                  lost when you clear your browser data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage general application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings({ ...settings, supportEmail: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Maximum Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxLoginAttempts: parseInt(e.target.value, 10),
                  })
                }
              />
              <p className="text-sm text-muted-foreground">
                Number of failed login attempts before account lockout
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Allow User Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Allow new users to register accounts
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    allowRegistration: !settings.allowRegistration,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowRegistration ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Mode</CardTitle>
            <CardDescription>
              Enable maintenance mode to prevent user access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Enable Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  When enabled, only admins can access the application
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    maintenanceMode: !settings.maintenanceMode,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Backend API settings and endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>API Base URL</Label>
              <Input
                value={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'}
                disabled
              />
              <p className="text-sm text-muted-foreground">
                Configured in environment variables
              </p>
            </div>
            <div className="space-y-2">
              <Label>API Timeout</Label>
              <Input value="30000 ms" disabled />
              <p className="text-sm text-muted-foreground">
                Maximum time to wait for API responses
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
