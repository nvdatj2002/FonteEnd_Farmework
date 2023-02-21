import { Table } from "react-bootstrap";
import { parseVND } from "./helper";
import { cartContext } from "./ThemeProvider";

const CartList = ({ carts }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {carts?.items?.length &&
          carts.items.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={`${item.picture}`} alt="" style={{ width: 100 }} />
              </td>
              <td>{item.name}</td>
              <td>${parseVND(item.price)}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            SUM: <span>${parseVND(carts.sum)}</span>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};
export default CartList;