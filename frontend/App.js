import JournalForm from './components/dashboard/JournalForm';
import AttendanceForm from './components/dashboard/AttendanceForm';
import PermissionForm from './components/dashboard/PermissionForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="dashboard" element={<Overview />} />
                <Route path="journal" element={<JournalForm />} />
                <Route path="attendance" element={<AttendanceForm />} />
                <Route path="permission" element={<PermissionForm />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}