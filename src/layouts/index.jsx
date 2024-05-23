import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Breadcrumbs from '../components/Globals/Breadcrumbs'

const Layout = ({ children }) => (
  <div className='flex bg-white'>
    <Navbar />
    <div className='grow flex flex-col '>
      <Header />
      <Breadcrumbs />
      <main>{children}</main>
    </div>
  </div>
)

export default Layout
