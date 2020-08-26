import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import {Button} from "antd";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import Portlet from "../../MyMovie/Sections/Portlet";
import PortletContent from "../../MyMovie/Sections/PortletContent";
import styles from "../../MyMovie/Sections/styles";
import { LOCAL_SERVER } from "../../../Components/Config";
import { Helmet } from "react-helmet";


class CartPage extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
  };

  static defaultProps = {
    products: [],
  };

  handleChangePage = page => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, products, removeItem } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);

    const renderCartImage = images => {
      if (images.length > 0) {
        let image = images[0];
        return `${LOCAL_SERVER}${image}`;
      }
    };

    return (
      <>
      <Helmet>
      <title>Cart | Nomflix</title>
    </Helmet>
      <Portlet className={rootClassName} style={{ backgroundColor: "#2D2D2D" }}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ color: "white" }}>
                  Product Image
                </TableCell>

                <TableCell align="left" style={{ color: "white" }}>
                  Product Name
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Product Quantity
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Product Price
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  환불
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(product => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={product._id}
                  >
                    <TableCell className={classes.tableCell}>
                      {/* 이미지 */}
                      <img
                        style={{ width: "70px" }}
                        alt="product"
                        src={renderCartImage(product.images)}
                      />
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      {/* 타이틀 */}
                      {product.title}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {/* 갯수 */}
                      {product.quantity} EA
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {/* 가격 */}
                      {product.price}원
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      style={{ color: "#2d2d2d" }}
                    >
                      <Button 
                      type="primary"

                      style={{ backgroundColor:"#7b68ee", border:"#7b68ee" }}
                      onClick={() => removeItem(product._id)}>
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            style={{ color: "white" }}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            component="div"
            count={products.length}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
      </>
    );
  }
}

export default withStyles(styles)(CartPage);
