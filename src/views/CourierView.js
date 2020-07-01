import React from 'react';
import CourierHome from "../components/CourierHome";
import {Button} from "antd";

class CourierView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Groceryou",
        };
    }

    render() {
        return (
            <main>
                <div class="content">
                    <CourierHome />
                </div>
            </main>
        );
    }
}

export default CourierView;
