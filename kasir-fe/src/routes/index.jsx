//import react router dom
import { Routes, Route } from 'react-router-dom'

//import private routes
import PrivateRoutes from './PrivateRoutes'

//======================================================
// view admin
//======================================================

//import view login
import Login from '../views/Auth/Login'

//import view dashboard
import Dashboard from '../views/Admin/Dashboard/Index'
//import view Permissions
import PermissionsIndex from '../views/Admin/Permissions/Index'

//import viuew forbidden
import Forbidden from '../views/Auth/Forbidden'

//import  Route Users
import UsersIndex from '../views/Admin/Users/Index'
import UsersCreate from '../views/Admin/Users/Create'
import UsersEdit from '../views/Admin/Users/Edit'
import UsersEditPassword from '../views/Admin/Users/EditPassword'

//import  Route Users
import RolesIndex from '../views/Admin/Roles/Index'
import RolesCreate from '../views/Admin/Roles/Create'
import RolesEdit from '../views/Admin/Roles/Edit'

//import Route Status
import StatusIndex from '../views/Admin/Status/Index'
import StatusCreate from '../views/Admin/Status/Create'
import StatusEdit from '../views/Admin/Status/Edit'

//import Route Groups
import GroupsIndex from '../views/Admin/Groups/Index'
import GroupsCreate from '../views/Admin/Groups/Create'
import GroupsEdit from '../views/Admin/Groups/Edit'

//import Route Shops
import ShopsIndex from '../views/Admin/Shops/Index'
import ShopsCreate from '../views/Admin/Shops/Create'
import ShopsEdit from '../views/Admin/Shops/Edit'

//import Route Branchs
import BranchsIndex from '../views/Admin/Branchs/Index'
import BranchsCreate from '../views/Admin/Branchs/Create'
import BranchsEdit from '../views/Admin/Branchs/Edit'

//import Route Branchs
import CategoriesIndex from '../views/Admin/Categories/Index'
import CategoriesCreate from '../views/Admin/Categories/Create'
import CategoriesEdit from '../views/Admin/Categories/Edit'

//import Route Branchs
import UnitsIndex from '../views/Admin/Units/Index'
import UnitsCreate from '../views/Admin/Units/Create'
import UnitsEdit from '../views/Admin/Units/Edit'

//import Route Branchs
import SizesIndex from '../views/Admin/Sizes/Index'
import SizesCreate from '../views/Admin/Sizes/Create'
import SizesEdit from '../views/Admin/Sizes/Edit'

//import Route Customers
import CustomersIndex from '../views/Admin/Customers/Index'
import CustomersCreate from '../views/Admin/Customers/Create'
import CustomersEdit from '../views/Admin/Customers/Edit'

//import Route Customers
import SuppliersIndex from '../views/Admin/Suppliers/Index'
import SuppliersCreate from '../views/Admin/Suppliers/Create'
import SuppliersEdit from '../views/Admin/Suppliers/Edit'

//import Route Customers
import ProductsIndex from '../views/Admin/Products/Index'
import ProductsStock from '../views/Admin/Products/Stock'
import ProductsCreate from '../views/Admin/Products/Create'
import ProductsEdit from '../views/Admin/Products/Edit'

//import Route transactions
import TransactionsIndex from '../views/Admin/Transactions/Index'
import TransactionsTodayOrder from '../views/Admin/Transactions/TodayOrder'
import TransactionsPrint from '../views/Admin/Transactions/Print'

//import Route expenses
import ExpensesIndex from '../views/Admin/Expenses/Index'
import ExpensesCreate from '../views/Admin/Expenses/Create'
import ExpensesEdit from '../views/Admin/Expenses/Edit'

//reports
import ReportExpenses from '../views/Admin/Report/Expense'
import ReportOrders from '../views/Admin/Report/Orders'

