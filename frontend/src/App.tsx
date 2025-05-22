import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import ReferralsPage from "./pages/ReferralsPage";
// import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import TelegramLogin from "./pages/TelegramLogin";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/telegramLogin" element={<TelegramLogin />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TonConnectUIProvider
                    manifestUrl={
                      "https://victor234ben.github.io/ton-manifest/tonconnect-manifest.json"
                    }
                    actionsConfiguration={{
                      twaReturnUrl: "https://t.me/babyroyroybot", // VERY IMPORTANT
                    }}
                  >
                    <TasksPage />
                  </TonConnectUIProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderBoardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/referrals"
              element={
                <ProtectedRoute>
                  <ReferralsPage />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            /> */}

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
