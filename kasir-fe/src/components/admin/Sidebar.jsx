//import Link
import { Link, useLocation } from 'react-router-dom'

//import js cookie
import Cookies from 'js-cookie'

//import permissions
import hasAnyPermission from '../../utils/Permissions'

import { RxDashboard } from 'react-icons/rx'
import { RiCustomerService2Fill } from 'react-icons/ri'
import { LuListOrdered } from 'react-icons/lu'
import { TbBrandBooking } from 'react-icons/tb'
import { GiShop, GiTreeBranch, GiPriceTag } from 'react-icons/gi'
import { FaUsersGear, FaShop, FaProductHunt } from 'react-icons/fa6'
import { BsPlusSquareDotted, BsAirplaneEngines } from 'react-icons/bs'
import { IoNewspaperOutline } from 'react-icons/io5'
import { HiOutlineFlag } from 'react-icons/hi'
import { FaShopify, FaStamp } from 'react-icons/fa'
import { MdStorage, MdProductionQuantityLimits } from 'react-icons/md'
import { GrDocumentConfig, GrStatusGood } from 'react-icons/gr'
import { BsBank } from 'react-icons/bs'
import { BiCategory, BiSolidReport } from 'react-icons/bi'

import { RiCustomerService2Line } from 'react-icons/ri'
import { FaTruckFast } from 'react-icons/fa6'
import { FaRegCalendarCheck, FaLayerGroup } from 'react-icons/fa'
import { GoGitBranch } from 'react-icons/go'
import { TbBrandUnity } from 'react-icons/tb'
import { SiExpensify } from 'react-icons/si'
import { TbBorderAll } from 'react-icons/tb'
import { IoCashOutline } from 'react-icons/io5'

