import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  useAdminProfile, 
  useAdminLoading, 
  useAdminError,
  useAdminSetProfile,
  useAdminUpdateProfile,
  useAdminClearError,
  useAdminSetLoading,
  debugAdminStore
} from '@/store/adminStore';

export function AdminStoreDemo() {
  // Use selector hooks for better performance
  const profile = useAdminProfile();
  const loading = useAdminLoading();
  const error = useAdminError();

  // Use action hooks
  const setProfile = useAdminSetProfile();
  const updateProfile = useAdminUpdateProfile();
  const clearError = useAdminClearError();
  const setLoading = useAdminSetLoading();

  // Demo profile functions
  const handleSetProfile = () => {
    const demoProfile = {
      id: '1',
      email: 'admin@demo.com',
      name: 'Demo Admin',
      role: 'admin',
      permissions: ['read', 'write', 'delete'],
      lastLogin: new Date().toISOString()
    };
    setProfile(demoProfile);
  };

  // Demo profile update
  const handleUpdateProfile = () => {
    if (profile) {
      updateProfile({
        name: `${profile.name} (Updated)`,
        lastLogin: new Date().toISOString()
      });
    }
  };

  // Demo loading state
  const handleToggleLoading = () => {
    setLoading(!loading);
  };

  // Debug function
  const handleDebug = () => {
    debugAdminStore();
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>AdminStore Data Management Demo</CardTitle>
          <CardDescription>
            This component demonstrates the adminStore usage patterns for data management (authentication is now handled by authStore)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current State Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Store State</h3>
              <div className="space-y-1 text-sm">
                <div>Loading: <Badge variant={loading ? "default" : "secondary"}>{loading ? "Yes" : "No"}</Badge></div>
                <div>Has Profile: <Badge variant={profile ? "default" : "secondary"}>{profile ? "Yes" : "No"}</Badge></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Profile Info</h3>
              <div className="space-y-1 text-sm">
                <div>Name: {profile?.name || "No profile set"}</div>
                <div>Email: {profile?.email || "N/A"}</div>
                <div>Role: {profile?.role || "N/A"}</div>
                <div>Permissions: {profile?.permissions?.length || 0}</div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-red-800 text-sm">{error}</span>
                <Button variant="ghost" size="sm" onClick={clearError}>
                  Clear
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSetProfile} disabled={!!profile}>
              Set Demo Profile
            </Button>
            <Button onClick={handleUpdateProfile} disabled={!profile} variant="outline">
              Update Profile
            </Button>
            <Button onClick={handleToggleLoading} variant="outline">
              Toggle Loading
            </Button>
            <Button onClick={handleDebug} variant="outline">
              Debug Store
            </Button>
          </div>

          {/* Profile Display */}
          {profile && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Data</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                  {JSON.stringify(profile, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            How to use the adminStore for data management (authentication is handled by authStore)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Selector Hooks (Recommended)</h4>
              <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
{`// Use selector hooks for better performance
const profile = useAdminProfile();
const loading = useAdminLoading();
const error = useAdminError();`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. Action Hooks</h4>
              <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
{`// Use action hooks for dispatching actions
const setProfile = useAdminSetProfile();
const updateProfile = useAdminUpdateProfile();
const clearError = useAdminClearError();`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. Direct Store Access</h4>
              <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
{`// For complex logic or when you need multiple values
const { profile, loading, error } = useAdminStore();`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