// import PosCreateGoShow from '../views/Admin/Pos/CreateGoShow'
export default function RoutesIndex() {
    return (
        <Routes>
            {/* route "/login" */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            {/* route "/forbidden" */}
            <Route path="/forbidden" element={<Forbidden />} />

            {/* private route "/admin/dashboard" */}
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoutes>
                        <Dashboard />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/commodtie" */}
            <Route
                path="/admin/status"
                element={
                    <PrivateRoutes>
                        <StatusIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/country/create" */}
            <Route
                path="/admin/status/create"
                element={
                    <PrivateRoutes>
                        <StatusCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/Status/create" */}
            <Route
                path="/admin/status/edit/:id"
                element={
                    <PrivateRoutes>
                        <StatusEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/permissions" */}
            <Route
                path="/admin/permissions"
                element={
                    <PrivateRoutes>
                        <PermissionsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/users" */}
            <Route
                path="/admin/users"
                element={
                    <PrivateRoutes>
                        <UsersIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/users/create" */}
            <Route
                path="/admin/users/create"
                element={
                    <PrivateRoutes>
                        <UsersCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/users/create" */}
            <Route
                path="/admin/users/edit/:id"
                element={
                    <PrivateRoutes>
                        <UsersEdit />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/users/create" */}
            <Route
                path="/admin/users/edit-password/:id"
                element={
                    <PrivateRoutes>
                        <UsersEditPassword />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/roles" */}
            <Route
                path="/admin/roles"
                element={
                    <PrivateRoutes>
                        <RolesIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles/create" */}
            <Route
                path="/admin/roles/create"
                element={
                    <PrivateRoutes>
                        <RolesCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles/create" */}
            <Route
                path="/admin/roles/edit/:id"
                element={
                    <PrivateRoutes>
                        <RolesEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/groups"
                element={
                    <PrivateRoutes>
                        <GroupsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/groups/create" */}
            <Route
                path="/admin/groups/create"
                element={
                    <PrivateRoutes>
                        <GroupsCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/Groups/create" */}
            <Route
                path="/admin/groups/edit/:id"
                element={
                    <PrivateRoutes>
                        <GroupsEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/shops"
                element={
                    <PrivateRoutes>
                        <ShopsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/shops/create" */}
            <Route
                path="/admin/shops/create"
                element={
                    <PrivateRoutes>
                        <ShopsCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/shops/create" */}
            <Route
                path="/admin/shops/edit/:id"
                element={
                    <PrivateRoutes>
                        <ShopsEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/branchs"
                element={
                    <PrivateRoutes>
                        <BranchsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/branchs/create" */}
            <Route
                path="/admin/branchs/create"
                element={
                    <PrivateRoutes>
                        <BranchsCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/branchs/create" */}
            <Route
                path="/admin/branchs/edit/:id"
                element={
                    <PrivateRoutes>
                        <BranchsEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/categories"
                element={
                    <PrivateRoutes>
                        <CategoriesIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/categories/create" */}
            <Route
                path="/admin/categories/create"
                element={
                    <PrivateRoutes>
                        <CategoriesCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/categories/create" */}
            <Route
                path="/admin/categories/edit/:id"
                element={
                    <PrivateRoutes>
                        <CategoriesEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/units"
                element={
                    <PrivateRoutes>
                        <UnitsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/units/create" */}
            <Route
                path="/admin/units/create"
                element={
                    <PrivateRoutes>
                        <UnitsCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/units/create" */}
            <Route
                path="/admin/units/edit/:id"
                element={
                    <PrivateRoutes>
                        <UnitsEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/sizes"
                element={
                    <PrivateRoutes>
                        <SizesIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/sizes/create" */}
            <Route
                path="/admin/sizes/create"
                element={
                    <PrivateRoutes>
                        <SizesCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/sizes/create" */}
            <Route
                path="/admin/sizes/edit/:id"
                element={
                    <PrivateRoutes>
                        <SizesEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/customers"
                element={
                    <PrivateRoutes>
                        <CustomersIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/customers/create" */}
            <Route
                path="/admin/customers/create"
                element={
                    <PrivateRoutes>
                        <CustomersCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/customers/create" */}
            <Route
                path="/admin/customers/edit/:id"
                element={
                    <PrivateRoutes>
                        <CustomersEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/suppliers"
                element={
                    <PrivateRoutes>
                        <SuppliersIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/suppliers/create" */}
            <Route
                path="/admin/suppliers/create"
                element={
                    <PrivateRoutes>
                        <SuppliersCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/suppliers/create" */}
            <Route
                path="/admin/suppliers/edit/:id"
                element={
                    <PrivateRoutes>
                        <SuppliersEdit />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/roles" */}
            <Route
                path="/admin/products"
                element={
                    <PrivateRoutes>
                        <ProductsIndex />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/admin/stocks"
                element={
                    <PrivateRoutes>
                        <ProductsStock />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/products/create" */}
            <Route
                path="/admin/products/create"
                element={
                    <PrivateRoutes>
                        <ProductsCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/products/create" */}
            <Route
                path="/admin/products/edit/:id"
                element={
                    <PrivateRoutes>
                        <ProductsEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/transaction" */}
            <Route
                path="/admin/transactions"
                element={
                    <PrivateRoutes>
                        <TransactionsIndex />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/admin/transaction/today-orders"
                element={
                    <PrivateRoutes>
                        <TransactionsTodayOrder />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/admin/transaction/print"
                element={
                    <PrivateRoutes>
                        <TransactionsPrint />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/roles" */}
            <Route
                path="/admin/expenses"
                element={
                    <PrivateRoutes>
                        <ExpensesIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/expenses/create" */}
            <Route
                path="/admin/expenses/create"
                element={
                    <PrivateRoutes>
                        <ExpensesCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/expenses/create" */}
            <Route
                path="/admin/expenses/edit/:id"
                element={
                    <PrivateRoutes>
                        <ExpensesEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/expenses/create" */}
            <Route
                path="/admin/reports/expenses/"
                element={
                    <PrivateRoutes>
                        <ReportExpenses />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/expenses/create" */}
            <Route
                path="/admin/reports/orders/"
                element={
                    <PrivateRoutes>
                        <ReportOrders />
                    </PrivateRoutes>
                }
            />
        </Routes>
    )
}
