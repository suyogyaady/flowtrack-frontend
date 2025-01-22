import axios from "axios";

// Creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const jsonConfig = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

// Register API
export const registerUserApi = (data) => Api.post("/api/user/create", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// get single profile api
export const getSingleprofileApi = () =>
  Api.get("/api/user/get_single_profile", config);

// update profile api
export const updateProfileApi = (data) =>
  Api.put("/api/user/update_profile", data, jsonConfig);

// updateUserProfile
export const updateUserProfile = (data) =>
  Api.put("/api/user/update_google_profile", data, jsonConfig);

// update profile picture
export const uploadProfilePictureApi = (data) =>
  Api.put("/api/user/upload_profile_picture", data, config);

// Delete account api
export const deleteAccountApi = () => Api.delete("/api/user/delete_account");

// change password api
export const changePasswordApi = (data) =>
  Api.put("/api/user/change_password", data, jsonConfig);

// login with google
export const loginWithGoogle = (data) =>
  Api.post("/api/user/google_login", data, config);

//get user by google email
export const getUserByGoogleEmail = (data) =>
  Api.post("/api/user/get_user_by_google_email", data, config);

// create expense
export const createExpenseApi = (data) =>
  Api.post("/api/expense/create_expense", data, config);

// create transaction

export const createTransactionApi = (data) =>
  Api.post("/api/transaction/create_transaction", data, jsonConfig);

// create income
export const createIncomeApi = (data) =>
  Api.post("/api/income/create_income", data, config);

// Get All Expenses
export const getAllExpensesApi = () =>
  Api.get("/api/transaction/get_all_expense", jsonConfig);

// Get All Incomes
export const getAllIncomesApi = () =>
  Api.get("/api/transaction/get_all_income", jsonConfig);

// Get Total Expenses
export const getTotalExpensesApi = () =>
  Api.get("/api/transaction/get_total_expense", jsonConfig);

// Get Total Incomes
export const getTotalIncomesApi = () =>
  Api.get("/api/transaction/get_total_income", jsonConfig);

// Get All Transactions
export const getAllTransactionsApi = () =>
  Api.get("/api/transaction/get_all_transactions", jsonConfig);

// Get Transactions By User
export const getTransactionsByUserApi = () =>
  Api.get("/api/transaction/get_all_transactions_by_user", jsonConfig);

// delete_income
export const deleteIncomeApi = (id) =>
  Api.delete(`/api/income/delete_income/${id}`, config);

// delete_expense
export const deleteExpenseApi = (id) =>
  Api.delete(`/api/expense/delete_expense/${id}`, config);

// get_transactions_by_month;
export const getTransactionsByMonthApi = (year) =>
  Api.get(
    "/api/transaction/get_transactions_by_month?year=" + year,
    jsonConfig
  );

// get_monthly_transactions_with_budget
export const getMonthlyTransactionsWithBudgetApi = (year) =>
  Api.get(
    "/api/transaction/get_monthly_transactions_with_budget?year=" + year,
    jsonConfig
  );
