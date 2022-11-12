import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormAddProduct from "./Components/FormAddProduct";
import FormEditProduct from "./Components/FormEditProduct";
import ProductList from "./Components/ProductList";

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<FormAddProduct />} />
          <Route path="/edit/:id" element={<FormEditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
