import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore, debugAuthStore } from "@/store/authStore";

export default function AuthDebugger() {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  const handleTestLogin = () => {
    const testUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin' as const,
      permissions: [],
      lastLogin: new Date().toISOString()
    };
    
    console.log('Testing login with:', testUser);
    useAuthStore.getState().login(testUser, 'test-token-123');
  };

  const handleTestLogout = () => {
    console.log('Testing logout');
    useAuthStore.getState().logout();
  };

  const handleDebugStore = () => {
    debugAuthStore();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Auth Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm">
            <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'null'}
          </p>
          <p className="text-sm">
            <strong>Is Authenticated:</strong> {isAuthenticated.toString()}
          </p>
          <p className="text-sm">
            <strong>Is Loading:</strong> {isLoading.toString()}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleTestLogin} size="sm">
            Test Login
          </Button>
          <Button onClick={handleTestLogout} variant="outline" size="sm">
            Test Logout
          </Button>
          <Button onClick={handleDebugStore} variant="secondary" size="sm">
            Debug Store
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
