import React, { Fragment, useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar.js";
import { useNavigate } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants.js";
import { deleteOrder, getAllOrders, clearErrors } from "../../actions/orderAction";

const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, orders } = useSelector((state) => state.allOrders);

    const deleteProductHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    const { error:deleteError, isDeleted} = useSelector((state)=>state.order);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted) {
            alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({type: DELETE_ORDER_RESET})
        }

        dispatch(getAllOrders());
    }, [dispatch, alert, error,deleteError,isDeleted]);

    
    const columns = [
        { field:"id", headerName:"Order ID",minWidth:300,flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
            cellClassName: (params) => {
                return params.getValue(params.id,"status")==="Delivered" ? "greenColor" : "recColor";
            }
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            minWidth:150,
            flex:0.4,
            type:"number",
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:270,
            flex:0.5,
        },
        {
            field:"actions",
            headerName:"Actions",
            minWidth:150,
            flex:0.3,
            type:"number",
            sortable:false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows=[];
    orders && orders.forEach((item) => {
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid 
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      disableSelectionOnClick
                      className="productListTable"
                      autoHeight
                      >
                    </DataGrid>
                </div>
            </div>
        </Fragment>
    )
}
export default OrderList;