export default function sidebar() {
    //assigning location variable
    const location = useLocation()

    //destructuring pathname from location
    const { pathname } = location

    //Javascript split method to get the name of the path in array
    const activeRoute = pathname.split('/')

    //get data user from cookies
    const user = JSON.parse(Cookies.get('user'))

    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu bg-blue">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading"></div>
                    {hasAnyPermission(['dashboard.index']) && (
                        <Link className={activeRoute[2] === 'dashboard' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/dashboard">
                            <div className="sb-nav-link-icon">
                                <RxDashboard size={'1.5em'} />
                            </div>
                            <span className="text-dark">Dashboard</span>
                        </Link>
                    )}
                    {hasAnyPermission(['transactions.index']) && (
                        <Link className={activeRoute[2] === 'transactions' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/transactions">
                            <div className="sb-nav-link-icon">
                                <FaShopify size={'1.5em'} />
                            </div>
                            <span className="text-dark">POS</span>
                        </Link>
                    )}
                    {(hasAnyPermission(['status.index']) || hasAnyPermission(['sizes.index']) || hasAnyPermission(['units.index']) || hasAnyPermission(['groups.index']) || hasAnyPermission(['categories.index']) || hasAnyPermission(['customers.index']) || hasAnyPermission(['suppliers.index']) || hasAnyPermission(['branchs.index']) || hasAnyPermission(['shops.index'])) && (
                        <>
                            <div className="sb-sidenav-menu-heading">Master</div>
                            <a className={'nav-link collapsed ' + (activeRoute[2] === 'status' ? ' active-sidebar' : activeRoute[2] === 'groups' ? ' active-sidebar' : activeRoute[2] === 'units' ? ' active-sidebar' : activeRoute[2] === 'sizes' ? ' active-sidebar' : activeRoute[2] === 'categories' ? ' active-sidebar' : activeRoute[2] === 'branchs' ? ' active-sidebar' : activeRoute[2] === 'shops' ? ' active-sidebar' : activeRoute[2] === 'customers' ? ' active-sidebar' : activeRoute[2] === 'suppliers' ? ' active-sidebar' : '')} href="#" data-bs-toggle="collapse" data-bs-target="#collapseMaster" aria-expanded="false" aria-controls="collapseMaster">
                                <div className="sb-nav-link-icon">
                                    <MdStorage size={'1.5em'} />
                                </div>
                                <span className="text-dark">Master</span>
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down" style={{ color: 'color: rgb(65 60 60)' }}></i>
                                </div>
                            </a>
                        </>
                    )}
                    <div className={'collapse ' + (activeRoute[2] === 'status' ? ' show' : activeRoute[2] === 'sizes' ? ' show' : activeRoute[2] === 'groups' ? ' show' : activeRoute[2] === 'units' ? ' show' : activeRoute[2] === 'categories' ? ' show' : activeRoute[2] === 'customers' ? ' show' : activeRoute[2] === 'branchs' ? ' show' : activeRoute[2] === 'shops' ? ' show' : activeRoute[2] === 'suppliers' ? ' show' : '')} id="collapseMaster" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            {hasAnyPermission(['status.index']) && (
                                <Link className={activeRoute[2] === 'status' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/status">
                                    <div className="sb-nav-link-icon">
                                        <GrStatusGood size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Status</span>
                                </Link>
                            )}
                            {hasAnyPermission(['groups.index']) && (
                                <Link className={activeRoute[2] === 'groups' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/groups">
                                    <div className="sb-nav-link-icon">
                                        <FaLayerGroup size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Groups</span>
                                </Link>
                            )}
                            {hasAnyPermission(['units.index']) && (
                                <Link className={activeRoute[2] === 'units' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/units">
                                    <div className="sb-nav-link-icon">
                                        <TbBrandUnity size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Units</span>
                                </Link>
                            )}
                            {hasAnyPermission(['sizes.index']) && (
                                <Link className={activeRoute[2] === 'sizes' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/sizes">
                                    <div className="sb-nav-link-icon">
                                        <TbBrandUnity size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Sizes</span>
                                </Link>
                            )}
                            {hasAnyPermission(['categories.index']) && (
                                <Link className={activeRoute[2] === 'categories' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/categories">
                                    <div className="sb-nav-link-icon">
                                        <BiCategory size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Categories</span>
                                </Link>
                            )}
                            {hasAnyPermission(['branchs.index']) && (
                                <Link className={activeRoute[2] === 'branchs' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/branchs">
                                    <div className="sb-nav-link-icon">
                                        <GoGitBranch size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Branchs</span>
                                </Link>
                            )}
                            {hasAnyPermission(['shops.index']) && (
                                <Link className={activeRoute[2] === 'shops' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/shops">
                                    <div className="sb-nav-link-icon">
                                        <FaShop size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Shops</span>
                                </Link>
                            )}
                            {hasAnyPermission(['customers.index']) && (
                                <Link className={activeRoute[2] === 'customers' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/customers">
                                    <div className="sb-nav-link-icon">
                                        <RiCustomerService2Line size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Customers</span>
                                </Link>
                            )}
                            {hasAnyPermission(['suppliers.index']) && (
                                <Link className={activeRoute[2] === 'suppliers' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/suppliers">
                                    <div className="sb-nav-link-icon">
                                        <FaTruckFast size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Suppliers</span>
                                </Link>
                            )}
                        </nav>
                    </div>
                    {(hasAnyPermission(['products.index']) || hasAnyPermission(['product-stocks.index'])) && (
                        <>
                            <div className="sb-sidenav-menu-heading">Products</div>
                            <a className={'nav-link collapsed ' + (activeRoute[2] === 'products' ? ' active-sidebar' : activeRoute[2] === 'products' ? ' active-sidebar' : '')} href="#" data-bs-toggle="collapse" data-bs-target="#collapseProducts" aria-expanded="false" aria-controls="collapseProducts">
                                <div className="sb-nav-link-icon">
                                    <FaProductHunt size={'1.5em'} />
                                </div>
                                <span className="text-dark">Products</span>
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down" style={{ color: 'color: rgb(65 60 60)' }}></i>
                                </div>
                            </a>
                        </>
                    )}
                    <div className={'collapse ' + (activeRoute[2] === 'products' ? ' show' : activeRoute[2] === 'stocks' ? ' show' : '')} id="collapseProducts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            {hasAnyPermission(['products.index']) && (
                                <Link className={activeRoute[2] === 'products' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/products">
                                    <div className="sb-nav-link-icon">
                                        <MdProductionQuantityLimits size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Product</span>
                                </Link>
                            )}
                            {hasAnyPermission(['product-stocks.index']) && (
                                <Link className={activeRoute[2] === 'stocks' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/stocks">
                                    <div className="sb-nav-link-icon">
                                        <MdProductionQuantityLimits size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Stock</span>
                                </Link>
                            )}
                        </nav>
                    </div>

                    {hasAnyPermission(['today-orders.index']) && (
                        <>
                            <div className="sb-sidenav-menu-heading">Orders</div>
                            <a className={'nav-link collapsed ' + (activeRoute[2] === 'transaction' ? ' active-sidebar' : activeRoute[2] === 'transaction' ? ' active-sidebar' : '')} href="#" data-bs-toggle="collapse" data-bs-target="#collapseOrders" aria-expanded="false" aria-controls="collapseOrders">
                                <div className="sb-nav-link-icon">
                                    <TbBorderAll size={'1.5em'} />
                                </div>
                                <span className="text-dark">Orders</span>
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down" style={{ color: 'color: rgb(65 60 60)' }}></i>
                                </div>
                            </a>
                        </>
                    )}
                    <div className={'collapse ' + (activeRoute[2] === 'transaction' ? ' show' : '')} id="collapseOrders" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            {hasAnyPermission(['today-orders.index']) && (
                                <Link className={activeRoute[2] === 'transaction' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/transaction/today-orders">
                                    <div className="sb-nav-link-icon">
                                        <LuListOrdered size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Today Order</span>
                                </Link>
                            )}
                        </nav>
                    </div>
                    {/* <div className={'collapse ' + (activeRoute[2] === 'transaction' ? ' show' : '')} id="collapseUsers" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className={activeRoute[2] === 'transaction' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/transaction/today-orders">
                                <span className="text-dark">Search Order</span>
                            </Link>
                        </nav>
                    </div> */}
                    {hasAnyPermission(['expenses.index']) && (
                        <>
                            <div className="sb-sidenav-menu-heading">Expenses</div>
                            <a className={'nav-link collapsed ' + (activeRoute[2] === 'expenses' ? ' active-sidebar' : activeRoute[2] === 'expenses' ? ' active-sidebar' : '')} href="#" data-bs-toggle="collapse" data-bs-target="#collapseExpenses" aria-expanded="false" aria-controls="collapseExpenses">
                                <div className="sb-nav-link-icon">
                                    <SiExpensify size={'1.5em'} />
                                </div>
                                <span className="text-dark">Expenses</span>
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down" style={{ color: 'color: rgb(65 60 60)' }}></i>
                                </div>
                            </a>
                        </>
                    )}
                    <div className={'collapse ' + (activeRoute[2] === 'expenses' ? ' show' : '')} id="collapseExpenses" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            {hasAnyPermission(['expenses.index']) && (
                                <Link className={activeRoute[2] === 'expenses' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/expenses">
                                    <div className="sb-nav-link-icon">
                                        {' '}
                                        <IoCashOutline size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Expenses</span>
                                </Link>
                            )}
                        </nav>
                    </div>
                    {(hasAnyPermission(['report-orders.index']) || hasAnyPermission(['report-expenses.index'])) && (
                        <>
                            <div className="sb-sidenav-menu-heading">Reports</div>
                            <a className={'nav-link collapsed ' + (activeRoute[2] === 'report-expenses' ? ' active-sidebar' : activeRoute[2] === 'report-orders' ? ' active-sidebar' : '')} href="#" data-bs-toggle="collapse" data-bs-target="#collapseReports" aria-expanded="false" aria-controls="collapseReports">
                                <div className="sb-nav-link-icon">
                                    <BiSolidReport size={'1.5em'} />
                                </div>
                                <span className="text-dark">Reports</span>
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down" style={{ color: 'color: rgb(65 60 60)' }}></i>
                                </div>
                            </a>
                        </>
                    )}
                    <div className={'collapse ' + (activeRoute[2] === 'report' ? ' show' : '')} id="collapseReports" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            {hasAnyPermission(['report-expenses.index']) && (
                                <Link className={activeRoute[2] === 'report' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/reports/expenses">
                                    <div className="sb-nav-link-icon">
                                        {' '}
                                        <BiSolidReport size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Report Expenses</span>
                                </Link>
                            )}
                            {hasAnyPermission(['report-orders.index']) && (
                                <Link className={activeRoute[2] === 'report' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/reports/orders">
                                    <div className="sb-nav-link-icon">
                                        {' '}
                                        <BiSolidReport size={'1.5em'} />
                                    </div>
                                    <span className="text-dark">Report Order</span>
                                </Link>
                            )}
                        </nav>
                    </div>
                    {(hasAnyPermission(['roles.index']) || hasAnyPermission(['permissions.index']) || hasAnyPermission(['users.index'])) && (
                        <>
                            <div className="sb-sidenav-menu-heading">Users Management</div>
                            <a className={'nav-link collapsed ' + (activeRoute[2] === 'roles' ? ' active-sidebar' : activeRoute[2] === 'permissions' ? ' active-sidebar' : activeRoute[2] === 'users' ? ' active-sidebar' : '')} href="#" data-bs-toggle="collapse" data-bs-target="#collapseUsers" aria-expanded="false" aria-controls="collapseUsers">
                                <div className="sb-nav-link-icon">
                                    <FaUsersGear size={'1.5em'} />
                                </div>
                                <span className="text-dark">Users Permissions</span>
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down" style={{ color: 'color: rgb(65 60 60)' }}></i>
                                </div>
                            </a>
                        </>
                    )}
                    <div className={'collapse ' + (activeRoute[2] === 'roles' ? ' show' : activeRoute[2] === 'permissions' ? ' show' : activeRoute[2] === 'users' ? ' show' : '')} id="collapseUsers" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            {hasAnyPermission(['roles.index']) && (
                                <Link className={activeRoute[2] === 'roles' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/roles">
                                    <span className="text-dark">Roles</span>
                                </Link>
                            )}

                            {hasAnyPermission(['permissions.index']) && (
                                <Link className={activeRoute[2] === 'permissions' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/permissions">
                                    <span className="text-dark">Permissions</span>
                                </Link>
                            )}

                            {hasAnyPermission(['users.index']) && (
                                <Link className={activeRoute[2] === 'users' ? 'nav-link active-sidebar' : 'nav-link'} to="/admin/users">
                                    <span className="text-dark">Users</span>
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
            {/* <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {user.email}
            </div> */}
        </nav>
    )
}
