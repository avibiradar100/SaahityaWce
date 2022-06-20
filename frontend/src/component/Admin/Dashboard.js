import React, { useEffect } from 'react';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import { getAllUsers } from '../../actions/userAction';
import "./CSS/Dashboard/Dashboard.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products,productsCount } = useSelector((state) => state.products);
    const { users } = useSelector((state) => state.allUsers);


    useEffect(() => {
        dispatch(getProduct());
        dispatch(getAllUsers());
    }, [dispatch]);


    return (
        <div className='dashboard'>
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                        <p>Products</p>
                        <p>{products && productsCount}</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>{users && users.length }</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
