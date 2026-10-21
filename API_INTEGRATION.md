<!-- APIs -->
<!-- Auth -->
POST   /api/auth/register              ==>  app/(auth)/_actions/authActions.ts
POST   /api/auth/login                 ==>  app/(auth)/_actions/authActions.ts
GET    /api/auth/me                    ==>  service/getMe.ts
POST   /api/auth/me                    ==>  service/getNewAccessToken.ts


<!-- Public (home, services, categories) -->
GET    /api/services                   ==>  service/public/getServices.ts
GET    /api/services/:id               ==>  service/public/getServiceById.ts
GET    /api/categories                 ==>  service/public/getCategories.ts
GET    /api/technician/:id             ==>  service/public/getTechnicianById.ts


<!-- Customer -->
GET    /api/bookings/me                ==>  service/customer/getMyBookings.ts
POST   /api/bookings                   ==>  service/customer/createBooking.ts
POST   /api/payments/create            ==>  service/customer/createPayment.ts
POST   /api/payments/confirm           ==>  app/payment/success/page.tsx
GET    /api/payments                   ==>  service/customer/getMyPayments.ts
GET    /api/payments/:id               ==>  service/customer/getPaymentById.ts
GET    /api/reviews/me                 ==>  service/customer/getMyReviews.ts
POST   /api/reviews                    ==>  service/customer/createReview.ts


<!-- Technician -->
GET    /api/technician/profile         ==>  service/technician/getMyProfile.ts
POST   /api/technician/create-profile  ==>  service/technician/createProfile.ts
PATCH  /api/technician/profile         ==>  service/technician/updateProfile.ts
DELETE /api/technician                 ==>  service/technician/deleteProfile.ts
GET    /api/technician/availability    ==>  service/technician/availability.ts
POST   /api/technician/availability    ==>  service/technician/createSlot.ts
PUT    /api/technician/availability    ==>  service/technician/updateSlot.ts
GET    /api/technician/bookings        ==>  service/technician/getMyBookings.ts
PATCH  /api/technician/bookings/:id    ==>  service/technician/updateBookingStatus.ts
GET    /api/technician/services        ==>  service/technician/getMyServices.ts
POST   /api/services                   ==>  service/technician/createService.ts
GET    /api/technician/reviews         ==>  service/technician/getReviews.ts


<!-- Admin -->
GET    /api/admin/users                ==>  service/admin/getUsers.ts
GET    /api/admin/users                ==>  service/admin/getOverviewStats.ts
GET    /api/admin/users/:id            ==>  service/admin/getSingleUser.ts
PATCH  /api/admin/users/:id            ==>  service/admin/updateUserStatus.ts
PATCH  /api/admin/users/:id            ==>  service/admin/setUserStatus.ts
GET    /api/admin/technician/:id       ==>  service/admin/getTechnicianProfile.ts
DELETE /api/admin/technician/:id       ==>  service/admin/deleteTechnician.ts
GET    /api/admin/services             ==>  service/admin/getServices.ts
GET    /api/admin/categories           ==>  service/admin/getCategories.ts
POST   /api/admin/categories           ==>  service/admin/createCategory.ts
PATCH  /api/admin/categories/:name     ==>  service/admin/updateCategoryStatus.ts
GET    /api/admin/bookings             ==>  service/admin/getRecentBookings.ts
GET    /api/admin/bookings             ==>  service/admin/getOverviewStats.ts
GET    /api/admin/payments             ==>  service/admin/getOverviewStats.ts