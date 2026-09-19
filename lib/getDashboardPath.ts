export function getDashboardPath(role?: string) {
  if (role === "ADMIN") return "/admin-dashboard";
  if (role === "TECHNICIAN") return "/technician-dashboard";
  return "/dashboard";
}