import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      {children}
      <Footer />
      <br></br>
    </div>
  );
};

export default Layout;
